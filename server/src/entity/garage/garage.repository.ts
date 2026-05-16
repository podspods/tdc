import { FastifyInstance } from "fastify";
import { Garage, CreateGarageDto, UpdateGarageDto, GarageQueryParams } from "./garage.types";

function mapDbToGarage(row: any): Garage {
  return {
    id: row.garage_id,
    name: row.name,
    address: row.address,
    zipcode: row.zipcode,
    city: row.city,
    phone: row.phone,
    email: row.email,
    logoUrl: row.logo_url,
    taxCode: row.tax_code,
    website: row.website,
    bankName: row.bank_name,
    bankAccount: row.bank_account,
    isActive: row.is_active,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findAllGarages(
  fastify: FastifyInstance,
  params: GarageQueryParams = {},
): Promise<{ data: Garage[]; total: number }> {
  const { pg } = fastify;
  const { page = 1, limit = 20, search, isActive } = params;
  const offset = (page - 1) * limit;

  let whereClause = "";
  const values: any[] = [];
  let idx = 1;

  if (isActive !== undefined) {
    whereClause += ` WHERE is_active = $${idx++}`;
    values.push(isActive);
  }
  if (search) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` (name ILIKE $${idx} OR city ILIKE $${idx} OR phone ILIKE $${idx})`;
    values.push(`%${search}%`);
    idx++;
  }

  const countQuery = `SELECT COUNT(*) FROM garage${whereClause}`;
  const dataQuery = `
    SELECT * FROM garage
    ${whereClause}
    ORDER BY name
    LIMIT $${idx} OFFSET $${idx + 1}
  `;

  const [countResult, dataResult] = await Promise.all([
    pg.query(countQuery, values),
    pg.query(dataQuery, [...values, limit, offset]),
  ]);

  return {
    data: dataResult.rows.map(mapDbToGarage),
    total: parseInt(countResult.rows[0].count),
  };
}

export async function findGarageById(fastify: FastifyInstance, id: number): Promise<Garage | null> {
  const { pg } = fastify;
  const result = await pg.query("SELECT * FROM garage WHERE garage_id = $1", [id]);
  return result.rows[0] ? mapDbToGarage(result.rows[0]) : null;
}

export async function createGarage(
  fastify: FastifyInstance,
  data: CreateGarageDto,
): Promise<Garage> {
  const { pg } = fastify;
  const {
    name,
    address,
    zipcode,
    city,
    phone,
    email,
    logoUrl,
    taxCode,
    website,
    bankName,
    bankAccount,
    createdBy,
  } = data;
  const result = await pg.query(
    `INSERT INTO garage (
      name, address, zipcode, city, phone, email, logo_url, tax_code,
      website, bank_name, bank_account, created_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *`,
    [
      name,
      address,
      zipcode,
      city,
      phone,
      email,
      logoUrl,
      taxCode,
      website,
      bankName,
      bankAccount,
      createdBy,
    ],
  );
  return mapDbToGarage(result.rows[0]);
}

export async function updateGarage(
  fastify: FastifyInstance,
  id: number,
  data: UpdateGarageDto,
): Promise<Garage | null> {
  const { pg } = fastify;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const fieldMap: Record<string, string> = {
    name: "name",
    address: "address",
    zipcode: "zipcode",
    city: "city",
    phone: "phone",
    email: "email",
    logoUrl: "logo_url",
    taxCode: "tax_code",
    website: "website",
    bankName: "bank_name",
    bankAccount: "bank_account",
    isActive: "is_active",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && fieldMap[key]) {
      fields.push(`${fieldMap[key]} = $${idx++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE garage SET ${fields.join(", ")} WHERE garage_id = $${idx} RETURNING *`;
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToGarage(result.rows[0]) : null;
}

export async function deleteGarage(fastify: FastifyInstance, id: number): Promise<boolean> {
  const { pg } = fastify;
  const result = await pg.query("DELETE FROM garage WHERE garage_id = $1 RETURNING garage_id", [
    id,
  ]);
  return result.rowCount ? result.rowCount > 0 : false;
}
