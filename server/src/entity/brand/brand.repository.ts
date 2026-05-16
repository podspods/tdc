import { FastifyInstance } from "fastify";
import { CreateBrandDto, UpdateBrandDto, BrandQueryParams, Brand } from "./brand.types";

function mapDbToBrand(row: any): Brand {
  return {
    id: row.id,
    name: row.name,
    countryOfOrigin: row.country_of_origin,
    createdBy: row.created_by,
    createDate: row.create_date,
  };
}

export async function findAllBrands(
  fastify: FastifyInstance,
  params: BrandQueryParams = {},
): Promise<{ data: Brand[]; total: number }> {
  const { pg } = fastify;
  const { page = 1, limit = 20, search } = params;
  const offset = (page - 1) * limit;

  let whereClause = "";
  const values: any[] = [];
  let idx = 1;

  if (search) {
    whereClause = ` WHERE brand_name ILIKE $${idx} OR country_of_origin ILIKE $${idx}`;
    values.push(`%${search}%`);
    idx++;
  }

  const countQuery = `SELECT COUNT(*) FROM motorcycle_brands${whereClause}`;
  const dataQuery = `
    SELECT * FROM motorcycle_brands
    ${whereClause}
    ORDER BY brand_name
    LIMIT $${idx} OFFSET $${idx + 1}
  `;

  const [countResult, dataResult] = await Promise.all([
    pg.query(countQuery, values),
    pg.query(dataQuery, [...values, limit, offset]),
  ]);

  return {
    data: dataResult.rows.map(mapDbToBrand),
    total: parseInt(countResult.rows[0].count),
  };
}

export async function findBrandById(fastify: FastifyInstance, id: number): Promise<Brand | null> {
  const { pg } = fastify;
  const result = await pg.query("SELECT * FROM motorcycle_brands WHERE brand_id = $1", [id]);
  return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
}

export async function findBrandByName(
  fastify: FastifyInstance,
  name: string,
): Promise<Brand | null> {
  const { pg } = fastify;
  const result = await pg.query("SELECT * FROM motorcycle_brands WHERE brand_name = $1", [name]);
  return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
}

export async function createBrand(fastify: FastifyInstance, data: CreateBrandDto): Promise<Brand> {
  const { pg } = fastify;
  const { name, countryOfOrigin, createdBy } = data;
  const result = await pg.query(
    `INSERT INTO motorcycle_brands (brand_name, country_of_origin, created_by)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, countryOfOrigin, createdBy],
  );
  return mapDbToBrand(result.rows[0]);
}

export async function updateBrand(
  fastify: FastifyInstance,
  id: number,
  data: UpdateBrandDto,
): Promise<Brand | null> {
  const { pg } = fastify;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const fieldMap: Record<string, string> = {
    name: "brand_name",
    countryOfOrigin: "country_of_origin",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && fieldMap[key]) {
      fields.push(`${fieldMap[key]} = $${idx++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE motorcycle_brands SET ${fields.join(", ")} WHERE brand_id = $${idx} RETURNING *`;
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
}

export async function deleteBrand(fastify: FastifyInstance, id: number): Promise<boolean> {
  const { pg } = fastify;
  const result = await pg.query(
    "DELETE FROM motorcycle_brands WHERE brand_id = $1 RETURNING brand_id",
    [id],
  );
  return result.rowCount ? result.rowCount > 0 : false;
}
