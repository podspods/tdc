import { FastifyInstance } from "fastify";
import {
  Registration,
  CreateRegistrationDto,
  UpdateRegistrationDto,
  RegistrationQueryParams,
} from "../types/registration.types";

/**
 * Map database snake_case to application camelCase
 */
const mapDbToRegistration = (row: any): Registration => ({
  registrationId: row.registration_id,
  plateNumber: row.plate_number,
  ownerName: row.owner_name,
  ownerPhone: row.owner_phone,
  ownerEmail: row.owner_email,
  color: row.color,

  brandId: row.brand_id,
  modelId: row.model_id,

  createdBy: row.created_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,

  // Joined fields
  brandName: row.brand_name,
  modelName: row.model_name,
});

export const createRegistrationRepository = (fastify: FastifyInstance) => {
  const { pg } = fastify;

  /**
   * Find all registrations with pagination and filters
   */
  const findAll = async (
    params: RegistrationQueryParams = {},
  ): Promise<{ data: Registration[]; total: number }> => {
    const { page = 1, limit = 20, plateNumber, ownerName, brandId, modelId, search } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    const values: any[] = [];
    let paramCount = 1;

    if (plateNumber) {
      whereClause += ` WHERE r.plate_number ILIKE $${paramCount++}`;
      values.push(`%${plateNumber}%`);
    }

    if (ownerName) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` r.owner_name ILIKE $${paramCount++}`;
      values.push(`%${ownerName}%`);
    }

    if (brandId) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` r.brand_id = $${paramCount++}`;
      values.push(brandId);
    }

    if (modelId) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` r.model_id = $${paramCount++}`;
      values.push(modelId);
    }

    if (search) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` (r.plate_number ILIKE $${paramCount} OR r.owner_name ILIKE $${paramCount})`;
      values.push(`%${search}%`);
      paramCount++;
    }

    const countQuery = `
      SELECT COUNT(*) 
      FROM registrations r
      ${whereClause}
    `;

    const dataQuery = `
      SELECT r.*, b.brand_name, m.model_name
      FROM registrations r
      JOIN motorcycle_brands b ON r.brand_id = b.brand_id
      LEFT JOIN motorcycle_models m ON r.model_id = m.model_id
      ${whereClause}
      ORDER BY r.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const [countResult, dataResult] = await Promise.all([
      pg.query(countQuery, values),
      pg.query(dataQuery, [...values, limit, offset]),
    ]);

    return {
      data: dataResult.rows.map(mapDbToRegistration),
      total: parseInt(countResult.rows[0].count),
    };
  };

  /**
   * Find registration by ID
   */
  const findById = async (id: number): Promise<Registration | null> => {
    const result = await pg.query(
      `SELECT r.*, b.brand_name, m.model_name
       FROM registrations r
       JOIN motorcycle_brands b ON r.brand_id = b.brand_id
       LEFT JOIN motorcycle_models m ON r.model_id = m.model_id
       WHERE r.registration_id = $1`,
      [id],
    );
    return result.rows[0] ? mapDbToRegistration(result.rows[0]) : null;
  };

  /**
   * Find registration by plate number (unique key)
   */
  const findByPlateNumber = async (plateNumber: string): Promise<Registration | null> => {
    const result = await pg.query(
      `SELECT r.*, b.brand_name, m.model_name
       FROM registrations r
       JOIN motorcycle_brands b ON r.brand_id = b.brand_id
       LEFT JOIN motorcycle_models m ON r.model_id = m.model_id
       WHERE r.plate_number = $1`,
      [plateNumber],
    );
    return result.rows[0] ? mapDbToRegistration(result.rows[0]) : null;
  };

  /**
   * Create new registration
   */
  const create = async (data: CreateRegistrationDto): Promise<Registration> => {
    const { plateNumber, ownerName, ownerPhone, ownerEmail, color, brandId, modelId, createdBy } =
      data;

    const result = await pg.query(
      `INSERT INTO registrations (
        plate_number, owner_name, owner_phone, owner_email, color,
        brand_id, model_id, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [plateNumber, ownerName, ownerPhone, ownerEmail, color, brandId, modelId, createdBy],
    );

    return mapDbToRegistration(result.rows[0]);
  };

  /**
   * Update registration
   */
  const update = async (id: number, data: UpdateRegistrationDto): Promise<Registration | null> => {
    const fields: string[] = [];
    const values = [];
    let paramCount = 1;

    const fieldMappings: Record<string, string> = {
      plateNumber: "plate_number",
      ownerName: "owner_name",
      ownerPhone: "owner_phone",
      ownerEmail: "owner_email",
      color: "color",
      brandId: "brand_id",
      modelId: "model_id",
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && fieldMappings[key]) {
        fields.push(`${fieldMappings[key]} = $${paramCount++}`);
        values.push(value);
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE registrations SET ${fields.join(", ")} WHERE registration_id = $${paramCount} RETURNING *`;

    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToRegistration(result.rows[0]) : null;
  };

  /**
   * Delete registration
   */
  const remove = async (id: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM registrations WHERE registration_id = $1 RETURNING registration_id",
      [id],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  return {
    findAll,
    findById,
    findByPlateNumber,
    create,
    update,
    delete: remove,
  };
};

export type RegistrationRepository = ReturnType<typeof createRegistrationRepository>;
