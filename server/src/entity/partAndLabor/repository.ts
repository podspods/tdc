// backend/src/entities/partAndLabor/repository.ts
import { FastifyInstance } from "fastify";
import type { PartAndLabor, CreatePartAndLaborDto, UpdatePartAndLaborDto } from "./types";

export async function findAll(
  fastify: FastifyInstance,
  whereClause: string,
  values: any[],
  limit: number | undefined,
  offset: number,
): Promise<PartAndLabor[]> {
  let query = `SELECT * FROM part_and_labor ${whereClause} ORDER BY id`;
  if (limit !== undefined && limit > 0) {
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);
  }
  const result = await fastify.pg.query(query, values);
  return result.rows.map(mapRowToPartAndLabor);
}

export async function findById(fastify: FastifyInstance, id: number): Promise<PartAndLabor | null> {
  const result = await fastify.pg.query("SELECT * FROM part_and_labor WHERE id = $1", [id]);
  return result.rows.length ? mapRowToPartAndLabor(result.rows[0]) : null;
}

export async function findByCode(
  fastify: FastifyInstance,
  code: string,
): Promise<PartAndLabor | null> {
  const result = await fastify.pg.query("SELECT * FROM part_and_labor WHERE code = $1", [code]);
  return result.rows.length ? mapRowToPartAndLabor(result.rows[0]) : null;
}

export async function create(
  fastify: FastifyInstance,
  data: CreatePartAndLaborDto,
): Promise<PartAndLabor> {
  const result = await fastify.pg.query(
    `INSERT INTO part_and_labor (
      type_line_code, category_code, sub_category_code, brand_code,
      duration, skill_level, cost, margin, code, name, description, created_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    [
      data.typeLineCode,
      data.categoryCode,
      data.subCategoryCode,
      data.brandCode,
      data.duration,
      data.skillLevel,
      data.cost,
      data.margin,
      data.code,
      data.name,
      data.description,
      data.createdBy,
    ],
  );
  const newRecord = result.rows[0];
  const formattedId = String(newRecord.id).padStart(4, "0");
  const code = `${data.typeLineCode}${data.categoryCode}${data.subCategoryCode}${data.brandCode}${formattedId}`;
  const updateResult = await fastify.pg.query(
    `UPDATE part_and_labor SET code = $1 WHERE id = $2 RETURNING *`,
    [code, newRecord.id],
  );

  return mapRowToPartAndLabor(updateResult.rows[0]);
}

export async function update(
  fastify: FastifyInstance,
  id: number,
  data: UpdatePartAndLaborDto,
): Promise<PartAndLabor | null> {
  const updates: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.typeLineCode !== undefined) {
    updates.push(`type_line_code = $${idx++}`);
    values.push(data.typeLineCode);
  }
  if (data.categoryCode !== undefined) {
    updates.push(`category_code = $${idx++}`);
    values.push(data.categoryCode);
  }
  if (data.subCategoryCode !== undefined) {
    updates.push(`sub_category_code = $${idx++}`);
    values.push(data.subCategoryCode);
  }
  if (data.brandCode !== undefined) {
    updates.push(`brand_code = $${idx++}`);
    values.push(data.brandCode);
  }
  if (data.duration !== undefined) {
    updates.push(`duration = $${idx++}`);
    values.push(data.duration);
  }
  if (data.skillLevel !== undefined) {
    updates.push(`skill_level = $${idx++}`);
    values.push(data.skillLevel);
  }
  if (data.cost !== undefined) {
    updates.push(`cost = $${idx++}`);
    values.push(data.cost);
  }
  if (data.margin !== undefined) {
    updates.push(`margin = $${idx++}`);
    values.push(data.margin);
  }
  if (data.code !== undefined) {
    updates.push(`code = $${idx++}`);
    values.push(data.code);
  }
  if (data.name !== undefined) {
    updates.push(`name = $${idx++}`);
    values.push(data.name);
  }
  if (data.description !== undefined) {
    updates.push(`description = $${idx++}`);
    values.push(data.description);
  }
  if (data.lastTimeUsed !== undefined) {
    updates.push(`last_time_used = $${idx++}`);
    values.push(data.lastTimeUsed);
  }

  if (updates.length === 0) return null;

  values.push(id);
  const query = `UPDATE part_and_labor SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`;
  const result = await fastify.pg.query(query, values);
  return result.rows.length ? mapRowToPartAndLabor(result.rows[0]) : null;
}

export async function remove(fastify: FastifyInstance, id: number): Promise<boolean> {
  const result = await fastify.pg.query("DELETE FROM part_and_labor WHERE id = $1 RETURNING id", [
    id,
  ]);
  return result.rows.length > 0;
}

export async function count(
  fastify: FastifyInstance,
  whereClause: string,
  values: any[],
): Promise<number> {
  const result = await fastify.pg.query(
    `SELECT COUNT(*) FROM part_and_labor ${whereClause}`,
    values,
  );
  return parseInt(result.rows[0].count, 10);
}

function mapRowToPartAndLabor(row: any): PartAndLabor {
  return {
    id: row.id,
    typeLineCode: row.type_line_code,
    categoryCode: row.category_code,
    subCategoryCode: row.sub_category_code,
    brandCode: row.brand_code,
    duration: row.duration,
    skillLevel: row.skill_level,
    cost: row.cost,
    margin: row.margin,
    code: row.code,
    name: row.name,
    description: row.description,
    lastTimeUsed: row.last_time_used,
    createdAt: row.created_at,
    createdBy: row.created_by,
  };
}
