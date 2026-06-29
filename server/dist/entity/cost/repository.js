"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCosts = findAllCosts;
exports.findCostById = findCostById;
exports.findActiveCostByDate = findActiveCostByDate;
exports.createCost = createCost;
exports.updateCost = updateCost;
exports.deleteCost = deleteCost;
function mapDbToCost(row) {
    return {
        id: row.id,
        name: row.name,
        monthlyBase: parseFloat(row.monthly_base),
        dayWork: parseFloat(row.day_work),
        hourWork: parseFloat(row.hour_work),
        effectiveDate: row.effective_date,
        endDate: row.end_date,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
async function findAllCosts(fastify, params = {}) {
    const { pg } = fastify;
    const { page = 1, limit = 20, effectiveDate } = params;
    const offset = (page - 1) * limit;
    let whereClause = "";
    const values = [];
    let idx = 1;
    if (effectiveDate) {
        whereClause = ` WHERE effective_date <= $${idx} AND (end_date IS NULL OR end_date >= $${idx})`;
        values.push(effectiveDate);
        idx++;
    }
    const countQuery = `SELECT COUNT(*) FROM cost${whereClause}`;
    const dataQuery = `
    SELECT * FROM cost
    ${whereClause}
    ORDER BY effective_date DESC
    LIMIT $${idx} OFFSET $${idx + 1}
  `;
    const [countResult, dataResult] = await Promise.all([
        pg.query(countQuery, values),
        pg.query(dataQuery, [...values, limit, offset]),
    ]);
    return {
        data: dataResult.rows.map(mapDbToCost),
        total: parseInt(countResult.rows[0].count),
    };
}
async function findCostById(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("SELECT * FROM cost WHERE id = $1", [id]);
    return result.rows[0] ? mapDbToCost(result.rows[0]) : null;
}
async function findActiveCostByDate(fastify, date) {
    const { pg } = fastify;
    const result = await pg.query(`SELECT * FROM cost 
     WHERE effective_date <= $1 AND (end_date IS NULL OR end_date >= $1)
     ORDER BY effective_date DESC
     LIMIT 1`, [date]);
    return result.rows[0] ? mapDbToCost(result.rows[0]) : null;
}
async function createCost(fastify, data) {
    const { pg } = fastify;
    const { name, monthlyBase, dayWork = 0, hourWork = 0, effectiveDate, endDate, createdBy } = data;
    const result = await pg.query(`INSERT INTO cost (name, monthly_base, day_work, hour_work, effective_date, end_date, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`, [name, monthlyBase, dayWork, hourWork, effectiveDate, endDate || null, createdBy]);
    return mapDbToCost(result.rows[0]);
}
async function updateCost(fastify, id, data) {
    const { pg } = fastify;
    const fields = [];
    const values = [];
    let idx = 1;
    const fieldMap = {
        name: "name",
        monthlyBase: "monthly_base",
        dayWork: "day_work",
        hourWork: "hour_work",
        effectiveDate: "effective_date",
        endDate: "end_date",
    };
    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && fieldMap[key]) {
            fields.push(`${fieldMap[key]} = $${idx++}`);
            values.push(value);
        }
    }
    if (fields.length === 0)
        return null;
    values.push(id);
    const query = `UPDATE cost SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToCost(result.rows[0]) : null;
}
async function deleteCost(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("DELETE FROM cost WHERE id = $1 RETURNING id", [id]);
    return result.rowCount ? result.rowCount > 0 : false;
}
