import { FastifyInstance } from "fastify";
import {
  Invoice,
  InvoiceLine,
  CreateInvoiceDto,
  UpdateInvoiceDto,
  CreateInvoiceLineDto,
  UpdateInvoiceLineDto,
  InvoiceQueryParams,
  InvoiceInfo,
} from "./invoice.types";

function mapDbToInvoice(row: any): Invoice {
  return {
    id: row.id,
    garageId: row.garage_id,
    vehicleId: row.vehicle_id,
    invoiceNumber: row.invoice_number,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    statusCode: row.status_code,
    notes: row.notes,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapDbToInvoiceLine(row: any): InvoiceLine {
  return {
    id: row.id,
    invoiceId: row.invoice_id,
    lineTypeCode: row.line_type_code,
    description: row.description,
    quantity: parseFloat(row.quantity),
    unitPrice: parseFloat(row.unit_price),
    discountRate: parseFloat(row.discount_rate),
    amount: parseFloat(row.amount),
    createdAt: row.created_at,
  };
}

export async function findAllInvoices(
  fastify: FastifyInstance,
  params: InvoiceQueryParams = {},
): Promise<{ data: Invoice[]; total: number }> {
  const { pg } = fastify;
  const { page = 1, limit = 20, garageId, vehicleId, statusCode, fromDate, toDate } = params;
  const offset = (page - 1) * limit;

  let whereClause = "";
  const values: any[] = [];
  let idx = 1;

  if (garageId) {
    whereClause += ` WHERE i.garage_id = $${idx++}`;
    values.push(garageId);
  }
  if (vehicleId) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` i.vehicle_id = $${idx++}`;
    values.push(vehicleId);
  }
  if (statusCode) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` i.status_code = $${idx++}`;
    values.push(statusCode);
  }
  if (fromDate) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` i.issue_date >= $${idx++}`;
    values.push(fromDate);
  }
  if (toDate) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` i.issue_date <= $${idx++}`;
    values.push(toDate);
  }

  const countQuery = `SELECT COUNT(*) FROM invoice i${whereClause}`;
  const dataQuery = `
    SELECT i.*, c.value as status_value
    FROM invoice i
    LEFT JOIN correspondance c ON i.status_code = c.code AND c.subject_code = 1
    ${whereClause}
    ORDER BY i.issue_date DESC
    LIMIT $${idx} OFFSET $${idx + 1}
  `;

  const [countResult, dataResult] = await Promise.all([
    pg.query(countQuery, values),
    pg.query(dataQuery, [...values, limit, offset]),
  ]);

  return {
    data: dataResult.rows.map(mapDbToInvoice),
    total: parseInt(countResult.rows[0].count),
  };
}

export async function findInvoiceById(
  fastify: FastifyInstance,
  id: number,
): Promise<Invoice | null> {
  const { pg } = fastify;

  const query = `SELECT i.*, c.value as status_value
     FROM invoice i
     LEFT JOIN correspondance c ON i.status_code = c.code AND c.subject_code = 1
     WHERE i.invoice_id = ${id}`;

  console.log("findInvoiceById : ", query);

  const result = await pg.query(query);
  return result.rows[0] ? mapDbToInvoice(result.rows[0]) : null;
}

export async function findLinesByInvoiceId(
  fastify: FastifyInstance,
  invoiceId: number,
): Promise<InvoiceLine[]> {
  const { pg } = fastify;
  const query = `SELECT l.*, c.value as line_type_value
     FROM invoice_line l
     LEFT JOIN correspondance c ON l.line_type_code = c.code AND c.subject_code = 200
     WHERE l.invoice_id = ${invoiceId}
     ORDER BY l.line_id`;
  console.log("findInvoiceById : ", query);

  const result = await pg.query(query);
  return result.rows.map(mapDbToInvoiceLine);
}

export async function createInvoice(
  fastify: FastifyInstance,
  data: CreateInvoiceDto,
): Promise<Invoice> {
  const { pg } = fastify;
  const { garageId, vehicleId, issueDate, dueDate, statusCode, notes, createdBy } = data;
  const result = await pg.query(
    `INSERT INTO invoice (garage_id, vehicle_id, issue_date, due_date, status_code, notes, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      garageId,
      vehicleId,
      issueDate || new Date().toISOString().split("T")[0],
      dueDate,
      statusCode,
      notes,
      createdBy,
    ],
  );
  return mapDbToInvoice(result.rows[0]);
}

export async function updateInvoice(
  fastify: FastifyInstance,
  id: number,
  data: UpdateInvoiceDto,
): Promise<Invoice | null> {
  const { pg } = fastify;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const fieldMap: Record<string, string> = {
    garageId: "garage_id",
    vehicleId: "vehicle_id",
    issueDate: "issue_date",
    dueDate: "due_date",
    statusCode: "status_code",
    notes: "notes",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && fieldMap[key]) {
      fields.push(`${fieldMap[key]} = $${idx++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE invoice SET ${fields.join(", ")} WHERE invoice_id = $${idx} RETURNING *`;
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToInvoice(result.rows[0]) : null;
}

export async function deleteInvoice(fastify: FastifyInstance, id: number): Promise<boolean> {
  const { pg } = fastify;
  await pg.query("DELETE FROM invoice_line WHERE invoice_id = $1", [id]); // manually cascade
  const result = await pg.query("DELETE FROM invoice WHERE invoice_id = $1 RETURNING invoice_id", [
    id,
  ]);
  return result.rowCount ? result.rowCount > 0 : false;
}

//--------------------------------------------------------------------------------------------------------------------------
// server/src/entity/invoice/invoice.repository.ts
export async function getInvoicesInfoList(fastify: FastifyInstance): Promise<InvoiceInfo[]> {
  const { pg } = fastify;
  const query = `
    SELECT
      i.id AS "invoiceId",
      i.invoice_number AS "invoiceNumber",
      i.issue_date AS "issueDate",
      i.due_date AS "dueDate",
      i.status_code AS "statusCode",
      c.value AS "statusText",
      o.first_name AS "ownerFirstName",
      o.last_name AS "ownerLastName",
      b.name AS "vehicleBrand",
      m.name AS "vehicleModel",
      v.color AS "vehicleColor",
      v.plate_number AS "vehiclePlateNumber"
    FROM invoice i
    JOIN correspondance c ON i.status_code = c.code AND c.subject_code = 1
    JOIN vehicle v ON i.vehicle_id = v.id
    JOIN owners o ON v.owner_id = o.id
    JOIN model m ON v.model_id = m.id
    JOIN brand b ON m.brand_id = b.id
    ORDER BY i.issue_date DESC
  `;
  const result = await pg.query(query);
  return result.rows;
}
//--------------------------------------------------------------------------------------------------------------------------

// ----- Invoice lines -----
export async function createInvoiceLine(
  fastify: FastifyInstance,
  data: CreateInvoiceLineDto,
): Promise<InvoiceLine> {
  const { pg } = fastify;
  const { invoiceId, lineTypeCode, description, quantity, unitPrice, discountRate = 0 } = data;
  const result = await pg.query(
    `INSERT INTO invoice_line (invoice_id, line_type_code, description, quantity, unit_price, discount_rate)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [invoiceId, lineTypeCode, description, quantity, unitPrice, discountRate],
  );
  return mapDbToInvoiceLine(result.rows[0]);
}

export async function updateInvoiceLine(
  fastify: FastifyInstance,
  lineId: number,
  data: UpdateInvoiceLineDto,
): Promise<InvoiceLine | null> {
  const { pg } = fastify;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const fieldMap: Record<string, string> = {
    lineTypeCode: "line_type_code",
    description: "description",
    quantity: "quantity",
    unitPrice: "unit_price",
    discountRate: "discount_rate",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && fieldMap[key]) {
      fields.push(`${fieldMap[key]} = $${idx++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return null;

  values.push(lineId);
  const query = `UPDATE invoice_line SET ${fields.join(", ")} WHERE line_id = $${idx} RETURNING *`;
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToInvoiceLine(result.rows[0]) : null;
}

export async function deleteInvoiceLine(
  fastify: FastifyInstance,
  lineId: number,
): Promise<boolean> {
  const { pg } = fastify;
  const result = await pg.query("DELETE FROM invoice_line WHERE line_id = $1 RETURNING line_id", [
    lineId,
  ]);
  return result.rowCount ? result.rowCount > 0 : false;
}
