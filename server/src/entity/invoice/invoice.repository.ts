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
import { generateInvoiceNumber } from "../../common/helper";

function mapDbToInvoiceInfo(row: any): InvoiceInfo {
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
    statusText: row.statusText,
    vehicleModelId: row.vehicleModelId,
    vehicleBrandId: row.vehicleBrandId,
    ownerId: row.ownerId,
    ownerFirstName: row.ownerFirstName,
    ownerLastName: row.ownerLastName,
    ownerAddress: row.ownerAddress,
    ownerCity: row.ownerCity,
    ownerPhone: row.ownerPhone,
    vehicleBrand: row.vehicleBrand,
    vehicleModel: row.vehicleModel,
    vehicleColor: row.vehicleColor,
    vehiclePlateNumber: row.vehiclePlateNumber,
  };
}

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
//--------------------------------------------------------------------------------------------------------------------------

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
//--------------------------------------------------------------------------------------------------------------------------

export async function findInvoiceById(
  fastify: FastifyInstance,
  id: number,
): Promise<Invoice | null> {
  const { pg } = fastify;

  const query = `SELECT i.*, c.valuestr as status_value
     FROM invoice i
     LEFT JOIN correspondance c ON i.status_code = c.code AND c.subject_code = 1
     WHERE i.id = ${id}`;

  console.log("findInvoiceById : ", query);

  const result = await pg.query(query);
  return result.rows[0] ? mapDbToInvoice(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------

export async function findInvoiceLineByInvoiceId(
  fastify: FastifyInstance,
  invoiceId: number,
): Promise<InvoiceLine[]> {
  const { pg } = fastify;
  const query = `SELECT l.*, c.valuestr as line_type_value
     FROM invoice_line l
     LEFT JOIN correspondance c ON l.line_type_code = c.code AND c.subject_code = 200
     WHERE l.invoice_id = ${invoiceId}
     ORDER BY l.id`;
  console.log("findInvoiceById : ", query);

  const result = await pg.query(query);
  return result.rows.map(mapDbToInvoiceLine);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function createInvoice(
  fastify: FastifyInstance,
  data: CreateInvoiceDto,
): Promise<Invoice | null> {
  console.log("createInvoice data", data);

  const { pg } = fastify;
  const { garageId, vehicleId, invoiceNumber, issueDate, dueDate, statusCode, notes, createdBy } =
    data;
  console.log("createInvoice 177 typof dueDate", typeof dueDate);
  console.log("createInvoice 177  dueDate", dueDate);
  const result = await pg.query(
    `INSERT INTO invoice (garage_id, vehicle_id,invoice_number, issue_date, due_date, status_code, notes, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
     RETURNING *`,
    [
      garageId,
      vehicleId,
      invoiceNumber,
      issueDate || new Date().toISOString(),
      dueDate,
      statusCode,
      notes,
      createdBy,
    ],
  );
  console.log("createInvoice", result.rows[0]);
  console.log("createInvoice typof 193", typeof result.rows[0].due_date);
  console.log("createInvoice valu 193", result.rows[0].due_date);

  const titi = mapDbToInvoice(result.rows[0]);
  console.log("createInvoice typofvtiti.dueDate 195s", typeof titi.dueDate);
  // return mapDbToInvoice(result.rows[0]);
  return titi;
}
//--------------------------------------------------------------------------------------------------------------------------

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
    invoiceNumber: "invoice_number",
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
  const query = `UPDATE invoice SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;

  const result = await pg.query(query, values);
  console.log("wait pg.query(query,);", query);
  console.log("wait pg.query(, values);", values);
  console.log("wait pg.query(, result);", result);

  return result.rows[0] ? mapDbToInvoice(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------

export async function deleteInvoice(fastify: FastifyInstance, id: number): Promise<boolean> {
  const { pg } = fastify;
  await pg.query("DELETE FROM invoice_line WHERE id = $1", [id]); // manually cascade
  const result = await pg.query("DELETE FROM invoice WHERE id = $1 RETURNING id", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}

//--------------------------------------------------------------------------------------------------------------------------
// server/src/entity/invoice/invoice.repository.ts
export async function getInvoicesInfoList(fastify: FastifyInstance): Promise<InvoiceInfo[]> {
  const { pg } = fastify;
  const query = `
    SELECT
      i.*,
      c.valueStr AS "statusText",
      o.id AS "ownerId",
      o.first_name AS "ownerFirstName",
      o.last_name AS "ownerLastName",
      o.address AS "ownerAddress",
      o.city AS "ownerCity",
      o.phone_number AS "ownerPhone",
      b.name AS "vehicleBrand",
      m.id AS "vehicleModelId",
      m.name AS "vehicleModel",
      v.color AS "vehicleColor",
      v.plate_number AS "vehiclePlateNumber",
      b.id AS "vehicleBrandId",
      v.id AS "vehicleId"
    FROM invoice i
    JOIN correspondance c ON i.status_code = c.code AND c.subject_code = 1
    JOIN vehicle v ON i.vehicle_id = v.id
    JOIN owners o ON v.owner_id = o.id
    JOIN model m ON v.model_id = m.id
    JOIN brand b ON m.brand_id = b.id
    ORDER BY i.issue_date DESC
  `;
  const result = await pg.query(query);
  return result.rows.map(mapDbToInvoiceInfo);
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
//--------------------------------------------------------------------------------------------------------------------------

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
  const query = `UPDATE invoice_line SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
  console.log("query", query);
  console.log("values", values);
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToInvoiceLine(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------

export async function deleteInvoiceLine(
  fastify: FastifyInstance,
  lineId: number,
): Promise<boolean> {
  const { pg } = fastify;
  const result = await pg.query("DELETE FROM invoice_line WHERE id = $1 RETURNING id", [lineId]);
  return result.rowCount ? result.rowCount > 0 : false;
}
