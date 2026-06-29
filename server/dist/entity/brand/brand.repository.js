"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllBrands = findAllBrands;
exports.findBrandById = findBrandById;
exports.findBrandByCode = findBrandByCode;
exports.findBrandByName = findBrandByName;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
exports.deleteBrand = deleteBrand;
function mapDbToBrand(row) {
    return {
        id: row.id,
        name: row.name,
        code: row.code,
        countryOfOrigin: row.country_of_origin,
        createdBy: row.created_by,
        createDate: row.create_date,
    };
}
//--------------------------------------------------------------------------------------------------------------------------
async function findAllBrands(fastify, params = {}) {
    const { pg } = fastify;
    const { page = 1, limit = 20, search } = params;
    let whereClause = "";
    const values = [];
    let idx = 1;
    if (search) {
        whereClause = ` WHERE name ILIKE $${idx} OR country_of_origin ILIKE $${idx} OR code  ILIKE $${idx}`;
        values.push(`%${search}%`);
        idx++;
    }
    const countQuery = `SELECT COUNT(*) FROM brand${whereClause}`;
    const countResult = await pg.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);
    const dataQueryCommon = `
    SELECT * FROM brand
    ${whereClause}
    ORDER BY name
  `;
    const hasPagination = limit > 0;
    const offset = hasPagination ? (page - 1) * limit : 0;
    const offsetAndLimit = `LIMIT $${values.length + 1} OFFSET $${values.length + 1 + 1}`;
    const dataQuery = hasPagination ? `${dataQueryCommon} ${offsetAndLimit}` : dataQueryCommon;
    const queryParams = hasPagination ? [...values, limit, offset] : values;
    const dataResult = await pg.query(dataQuery, queryParams);
    // const [countResult, dataResult] = await Promise.all([
    //   pg.query(countQuery, values),
    //   pg.query(dataQuery, [...values, limit, offset]),
    // ]);
    return {
        data: dataResult.rows.map(mapDbToBrand),
        total: parseInt(countResult.rows[0].count),
    };
}
//--------------------------------------------------------------------------------------------------------------------------
async function findBrandById(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("SELECT * FROM brand WHERE id = $1", [id]);
    return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------
async function findBrandByCode(fastify, code) {
    const { pg } = fastify;
    const result = await pg.query("SELECT * FROM brand WHERE code = $1", [code]);
    return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------
async function findBrandByName(fastify, name) {
    const { pg } = fastify;
    const result = await pg.query("SELECT * FROM brand WHERE name = $1", [name]);
    return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------
async function createBrand(fastify, data) {
    const { pg } = fastify;
    const { name, code, countryOfOrigin, createdBy } = data;
    const result = await pg.query(`INSERT INTO brand (name, code,country_of_origin, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING *`, [name, countryOfOrigin, createdBy]);
    return mapDbToBrand(result.rows[0]);
}
//--------------------------------------------------------------------------------------------------------------------------
async function updateBrand(fastify, id, data) {
    const { pg } = fastify;
    const fields = [];
    const values = [];
    let idx = 1;
    const fieldMap = {
        code: "code",
        name: "name",
        countryOfOrigin: "country_of_origin",
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
    const query = `UPDATE brand SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------
async function deleteBrand(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("DELETE FROM brand WHERE id = $1 RETURNING brand_id", [id]);
    return result.rowCount ? result.rowCount > 0 : false;
}
