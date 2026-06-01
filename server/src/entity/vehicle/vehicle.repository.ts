import { FastifyInstance } from "fastify";
import {
  Vehicle,
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleQueryParams,
  VehicleInfo,
} from "./vehicle.types";

function mapDbToVehicleInfo(row: any): VehicleInfo {
  return {
    id: row.id,
    ownerId: row.owner_id,
    modelId: row.model_id,
    brandId: row.brandId,
    brandCode: row.brandCode,
    brandName: row.brandName,
    modelName: row.modelName,
    plateNumber: row.plate_number,
    vehicleId: row.vehicle_id,
    countryOfOrigin: row.countryOfOrigin,
    userFirstName: row.userFirstName,
    userLastName: row.userLastName,
    color: row.color,
    vintage: row.vintage,
    mileage: row.mileage,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
//--------------------------------------------------------------------------------------------------------------------------

function mapDbToVehicle(row: any): Vehicle {
  return {
    id: row.id,
    ownerId: row.owner_id,
    modelId: row.model_id,
    plateNumber: row.plate_number,
    color: row.color,
    vintage: row.vintage,
    mileage: row.mileage,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
//--------------------------------------------------------------------------------------------------------------------------

export async function findAllVehicles(
  fastify: FastifyInstance,
  params: VehicleQueryParams = {},
): Promise<{ data: Vehicle[]; total: number }> {
  const { pg } = fastify;
  const { page = 1, limit = 20, ownerId, modelId, search } = params;
  const offset = (page - 1) * limit;

  let whereClause = "";
  const values: any[] = [];
  let idx = 1;

  if (ownerId) {
    whereClause += ` WHERE v.owner_id = $${idx++}`;
    values.push(ownerId);
  }
  if (modelId) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` v.model_id = $${idx++}`;
    values.push(modelId);
  }
  if (search) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` (v.plate_number ILIKE $${idx} OR o.first_name ILIKE $${idx} OR o.last_name ILIKE $${idx} OR m.name ILIKE $${idx})`;
    values.push(`%${search}%`);
    idx++;
  }

  const countQuery = `
    SELECT COUNT(*)
    FROM vehicle v
    LEFT JOIN owners o ON v.owner_id = o.id
    LEFT JOIN model m ON v.model_id = m.id
    ${whereClause}
  `;

  const dataQuery = `
    SELECT v.*, 
           o.first_name || ' ' || o.last_name AS owner_name,
           m.name,
           b.name
    FROM vehicle v
    LEFT JOIN owners o ON v.owner_id = o.id
    LEFT JOIN model m ON v.model_id = m.id
    LEFT JOIN brand b ON m.brand_id = b.id
    ${whereClause}
    ORDER BY v.created_at DESC
    LIMIT $${idx} OFFSET $${idx + 1}
  `;

  const [countResult, dataResult] = await Promise.all([
    pg.query(countQuery, values),
    pg.query(dataQuery, [...values, limit, offset]),
  ]);

  return {
    data: dataResult.rows.map(mapDbToVehicle),
    total: parseInt(countResult.rows[0].count),
  };
}
//--------------------------------------------------------------------------------------------------------------------------

export async function findAllVehicleInfo(
  fastify: FastifyInstance,
  params: VehicleQueryParams = {},
): Promise<{ data: Vehicle[]; total: number }> {
  const { pg } = fastify;
  const { page = 1, limit = 20, ownerId, modelId, search } = params;
  const offset = (page - 1) * limit;

  let whereClause = "";
  const values: any[] = [];
  let idx = 1;

  if (ownerId) {
    whereClause += ` WHERE v.owner_id = $${idx++}`;
    values.push(ownerId);
  }
  if (modelId) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` v.model_id = $${idx++}`;
    values.push(modelId);
  }
  if (search) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` (v.plate_number ILIKE $${idx} OR o.first_name ILIKE $${idx} OR o.last_name ILIKE $${idx} OR m.name ILIKE $${idx})`;
    values.push(`%${search}%`);
    idx++;
  }

  const countQuery = `
    SELECT COUNT(*)
    FROM vehicle v
    LEFT JOIN owners o ON v.owner_id = o.id
    LEFT JOIN model m ON v.model_id = m.id
    ${whereClause}
  `;

  const dataQuery = `
    SELECT v.*, 
            m.name as "modelName",
            b.name as "brandName",
            b.code as "brandCode",
            b.id as "brandId",
            o.first_name as "firstName",
            o.last_name as "lastName",
            b.code as "brandCode",
            b.country_of_origin as "countryOfOrigin"
    FROM vehicle v
    LEFT JOIN owners o ON v.owner_id = o.id
    LEFT JOIN model m ON v.model_id = m.id
    LEFT JOIN brand b ON m.brand_id = b.id
    ${whereClause}
    ORDER BY v.created_at DESC
    LIMIT $${idx} OFFSET $${idx + 1}
  `;

  const [countResult, dataResult] = await Promise.all([
    pg.query(countQuery, values),
    pg.query(dataQuery, [...values, limit, offset]),
  ]);

  return {
    data: dataResult.rows.map(mapDbToVehicleInfo),
    total: parseInt(countResult.rows[0].count),
  };
}
//--------------------------------------------------------------------------------------------------------------------------

export async function findVehicleInfoById(
  fastify: FastifyInstance,
  id: number,
): Promise<VehicleInfo | null> {
  const { pg } = fastify;
  const result = await pg.query(
    `SELECT v.*, 
            m.name as "modelName",
            b.name as "brandName",
            b.code as "brandCode",
            b.id as "brandId",
            o.first_name as "firstName",
            o.last_name as "lastName",
            b.code as "brandCode",
            b.country_of_origin as "countryOfOrigin"
     FROM vehicle v
     LEFT JOIN owners o ON v.owner_id = o.id
     LEFT JOIN model m ON v.model_id = m.id
     LEFT JOIN brand b ON m.brand_id = b.id
     WHERE v.id = $1`,
    [id],
  );
  console.log("result.rows[0]", result.rows[0]);

  return result.rows[0] ? mapDbToVehicleInfo(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------

export async function findVehicleById(
  fastify: FastifyInstance,
  id: number,
): Promise<Vehicle | null> {
  const { pg } = fastify;
  const result = await pg.query(
    `SELECT v.*, 
            o.first_name || ' ' || o.last_name AS owner_name,
            m.name,
            b.name
     FROM vehicle v
     LEFT JOIN owners o ON v.owner_id = o.id
     LEFT JOIN model m ON v.model_id = m.id
     LEFT JOIN brand b ON m.brand_id = b.id
     WHERE v.id = $1`,
    [id],
  );
  return result.rows[0] ? mapDbToVehicle(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------

export async function findVehicleByPlate(
  fastify: FastifyInstance,
  plate: string,
): Promise<Vehicle | null> {
  const { pg } = fastify;
  const result = await pg.query(`SELECT * FROM vehicle WHERE plate_number = $1`, [plate]);
  return result.rows[0] ? mapDbToVehicle(result.rows[0]) : null;
}
//--------------------------------------------------------------------------------------------------------------------------

export async function createVehicle(
  fastify: FastifyInstance,
  data: CreateVehicleDto,
): Promise<Vehicle> {
  const { pg } = fastify;
  const { ownerId, modelId, plateNumber, color, vintage, mileage, createdBy } = data;
  const result = await pg.query(
    `INSERT INTO vehicle (owner_id, model_id, plate_number, color, vintage, mileage, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [ownerId, modelId, plateNumber, color, vintage || null, mileage || 0, createdBy],
  );
  return mapDbToVehicle(result.rows[0]);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function updateVehicle(
  fastify: FastifyInstance,
  id: number,
  data: UpdateVehicleDto,
): Promise<Vehicle | null> {
  const { pg } = fastify;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const fieldMap: Record<string, string> = {
    ownerId: "owner_id",
    modelId: "model_id",
    plateNumber: "plate_number",
    color: "color",
    vintage: "vintage",
    mileage: "mileage",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && fieldMap[key]) {
      fields.push(`${fieldMap[key]} = $${idx++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE vehicle SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToVehicle(result.rows[0]) : null;
}

export async function deleteVehicle(fastify: FastifyInstance, id: number): Promise<boolean> {
  const { pg } = fastify;
  const result = await pg.query("DELETE FROM vehicle WHERE vehicle_id = $1 RETURNING vehicle_id", [
    id,
  ]);
  return result.rowCount ? result.rowCount > 0 : false;
}
