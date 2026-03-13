import { FastifyInstance } from "fastify";
import { Labor, CreateLaborDto, UpdateLaborDto, LaborQueryParams } from "../types/labor.types";

const mapDbToLabor = (row: any): Labor => ({
  laborId: row.labor_id,
  laborCode: row.labor_code,
  laborName: row.labor_name,
  description: row.description,
  category: row.category,
  defaultRatePerHour: parseFloat(row.default_rate_per_hour),
  estimatedHours: row.estimated_hours ? parseFloat(row.estimated_hours) : undefined,
  minCharge: row.min_charge ? parseFloat(row.min_charge) : undefined,
  requiredSkillLevel: row.required_skill_level,
  requiredCertification: row.required_certification,
  isActive: row.is_active,
  createdBy: row.created_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const createLaborRepository = (fastify: FastifyInstance) => {
  const { pg } = fastify;

  const findAll = async (params: LaborQueryParams = {}) => {
    const { page = 1, limit = 20, category, isActive, search, minRate, maxRate } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    const values: any[] = [];
    let paramCount = 1;

    if (category) {
      whereClause += ` WHERE category = $${paramCount++}`;
      values.push(category);
    }

    if (isActive !== undefined) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` is_active = $${paramCount++}`;
      values.push(isActive);
    }

    if (search) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` (labor_name ILIKE $${paramCount} OR labor_code ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      values.push(`%${search}%`);
      paramCount++;
    }

    if (minRate !== undefined) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` default_rate_per_hour >= $${paramCount++}`;
      values.push(minRate);
    }

    if (maxRate !== undefined) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` default_rate_per_hour <= $${paramCount++}`;
      values.push(maxRate);
    }

    const countQuery = `SELECT COUNT(*) FROM labor_catalog ${whereClause}`;
    const dataQuery = `SELECT * FROM labor_catalog ${whereClause} ORDER BY labor_name LIMIT $${paramCount} OFFSET $${paramCount + 1}`;

    const [countResult, dataResult] = await Promise.all([
      pg.query(countQuery, values),
      pg.query(dataQuery, [...values, limit, offset]),
    ]);

    return {
      data: dataResult.rows.map(mapDbToLabor),
      total: parseInt(countResult.rows[0].count),
    };
  };

  const findById = async (id: number): Promise<Labor | null> => {
    const result = await pg.query("SELECT * FROM labor_catalog WHERE labor_id = $1", [id]);
    return result.rows[0] ? mapDbToLabor(result.rows[0]) : null;
  };

  const findByCode = async (code: string): Promise<Labor | null> => {
    const result = await pg.query("SELECT * FROM labor_catalog WHERE labor_code = $1", [code]);
    return result.rows[0] ? mapDbToLabor(result.rows[0]) : null;
  };

  const create = async (data: CreateLaborDto): Promise<Labor> => {
    const {
      laborCode,
      laborName,
      description,
      category,
      defaultRatePerHour,
      estimatedHours,
      minCharge,
      requiredSkillLevel,
      requiredCertification,
      createdBy,
    } = data;

    const result = await pg.query(
      `INSERT INTO labor_catalog (
        labor_code, labor_name, description, category, default_rate_per_hour,
        estimated_hours, min_charge, required_skill_level, required_certification, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        laborCode,
        laborName,
        description,
        category,
        defaultRatePerHour,
        estimatedHours,
        minCharge,
        requiredSkillLevel,
        requiredCertification,
        createdBy,
      ],
    );

    return mapDbToLabor(result.rows[0]);
  };

  const update = async (id: number, data: UpdateLaborDto): Promise<Labor | null> => {
    const fields: string[] = [];
    const values = [];
    let paramCount = 1;

    const fieldMappings: Record<string, string> = {
      laborName: "labor_name",
      description: "description",
      category: "category",
      defaultRatePerHour: "default_rate_per_hour",
      estimatedHours: "estimated_hours",
      minCharge: "min_charge",
      requiredSkillLevel: "required_skill_level",
      requiredCertification: "required_certification",
      isActive: "is_active",
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && fieldMappings[key]) {
        fields.push(`${fieldMappings[key]} = $${paramCount++}`);
        values.push(value);
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE labor_catalog SET ${fields.join(", ")} WHERE labor_id = $${paramCount} RETURNING *`;

    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToLabor(result.rows[0]) : null;
  };

  const remove = async (id: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM labor_catalog WHERE labor_id = $1 RETURNING labor_id",
      [id],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  return {
    findAll,
    findById,
    findByCode,
    create,
    update,
    delete: remove,
  };
};

export type LaborRepository = ReturnType<typeof createLaborRepository>;
