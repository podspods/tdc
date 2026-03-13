import { FastifyInstance } from "fastify";
import {
  Invoice,
  InvoiceLaborItem,
  InvoicePartItem,
  InvoiceConsumableItem,
  InvoicePayment,
  CreateInvoiceDto,
  UpdateInvoiceDto,
  AddLaborItemDto,
  AddPartItemDto,
  AddConsumableItemDto,
  AddPaymentDto,
  InvoiceQueryParams,
  InvoiceStats,
} from "../types/invoice.types";

/**
 * Map database snake_case to application camelCase
 */
const mapDbToLaborItem = (row: any): InvoiceLaborItem => ({
  laborItemId: row.labor_item_id,
  invoiceId: row.invoice_id,
  description: row.description,
  hours: parseFloat(row.hours),
  ratePerHour: parseFloat(row.rate_per_hour),
  amount: parseFloat(row.amount),
  mechanicName: row.mechanic_name,
  notes: row.notes,
  createdAt: row.created_at,
});

const mapDbToPartItem = (row: any): InvoicePartItem => ({
  partsItemId: row.parts_item_id,
  invoiceId: row.invoice_id,
  partName: row.part_name,
  partReference: row.part_reference,
  quantity: row.quantity,
  unitPrice: parseFloat(row.unit_price),
  amount: parseFloat(row.amount),
  supplier: row.supplier,
  warrantyMonths: row.warranty_months,
  notes: row.notes,
  createdAt: row.created_at,
});

const mapDbToConsumableItem = (row: any): InvoiceConsumableItem => ({
  consumableItemId: row.consumable_item_id,
  invoiceId: row.invoice_id,
  consumableName: row.consumable_name,
  quantity: parseFloat(row.quantity),
  unit: row.unit,
  unitPrice: parseFloat(row.unit_price),
  amount: parseFloat(row.amount),
  notes: row.notes,
  createdAt: row.created_at,
});

const mapDbToPayment = (row: any): InvoicePayment => ({
  paymentId: row.payment_id,
  invoiceId: row.invoice_id,
  paymentDate: row.payment_date,
  amount: parseFloat(row.amount),
  paymentMethod: row.payment_method,
  reference: row.reference,
  notes: row.notes,
  createdBy: row.created_by,
  createdAt: row.created_at,
});

const mapDbToInvoice = (row: any): Invoice => ({
  invoiceId: row.invoice_id,
  invoiceNumber: row.invoice_number,
  registrationId: row.registration_id,
  ownerId: row.owner_id,

  issueDate: row.issue_date,
  dueDate: row.due_date,
  closedDate: row.closed_date,

  status: row.status,

  subtotalLabor: parseFloat(row.subtotal_labor),
  subtotalParts: parseFloat(row.subtotal_parts),
  subtotalConsumables: parseFloat(row.subtotal_consumables),
  subtotal: parseFloat(row.subtotal),
  taxRate: parseFloat(row.tax_rate),
  taxAmount: parseFloat(row.tax_amount),
  totalAmount: parseFloat(row.total_amount),

  amountPaid: parseFloat(row.amount_paid),
  amountDue: parseFloat(row.amount_due),

  paymentMethod: row.payment_method,
  paymentReference: row.payment_reference,
  paymentDate: row.payment_date,

  notes: row.notes,
  internalNotes: row.internal_notes,

  createdBy: row.created_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,

  // Relations if joined
  registration: row.plate_number
    ? {
        plateNumber: row.plate_number,
        brandName: row.brand_name,
        modelName: row.model_name,
      }
    : undefined,

  owner: row.owner_first_name
    ? {
        firstName: row.owner_first_name,
        lastName: row.owner_last_name,
        fullName: `${row.owner_first_name} ${row.owner_last_name}`,
        phoneNumber: row.owner_phone_number,
      }
    : undefined,
});

export const createInvoiceRepository = (fastify: FastifyInstance) => {
  const { pg } = fastify;

  /**
   * Find all invoices with pagination and filters
   */
  const findAll = async (
    params: InvoiceQueryParams = {},
  ): Promise<{ data: Invoice[]; total: number }> => {
    const {
      page = 1,
      limit = 20,
      registrationId,
      ownerId,
      status,
      fromDate,
      toDate,
      overdue,
      search,
    } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    const values: any[] = [];
    let paramCount = 1;

    if (registrationId) {
      whereClause += ` WHERE i.registration_id = $${paramCount++}`;
      values.push(registrationId);
    }

    if (ownerId) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` i.owner_id = $${paramCount++}`;
      values.push(ownerId);
    }

    if (status) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` i.status = $${paramCount++}`;
      values.push(status);
    }

    if (fromDate) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` i.issue_date >= $${paramCount++}`;
      values.push(fromDate);
    }

    if (toDate) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` i.issue_date <= $${paramCount++}`;
      values.push(toDate);
    }

    if (overdue) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` i.status = 'pending' AND i.due_date < CURRENT_DATE`;
    }

    if (search) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` (i.invoice_number ILIKE $${paramCount} OR r.plate_number ILIKE $${paramCount} OR o.first_name ILIKE $${paramCount} OR o.last_name ILIKE $${paramCount})`;
      values.push(`%${search}%`);
      paramCount++;
    }

    const countQuery = `
      SELECT COUNT(*) 
      FROM invoices i
      LEFT JOIN registrations r ON i.registration_id = r.registration_id
      LEFT JOIN owners o ON i.owner_id = o.owner_id
      ${whereClause}
    `;

    const dataQuery = `
      SELECT i.*, 
             r.plate_number, b.brand_name, m.model_name,
             o.first_name as owner_first_name, o.last_name as owner_last_name,
             o.phone_number as owner_phone_number
      FROM invoices i
      LEFT JOIN registrations r ON i.registration_id = r.registration_id
      LEFT JOIN motorcycle_brands b ON r.brand_id = b.brand_id
      LEFT JOIN motorcycle_models m ON r.model_id = m.model_id
      LEFT JOIN owners o ON i.owner_id = o.owner_id
      ${whereClause}
      ORDER BY i.issue_date DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const [countResult, dataResult] = await Promise.all([
      pg.query(countQuery, values),
      pg.query(dataQuery, [...values, limit, offset]),
    ]);

    return {
      data: dataResult.rows.map(mapDbToInvoice),
      total: parseInt(countResult.rows[0].count),
    };
  };

  /**
   * Find invoice by ID with all items
   */
  const findById = async (id: number): Promise<Invoice | null> => {
    const invoiceResult = await pg.query(
      `SELECT i.*, 
              r.plate_number, b.brand_name, m.model_name,
              o.first_name as owner_first_name, o.last_name as owner_last_name,
              o.phone_number as owner_phone_number
       FROM invoices i
       LEFT JOIN registrations r ON i.registration_id = r.registration_id
       LEFT JOIN motorcycle_brands b ON r.brand_id = b.brand_id
       LEFT JOIN motorcycle_models m ON r.model_id = m.model_id
       LEFT JOIN owners o ON i.owner_id = o.owner_id
       WHERE i.invoice_id = $1`,
      [id],
    );

    if (invoiceResult.rows.length === 0) return null;

    const invoice = mapDbToInvoice(invoiceResult.rows[0]);

    // Get labor items
    const laborResult = await pg.query(
      "SELECT * FROM invoice_labor_items WHERE invoice_id = $1 ORDER BY created_at",
      [id],
    );
    invoice.laborItems = laborResult.rows.map(mapDbToLaborItem);

    // Get parts items
    const partsResult = await pg.query(
      "SELECT * FROM invoice_parts_items WHERE invoice_id = $1 ORDER BY created_at",
      [id],
    );
    invoice.partsItems = partsResult.rows.map(mapDbToPartItem);

    // Get consumable items
    const consumablesResult = await pg.query(
      "SELECT * FROM invoice_consumable_items WHERE invoice_id = $1 ORDER BY created_at",
      [id],
    );
    invoice.consumableItems = consumablesResult.rows.map(mapDbToConsumableItem);

    // Get payments
    const paymentsResult = await pg.query(
      "SELECT * FROM invoice_payments WHERE invoice_id = $1 ORDER BY payment_date",
      [id],
    );
    invoice.payments = paymentsResult.rows.map(mapDbToPayment);

    return invoice;
  };

  /**
   * Find invoice by number
   */
  const findByNumber = async (invoiceNumber: string): Promise<Invoice | null> => {
    const result = await pg.query("SELECT * FROM invoices WHERE invoice_number = $1", [
      invoiceNumber,
    ]);
    return result.rows[0] ? mapDbToInvoice(result.rows[0]) : null;
  };

  /**
   * Create new invoice
   */
  const create = async (data: CreateInvoiceDto): Promise<Invoice> => {
    const {
      registrationId,
      ownerId,
      issueDate,
      dueDate,
      status,
      taxRate,
      notes,
      internalNotes,
      createdBy,
    } = data;

    const result = await pg.query(
      `INSERT INTO invoices (
        registration_id, owner_id, issue_date, due_date, status,
        tax_rate, notes, internal_notes, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        registrationId,
        ownerId,
        issueDate || new Date().toISOString().split("T")[0],
        dueDate,
        status || "pending",
        taxRate || 10.0,
        notes,
        internalNotes,
        createdBy,
      ],
    );

    const invoice = mapDbToInvoice(result.rows[0]);

    // Add labor items if provided
    if (data.laborItems && data.laborItems.length > 0) {
      for (const item of data.laborItems) {
        await addLaborItem({
          invoiceId: invoice.invoiceId,
          ...item,
        });
      }
    }

    // Add parts items if provided
    if (data.partsItems && data.partsItems.length > 0) {
      for (const item of data.partsItems) {
        await addPartItem({
          invoiceId: invoice.invoiceId,
          ...item,
        });
      }
    }

    // Add consumable items if provided
    if (data.consumableItems && data.consumableItems.length > 0) {
      for (const item of data.consumableItems) {
        await addConsumableItem({
          invoiceId: invoice.invoiceId,
          ...item,
        });
      }
    }

    return findById(invoice.invoiceId) as Promise<Invoice>;
  };

  /**
   * Update invoice
   */
  const update = async (id: number, data: UpdateInvoiceDto): Promise<Invoice | null> => {
    const fields: string[] = [];
    const values = [];
    let paramCount = 1;

    const fieldMappings: Record<string, string> = {
      dueDate: "due_date",
      status: "status",
      taxRate: "tax_rate",
      notes: "notes",
      internalNotes: "internal_notes",
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && fieldMappings[key]) {
        fields.push(`${fieldMappings[key]} = $${paramCount++}`);
        values.push(value);
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE invoices SET ${fields.join(", ")} WHERE invoice_id = $${paramCount} RETURNING *`;

    const result = await pg.query(query, values);
    return result.rows[0] ? findById(id) : null;
  };

  /**
   * Add labor item to invoice
   */
  const addLaborItem = async (data: AddLaborItemDto): Promise<InvoiceLaborItem> => {
    const { invoiceId, description, hours, ratePerHour, mechanicName, notes } = data;

    const result = await pg.query(
      `INSERT INTO invoice_labor_items (
        invoice_id, description, hours, rate_per_hour, mechanic_name, notes
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [invoiceId, description, hours, ratePerHour, mechanicName, notes],
    );

    return mapDbToLaborItem(result.rows[0]);
  };

  /**
   * Add part item to invoice
   */
  const addPartItem = async (data: AddPartItemDto): Promise<InvoicePartItem> => {
    const {
      invoiceId,
      partName,
      partReference,
      quantity,
      unitPrice,
      supplier,
      warrantyMonths,
      notes,
    } = data;

    const result = await pg.query(
      `INSERT INTO invoice_parts_items (
        invoice_id, part_name, part_reference, quantity, unit_price,
        supplier, warranty_months, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [invoiceId, partName, partReference, quantity, unitPrice, supplier, warrantyMonths, notes],
    );

    return mapDbToPartItem(result.rows[0]);
  };

  /**
   * Add consumable item to invoice
   */
  const addConsumableItem = async (data: AddConsumableItemDto): Promise<InvoiceConsumableItem> => {
    const { invoiceId, consumableName, quantity, unit, unitPrice, notes } = data;

    const result = await pg.query(
      `INSERT INTO invoice_consumable_items (
        invoice_id, consumable_name, quantity, unit, unit_price, notes
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [invoiceId, consumableName, quantity, unit, unitPrice, notes],
    );

    return mapDbToConsumableItem(result.rows[0]);
  };

  /**
   * Add payment to invoice
   */
  const addPayment = async (data: AddPaymentDto): Promise<InvoicePayment> => {
    const { invoiceId, amount, paymentMethod, reference, notes, paymentDate, createdBy } = data;

    // Start transaction
    await pg.query("BEGIN");

    try {
      // Insert payment
      const paymentResult = await pg.query(
        `INSERT INTO invoice_payments (
          invoice_id, payment_date, amount, payment_method, reference, notes, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          invoiceId,
          paymentDate || new Date().toISOString().split("T")[0],
          amount,
          paymentMethod,
          reference,
          notes,
          createdBy,
        ],
      );

      // Update invoice amount_paid
      await pg.query(
        `UPDATE invoices SET 
          amount_paid = amount_paid + $1,
          payment_method = $2,
          payment_reference = $3,
          payment_date = $4,
          status = CASE 
            WHEN amount_paid + $1 >= total_amount THEN 'paid'
            WHEN amount_paid + $1 > 0 THEN 'partially_paid'
            ELSE status
          END
        WHERE invoice_id = $5`,
        [amount, paymentMethod, reference, paymentDate || new Date(), invoiceId],
      );

      await pg.query("COMMIT");

      return mapDbToPayment(paymentResult.rows[0]);
    } catch (error) {
      await pg.query("ROLLBACK");
      throw error;
    }
  };

  /**
   * Remove item from invoice
   */
  const removeLaborItem = async (itemId: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM invoice_labor_items WHERE labor_item_id = $1 RETURNING labor_item_id",
      [itemId],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  const removePartItem = async (itemId: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM invoice_parts_items WHERE parts_item_id = $1 RETURNING parts_item_id",
      [itemId],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  const removeConsumableItem = async (itemId: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM invoice_consumable_items WHERE consumable_item_id = $1 RETURNING consumable_item_id",
      [itemId],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  /**
   * Delete invoice
   */
  const remove = async (id: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM invoices WHERE invoice_id = $1 RETURNING invoice_id",
      [id],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  /**
   * Get statistics
   */
  const getStats = async (): Promise<InvoiceStats> => {
    const totalsResult = await pg.query(
      `SELECT 
        COUNT(*) as total_invoices,
        COALESCE(SUM(total_amount), 0) as total_amount,
        COALESCE(SUM(amount_paid), 0) as total_paid,
        COALESCE(SUM(amount_due), 0) as total_due
      FROM invoices`,
    );

    const byStatusResult = await pg.query(
      `SELECT 
        status,
        COUNT(*) as count,
        COALESCE(SUM(total_amount), 0) as total
      FROM invoices
      GROUP BY status`,
    );

    const overdueResult = await pg.query(
      `SELECT 
        COUNT(*) as count,
        COALESCE(SUM(amount_due), 0) as amount
      FROM invoices
      WHERE status = 'pending' AND due_date < CURRENT_DATE`,
    );

    return {
      totalInvoices: parseInt(totalsResult.rows[0].total_invoices),
      totalAmount: parseFloat(totalsResult.rows[0].total_amount),
      totalPaid: parseFloat(totalsResult.rows[0].total_paid),
      totalDue: parseFloat(totalsResult.rows[0].total_due),
      byStatus: byStatusResult.rows.map((row: any) => ({
        status: row.status,
        count: parseInt(row.count),
        total: parseFloat(row.total),
      })),
      overdueCount: parseInt(overdueResult.rows[0].count),
      overdueAmount: parseFloat(overdueResult.rows[0].amount),
    };
  };

  return {
    findAll,
    findById,
    findByNumber,
    create,
    update,
    addLaborItem,
    addPartItem,
    addConsumableItem,
    addPayment,
    removeLaborItem,
    removePartItem,
    removeConsumableItem,
    delete: remove,
    getStats,
  };
};

export type InvoiceRepository = ReturnType<typeof createInvoiceRepository>;
