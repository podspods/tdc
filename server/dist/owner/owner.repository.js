"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findById = findById;
exports.findByPhone = findByPhone;
exports.findByEmail = findByEmail;
exports.create = create;
exports.update = update;
exports.updateStats = updateStats;
exports._delete = _delete;
exports.getStats = getStats;
/**
 * Map database snake_case to application camelCase
 */
function mapDbToOwner(row) {
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        phoneNumber: row.phone_number,
        email: row.email,
        address: row.address,
        city: row.city,
        category: row.category,
        notes: row.notes,
        // status: row.status,
        // totalMotorcycles: row.total_motorcycles || 0,
        // totalInvoices: row.total_invoices || 0,
        // totalSpent: parseFloat(row.total_spent || "0"),
        // lastVisitDate: row.last_visit_date,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        // fullName: `${row.first_name} ${row.last_name}`,
    };
}
/**
 * Find all owners with pagination and filters
 */
async function findAll(fastify, params = {}) {
    const { pg } = fastify;
    const { page = 1, limit = 20, search, category, city, minSpent, maxSpent } = params;
    const offset = (page - 1) * limit;
    let whereClause = "";
    const values = [];
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
    // if (hasOutstandingInvoices) {
    //   whereClause += whereClause ? " AND" : " WHERE";
    //   whereClause += ` EXISTS (SELECT 1 FROM invoices i WHERE i.owner_id = o.id AND i.status = 'pending')`;
    // }
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
}
/**
 * Find owner by ID
 */
async function findById(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query(`SELECT * FROM owners WHERE id = $1`, [id]);
    return result.rows[0] ? mapDbToOwner(result.rows[0]) : null;
}
/**
 * Find owner by phone number (unique)
 */
async function findByPhone(fastify, phoneNumber) {
    const { pg } = fastify;
    const result = await pg.query(`SELECT * FROM owners WHERE phone_number = $1`, [phoneNumber]);
    return result.rows[0] ? mapDbToOwner(result.rows[0]) : null;
}
/**
 * Find owner by email (unique)
 */
async function findByEmail(fastify, email) {
    const { pg } = fastify;
    const result = await pg.query(`SELECT * FROM owners WHERE email = $1`, [email]);
    return result.rows[0] ? mapDbToOwner(result.rows[0]) : null;
}
/**
 * Create new owner
 */
async function create(fastify, data) {
    const { pg } = fastify;
    const { firstName, lastName, phoneNumber, email, address, city, category, notes, createdBy } = data;
    const result = await pg.query(`INSERT INTO owners (
      first_name, last_name, phone_number, email, address, city,
      category, notes, created_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`, [firstName, lastName, phoneNumber, email, address, city, category || 0, notes, createdBy]);
    return mapDbToOwner(result.rows[0]);
}
/**
 * Update owner
 */
async function update(fastify, id, data) {
    const { pg } = fastify;
    const fields = [];
    const values = [];
    let paramCount = 1;
    const fieldMappings = {
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
    if (fields.length === 0)
        return null;
    values.push(id);
    const query = `UPDATE owners SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToOwner(result.rows[0]) : null;
}
/**
 * Update owner stats (after adding motorcycle or invoice)
 */
async function updateStats(fastify, id) {
    const { pg } = fastify;
    await pg.query(`UPDATE owners SET
      total_motorcycles = (SELECT COUNT(*) FROM registrations WHERE id = $1),
      total_invoices = (SELECT COUNT(*) FROM invoices WHERE id = $1),
      total_spent = (SELECT COALESCE(SUM(total_amount), 0) FROM invoices WHERE owner_id = $1 AND status = 'paid'),
      last_visit_date = (
        SELECT MAX(issue_date) 
        FROM invoices 
        WHERE owner_id = $1 AND status IN ('paid', 'pending')
      )
    WHERE owner_id = $1`, [id]);
}
/**
 * Delete owner
 */
async function _delete(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("DELETE FROM owners WHERE id = $1 RETURNING owner_id", [id]);
    return result.rowCount ? result.rowCount > 0 : false;
}
/**
 * Get statistics
 */
async function getStats(fastify) {
    const { pg } = fastify;
    const totalResult = await pg.query("SELECT COUNT(*) FROM owners");
    const categoryResult = await pg.query(`SELECT category, COUNT(*) as count 
     FROM owners 
     GROUP BY category`);
    const spentResult = await pg.query(`SELECT 
      SUM(total_spent) as total_spent,
      AVG(total_spent) as avg_spent
     FROM owners`);
    const citiesResult = await pg.query(`SELECT city, COUNT(*) as count
     FROM owners
     WHERE city IS NOT NULL
     GROUP BY city
     ORDER BY count DESC
     LIMIT 5`);
    // const ZcategoryCounts = {
    //   basic: 0,
    //   important: 0,
    //   vip: 0,
    // };
    // categoryResult.rows.forEach((row: any) => {
    //   categoryCounts[row.category as keyof typeof categoryCounts] = parseInt(row.count);
    // });
    return {
        // totalOwners: parseInt(totalResult.rows[0].count),
        // byCategory: ZcategoryCounts,
        totalSpentAll: parseFloat(spentResult.rows[0].total_spent || "0"),
        averageSpentPerOwner: parseFloat(spentResult.rows[0].avg_spent || "0"),
        topCities: citiesResult.rows.map((row) => ({
            city: row.city,
            count: parseInt(row.count),
        })),
        total: 0,
        active: 0,
        blocked: 0,
        inactive: 0,
        byCategory: { basic: 0, important: 0, vip: 0, gold: 0, platinum: 0 },
    };
}
