import { FastifyInstance } from "fastify";
import {
  Owner,
  CreateOwnerDto,
  UpdateOwnerDto,
  OwnerQueryParams,
  OwnerStats,
  OwnerWithDetails,
} from "../types/owner.types";

/**
 * Map database snake_case to application camelCase
 */
const mapDbToOwner = (row: any): Owner => ({
  ownerId: row.owner_id,
  firstName: row.first_name,
  lastName: row.last_name,
  phoneNumber: row.phone_number,
  email: row.email,
  address: row.address,
  city: row.city,
  category: row.category,
  notes: row.notes,
  totalMotorcycles: row.total_motorcycles || 0,
  totalInvoices: row.total_invoices || 0,
  totalSpent: parseFloat(row.total_spent || "0"),
  lastVisitDate: row.last_visit_date,
  createdBy: row.created_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  fullName: `${row.first_name} ${row.last_name}`,
});

export const createOwnerRepository = (fastify: FastifyInstance) => {
  const { pg } = fastify;

  /**
   * Find all owners with pagination and filters
   */
  const findAll = async (
    params: OwnerQueryParams = {},
  ): Promise<{ data: Owner[]; total: number }> => {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      city,
      minSpent,
      maxSpent,
      hasOutstandingInvoices,
    } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    const values: any[] = [];
    let paramCount = 1;

    if (search) {
      whereClause += ` WHERE (o.first_name ILIKE $${paramCount} OR o.last_name ILIKE $${paramCount} OR o.phone_number ILIKE $${paramCount})`;
      values.push(`%${search}%`);
      paramCount++;
    }

    if (category) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` o.category = $${paramCount++}`;
      values.push(category);
    }

    if (city) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` o.city ILIKE $${paramCount++}`;
      values.push(`%${city}%`);
    }

    if (minSpent !== undefined) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` o.total_spent >= $${paramCount++}`;
      values.push(minSpent);
    }

    if (maxSpent !== undefined) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` o.total_spent <= $${paramCount++}`;
      values.push(maxSpent);
    }

    if (hasOutstandingInvoices) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` EXISTS (SELECT 1 FROM invoices i WHERE i.owner_id = o.owner_id AND i.status = 'pending')`;
    }

    const countQuery = `
      SELECT COUNT(*) 
      FROM owners o
      ${whereClause}
    `;

    const dataQuery = `
      SELECT o.*
      FROM owners o
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const [countResult, dataResult] = await Promise.all([
      pg.query(countQuery, values),
      pg.query(dataQuery, [...values, limit, offset]),
    ]);

    return {
      data: dataResult.rows.map(mapDbToOwner),
      total: parseInt(countResult.rows[0].count),
    };
  };

  /**
   * Find owner by ID
   */
  const findById = async (id: number): Promise<Owner | null> => {
    const result = await pg.query(`SELECT * FROM owners WHERE owner_id = $1`, [id]);
    return result.rows[0] ? mapDbToOwner(result.rows[0]) : null;
  };

  /**
   * Find owner by phone number (unique)
   */
  const findByPhone = async (phoneNumber: string): Promise<Owner | null> => {
    const result = await pg.query(`SELECT * FROM owners WHERE phone_number = $1`, [phoneNumber]);
    return result.rows[0] ? mapDbToOwner(result.rows[0]) : null;
  };

  /**
   * Find owner by email (unique)
   */
  const findByEmail = async (email: string): Promise<Owner | null> => {
    const result = await pg.query(`SELECT * FROM owners WHERE email = $1`, [email]);
    return result.rows[0] ? mapDbToOwner(result.rows[0]) : null;
  };

  /**
   * Get owner with details (motorcycles and invoices)
   */
  const findWithDetails = async (id: number): Promise<OwnerWithDetails | null> => {
    const ownerResult = await pg.query(`SELECT * FROM owners WHERE owner_id = $1`, [id]);

    if (ownerResult.rows.length === 0) return null;

    const owner = mapDbToOwner(ownerResult.rows[0]);

    // Get motorcycles
    const motorcyclesResult = await pg.query(
      `SELECT r.*, b.brand_name, m.model_name
       FROM registrations r
       JOIN motorcycle_brands b ON r.brand_id = b.brand_id
       LEFT JOIN motorcycle_models m ON r.model_id = m.model_id
       WHERE r.owner_id = $1`,
      [id],
    );

    // Get invoices
    const invoicesResult = await pg.query(
      `SELECT * FROM invoices WHERE owner_id = $1 ORDER BY issue_date DESC`,
      [id],
    );

    const outstandingInvoices = invoicesResult.rows.filter(
      (inv: any) => inv.status === "pending",
    ).length;

    const totalPaid = invoicesResult.rows
      .filter((inv: any) => inv.status === "paid")
      .reduce((sum: number, inv: any) => sum + parseFloat(inv.total_amount), 0);

    return {
      ...owner,
      motorcycles: motorcyclesResult.rows.map((row: any) => ({
        registrationId: row.registration_id,
        plateNumber: row.plate_number,
        brandName: row.brand_name,
        modelName: row.model_name,
        color: row.color,
      })),
      invoices: invoicesResult.rows.map((row: any) => ({
        invoiceId: row.invoice_id,
        invoiceNumber: row.invoice_number,
        issueDate: row.issue_date,
        dueDate: row.due_date,
        status: row.status,
        totalAmount: parseFloat(row.total_amount),
      })),
      outstandingInvoices,
      totalPaid,
    };
  };

  /**
   * Create new owner
   */
  const create = async (data: CreateOwnerDto): Promise<Owner> => {
    const { firstName, lastName, phoneNumber, email, address, city, category, notes, createdBy } =
      data;

    const result = await pg.query(
      `INSERT INTO owners (
        first_name, last_name, phone_number, email, address, city,
        category, notes, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        city,
        category || "basic",
        notes,
        createdBy,
      ],
    );

    return mapDbToOwner(result.rows[0]);
  };

  /**
   * Update owner
   */
  const update = async (id: number, data: UpdateOwnerDto): Promise<Owner | null> => {
    const fields: string[] = [];
    const values = [];
    let paramCount = 1;

    const fieldMappings: Record<string, string> = {
      firstName: "first_name",
      lastName: "last_name",
      phoneNumber: "phone_number",
      email: "email",
      address: "address",
      city: "city",
      category: "category",
      notes: "notes",
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && fieldMappings[key]) {
        fields.push(`${fieldMappings[key]} = $${paramCount++}`);
        values.push(value);
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE owners SET ${fields.join(", ")} WHERE owner_id = $${paramCount} RETURNING *`;

    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToOwner(result.rows[0]) : null;
  };

  /**
   * Update owner stats (after adding motorcycle or invoice)
   */
  const updateStats = async (id: number): Promise<void> => {
    await pg.query(
      `UPDATE owners SET
        total_motorcycles = (SELECT COUNT(*) FROM registrations WHERE owner_id = $1),
        total_invoices = (SELECT COUNT(*) FROM invoices WHERE owner_id = $1),
        total_spent = (SELECT COALESCE(SUM(total_amount), 0) FROM invoices WHERE owner_id = $1 AND status = 'paid'),
        last_visit_date = (
          SELECT MAX(issue_date) 
          FROM invoices 
          WHERE owner_id = $1 AND status IN ('paid', 'pending')
        )
      WHERE owner_id = $1`,
      [id],
    );
  };

  /**
   * Delete owner
   */
  const remove = async (id: number): Promise<boolean> => {
    const result = await pg.query("DELETE FROM owners WHERE owner_id = $1 RETURNING owner_id", [
      id,
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
  };

  /**
   * Get statistics
   */
  const getStats = async (): Promise<OwnerStats> => {
    const totalResult = await pg.query("SELECT COUNT(*) FROM owners");

    const categoryResult = await pg.query(
      `SELECT category, COUNT(*) as count 
       FROM owners 
       GROUP BY category`,
    );

    const spentResult = await pg.query(
      `SELECT 
        SUM(total_spent) as total_spent,
        AVG(total_spent) as avg_spent
       FROM owners`,
    );

    const citiesResult = await pg.query(
      `SELECT city, COUNT(*) as count
       FROM owners
       WHERE city IS NOT NULL
       GROUP BY city
       ORDER BY count DESC
       LIMIT 5`,
    );

    const categoryCounts = {
      basic: 0,
      important: 0,
      vip: 0,
    };

    categoryResult.rows.forEach((row: any) => {
      categoryCounts[row.category as keyof typeof categoryCounts] = parseInt(row.count);
    });

    return {
      totalOwners: parseInt(totalResult.rows[0].count),
      byCategory: categoryCounts,
      totalSpentAll: parseFloat(spentResult.rows[0].total_spent || "0"),
      averageSpentPerOwner: parseFloat(spentResult.rows[0].avg_spent || "0"),
      topCities: citiesResult.rows.map((row: any) => ({
        city: row.city,
        count: parseInt(row.count),
      })),
    };
  };

  return {
    findAll,
    findById,
    findByPhone,
    findByEmail,
    findWithDetails,
    create,
    update,
    updateStats,
    delete: remove,
    getStats,
  };
};

export type OwnerRepository = ReturnType<typeof createOwnerRepository>;
