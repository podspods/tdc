"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllTasks = findAllTasks;
exports.findTaskById = findTaskById;
exports.findTaskByCode = findTaskByCode;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
function mapDbToTask(row) {
    return {
        id: row.id,
        code: row.code,
        name: row.name,
        description: row.description,
        durationHours: row.duration,
        skillLevel: row.skill_level,
        brandId: row.brand_id,
        isActive: row.is_active,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
async function findAllTasks(fastify, params = {}) {
    const { pg } = fastify;
    const { page = 1, limit = 20, brandId, skillLevel, isActive, search } = params;
    const offset = (page - 1) * limit;
    let whereClause = "";
    const values = [];
    let idx = 1;
    if (brandId !== undefined) {
        whereClause += ` WHERE brand_id = $${idx++}`;
        values.push(brandId);
    }
    if (skillLevel !== undefined) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` skill_level = $${idx++}`;
        values.push(skillLevel);
    }
    if (isActive !== undefined) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` is_active = $${idx++}`;
        values.push(isActive);
    }
    if (search) {
        whereClause += whereClause ? " AND" : " WHERE";
        whereClause += ` (name ILIKE $${idx} OR code ILIKE $${idx})`;
        values.push(`%${search}%`);
        idx++;
    }
    const countQuery = `SELECT COUNT(*) FROM task${whereClause}`;
    const dataQuery = `
    SELECT * FROM task
    ${whereClause}
    ORDER BY name
    LIMIT $${idx} OFFSET $${idx + 1}
  `;
    const [countResult, dataResult] = await Promise.all([
        pg.query(countQuery, values),
        pg.query(dataQuery, [...values, limit, offset]),
    ]);
    return {
        data: dataResult.rows.map(mapDbToTask),
        total: parseInt(countResult.rows[0].count),
    };
}
async function findTaskById(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("SELECT * FROM task WHERE id = $1", [id]);
    return result.rows[0] ? mapDbToTask(result.rows[0]) : null;
}
async function findTaskByCode(fastify, code) {
    const { pg } = fastify;
    const result = await pg.query("SELECT * FROM task WHERE code = $1", [code]);
    return result.rows[0] ? mapDbToTask(result.rows[0]) : null;
}
async function createTask(fastify, data) {
    const { pg } = fastify;
    const { code, name, description, durationHours = 4, skillLevel = 0, brandId = 0, createdBy, } = data;
    const result = await pg.query(`INSERT INTO task (code, name, description, duration, skill_level, brand_id, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`, [code, name, description, durationHours, skillLevel, brandId, createdBy]);
    return mapDbToTask(result.rows[0]);
}
async function updateTask(fastify, id, data) {
    const { pg } = fastify;
    const fields = [];
    const values = [];
    let idx = 1;
    const fieldMap = {
        code: "code",
        name: "name",
        description: "description",
        durationHours: "duration",
        skillLevel: "skill_level",
        brandId: "brand_id",
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
    const query = `UPDATE task SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToTask(result.rows[0]) : null;
}
async function deleteTask(fastify, id) {
    const { pg } = fastify;
    const result = await pg.query("DELETE FROM task WHERE id = $1 RETURNING task_id", [id]);
    return result.rowCount ? result.rowCount > 0 : false;
}
