"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllParts = findAllParts;
exports.findPartById = findPartById;
exports.findPartByCode = findPartByCode;
exports.createPart = createPart;
exports.updatePart = updatePart;
exports.deletePart = deletePart;
function mapDbToPart(row) {
    return {
        id: row.id,
        code: row.code,
        name: row.name,
        description: row.description,
        purchasePrice: row.purchase_price,
        sellingPrice: row.selling_price,
        markupMultiplier: parseFloat(row.markup_multiplier),
        stockQuantity: row.stock_quantity,
        supplier: row.supplier,
        isActive: row.is_active,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
async function findAllParts(fastify, params = {}) {
    const { pg } = fastify;
    const { page = 1, limit = 20, search, minPrice, maxPrice, lowStock, isActive, supplier } = params;
    const offset = (page - 1) * limit;
    let whereClause = "";
    const values = [];
    let idx = 1;
    if (search) {
        whereClause += ` WHERE (code ILIKE $${idx} OR name ILIKE $${idx} OR supplier ILIKE $${idx})`;
        values.push(`%${search}%`);
        idx++;
    }
    if (supplier) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` supplier ILIKE $${idx}`;
        values.push(`%${supplier}%`);
        idx++;
    }
    if (minPrice !== undefined) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` selling_price >= $${idx}`;
        values.push(minPrice);
        idx++;
    }
    if (maxPrice !== undefined) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` selling_price <= $${idx}`;
        values.push(maxPrice);
        idx++;
    }
    if (lowStock) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` stock_quantity <= 5`;
    }
    if (isActive !== undefined) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` is_active = $${idx}`;
        values.push(isActive);
        idx++;
    }
    const countQuery = `SELECT COUNT(*) FROM spare_part${whereClause}`;
    const dataQuery = `
    SELECT * FROM spare_part
    ${whereClause}
    ORDER BY name
    LIMIT $${idx} OFFSET $${idx + 1}
  `;
    const [countResult, dataResult] = await Promise.all([
        pg.query(countQuery, values),
        pg.query(dataQuery, [...values, limit, offset]),
    ]);
    return {
        data: dataResult.rows.map(mapDbToPart),
        total: parseInt(countResult.rows[0].count),
    };
}
async function findPartById(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("SELECT * FROM spare_part WHERE id = $1", [id]);
    return result.rows[0] ? mapDbToPart(result.rows[0]) : null;
}
async function findPartByCode(fastify, code) {
    const { pg } = fastify;
    const result = await pg.query("SELECT * FROM spare_part WHERE code = $1", [code]);
    return result.rows[0] ? mapDbToPart(result.rows[0]) : null;
}
async function createPart(fastify, data) {
    const { pg } = fastify;
    const { code, name, description, purchasePrice = 0, sellingPrice = 0, markupMultiplier = 1.0, stockQuantity = 0, supplier, createdBy, } = data;
    const result = await pg.query(`INSERT INTO spare_part (code, name, description, purchase_price, selling_price, markup_multiplier, stock_quantity, supplier, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`, [
        code,
        name,
        description,
        purchasePrice,
        sellingPrice,
        markupMultiplier,
        stockQuantity,
        supplier,
        createdBy,
    ]);
    return mapDbToPart(result.rows[0]);
}
async function updatePart(fastify, id, data) {
    const { pg } = fastify;
    const fields = [];
    const values = [];
    let idx = 1;
    const fieldMap = {
        name: "name",
        description: "description",
        purchasePrice: "purchase_price",
        sellingPrice: "selling_price",
        markupMultiplier: "markup_multiplier",
        stockQuantity: "stock_quantity",
        supplier: "supplier",
        isActive: "is_active",
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
    const query = `UPDATE spare_part SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToPart(result.rows[0]) : null;
}
async function deletePart(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("DELETE FROM spare_part WHERE id = $1 RETURNING id", [id]);
    return result.rowCount ? result.rowCount > 0 : false;
}
