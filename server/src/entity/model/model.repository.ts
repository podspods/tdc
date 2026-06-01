import { FastifyInstance } from "fastify";
import { Model, CreateModelDto, UpdateModelDto, ModelQueryParams } from "./model.types";

function mapDbToModel(row: any): Model {
  return {
    id: row.id,
    brandId: row.brand_id,
    name: row.name,
    yearStart: row.year_start,
    yearEnd: row.year_end,
    isCurrent: row.is_current,
    engineDisplacement: row.engine_displacement,
    engineType: row.engine_type,
    powerHp: row.power_hp,
    torqueNm: row.torque_nm,
    weightKg: row.weight_kg,
    fuelCapacityLiters: row.fuel_capacity_liters ? parseFloat(row.fuel_capacity_liters) : undefined,
    description: row.description,
    imageUrl: row.image_url,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findAllModels(
  fastify: FastifyInstance,
  params: ModelQueryParams = {},
): Promise<{ data: Model[]; total: number }> {
  const { pg } = fastify;
  const { page = 1, limit = 20, brandId, isCurrent, search, minYear, maxYear } = params;

  let whereClause = "";
  const values: any[] = [];
  let idx = 1;

  if (brandId) {
    whereClause += ` WHERE m.brand_id = $${idx++}`;
    values.push(brandId);
  }
  if (isCurrent !== undefined) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` m.is_current = $${idx++}`;
    values.push(isCurrent);
  }
  if (search) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` m.name ILIKE $${idx}`;
    values.push(`%${search}%`);
    idx++;
  }
  if (minYear) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` m.year_start >= $${idx++}`;
    values.push(minYear);
  }
  if (maxYear) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` m.year_start <= $${idx++}`;
    values.push(maxYear);
  }

  const countQuery = `
    SELECT COUNT(*)
    FROM model m
    ${whereClause}
  `;
  const countResult = await pg.query(countQuery, values);
  const total = parseInt(countResult.rows[0].count);

  const dataQueryCommon = `
    SELECT m.*
    FROM model m
    LEFT JOIN brand b ON m.brand_id = b.id
    ${whereClause}
    ORDER BY b.name, m.name`;

  const hasPagination = limit > 0;
  const offset = hasPagination ? (page - 1) * limit : 0;

  const offsetAndLimit = `LIMIT $${values.length + 1} OFFSET $${values.length + 1 + 1}`;

  const dataQuery = hasPagination ? `${dataQueryCommon} ${offsetAndLimit}` : dataQueryCommon;
  const queryParams = hasPagination ? [...values, limit, offset] : values;
  const dataResult = await pg.query(dataQuery, queryParams);
  return {
    data: dataResult.rows.map(mapDbToModel),
    total: parseInt(countResult.rows[0].count),
  };

  //--------------------------------------------------------------------------------------------------------------------------
}

export async function findModelById(fastify: FastifyInstance, id: number): Promise<Model | null> {
  const { pg } = fastify;
  const result = await pg.query(
    `SELECT m.*, b.name
     FROM model m
     LEFT JOIN brand b ON m.brand_id = b.id
     WHERE m.id = $1`,
    [id],
  );
  return result.rows[0] ? mapDbToModel(result.rows[0]) : null;
}

export async function findModelsByBrand(
  fastify: FastifyInstance,
  brandId: number,
): Promise<Model[]> {
  const { pg } = fastify;
  const result = await pg.query(
    `SELECT m.*, b.name
     FROM model m
     LEFT JOIN brand b ON m.brand_id = b.id
     WHERE m.brand_id = $1
     ORDER BY m.year_start DESC`,
    [brandId],
  );
  return result.rows.map(mapDbToModel);
}

export async function createModel(fastify: FastifyInstance, data: CreateModelDto): Promise<Model> {
  const { pg } = fastify;
  const {
    brandId,
    name,
    yearStart,
    yearEnd,
    isCurrent,
    engineDisplacement,
    engineType,
    powerHp,
    torqueNm,
    weightKg,
    fuelCapacityLiters,
    description,
    imageUrl,
    createdBy,
  } = data;
  const result = await pg.query(
    `INSERT INTO model (
      brand_id, name, year_start, year_end, is_current,
      engine_displacement, engine_type, power_hp, torque_nm,
      weight_kg, fuel_capacity_liters, description, image_url, created_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *`,
    [
      brandId,
      name,
      yearStart,
      yearEnd || null,
      isCurrent ?? false,
      engineDisplacement,
      engineType,
      powerHp,
      torqueNm,
      weightKg,
      fuelCapacityLiters,
      description,
      imageUrl,
      createdBy,
    ],
  );
  return mapDbToModel(result.rows[0]);
}

export async function updateModel(
  fastify: FastifyInstance,
  id: number,
  data: UpdateModelDto,
): Promise<Model | null> {
  const { pg } = fastify;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const fieldMap: Record<string, string> = {
    name: "name",
    yearStart: "year_start",
    yearEnd: "year_end",
    isCurrent: "is_current",
    engineDisplacement: "engine_displacement",
    engineType: "engine_type",
    powerHp: "power_hp",
    torqueNm: "torque_nm",
    weightKg: "weight_kg",
    fuelCapacityLiters: "fuel_capacity_liters",
    description: "description",
    imageUrl: "image_url",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && fieldMap[key]) {
      fields.push(`${fieldMap[key]} = $${idx++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE model SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToModel(result.rows[0]) : null;
}

export async function deleteModel(fastify: FastifyInstance, id: number): Promise<boolean> {
  const { pg } = fastify;
  const result = await pg.query("DELETE FROM model WHERE id = $1 RETURNING id", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}
