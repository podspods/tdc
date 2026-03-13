import { FastifyInstance } from "fastify";
import {
  MotorcycleModel,
  CreateMotorcycleModelDto,
  UpdateMotorcycleModelDto,
  ModelQueryParams,
} from "../types/motorcycleModel.types";

/**
 * Map database snake_case to application camelCase
 */
const mapDbToModel = (row: any): MotorcycleModel => ({
  modelId: row.model_id,
  brandId: row.brand_id,
  modelName: row.model_name,
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
});

const mapDbToModelWithBrand = (row: any): MotorcycleModel => ({
  ...mapDbToModel(row),
  brandName: row.brand_name,
  brandCountry: row.country_of_origin,
});

export const createModelRepository = (fastify: FastifyInstance) => {
  const { pg } = fastify;
  /**
   * ✅ CORRIGÉ: Accepte ModelQueryParams au lieu de juste page/limit
   */
  const findAll = async (
    params: ModelQueryParams = {},
  ): Promise<{ data: MotorcycleModel[]; total: number }> => {
    const { page = 1, limit = 20, brandId, isCurrent, search, year } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    const values: any[] = [];
    let paramCount = 1;

    if (brandId) {
      whereClause += ` WHERE brand_id = $${paramCount++}`;
      values.push(brandId);
    }

    if (isCurrent !== undefined) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` is_current = $${paramCount++}`;
      values.push(isCurrent);
    }

    if (year) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` $${paramCount} BETWEEN year_start AND COALESCE(year_end, 9999)`;
      values.push(year);
      paramCount++;
    }

    if (search) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` model_name ILIKE $${paramCount++}`;
      values.push(`%${search}%`);
    }

    const countQuery = `
      SELECT COUNT(*) 
      FROM motorcycle_models
      ${whereClause}
    `;

    const dataQuery = `
      SELECT m.*, b.brand_name, b.country_of_origin
      FROM motorcycle_models m
      JOIN motorcycle_brands b ON m.brand_id = b.brand_id
      ${whereClause}
      ORDER BY b.brand_name, m.year_start DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const [countResult, dataResult] = await Promise.all([
      pg.query(countQuery, values),
      pg.query(dataQuery, [...values, limit, offset]),
    ]);

    return {
      data: dataResult.rows.map(mapDbToModelWithBrand),
      total: parseInt(countResult.rows[0].count),
    };
  };

  /**
   * Find model by ID
   */
  const findById = async (id: number): Promise<MotorcycleModel | null> => {
    const result = await pg.query("SELECT * FROM motorcycle_models WHERE model_id = $1", [id]);
    return result.rows[0] ? mapDbToModel(result.rows[0]) : null;
  };

  /**
   * Find models by brand ID
   */
  const findByBrand = async (brandId: number): Promise<MotorcycleModel[]> => {
    const result = await pg.query(
      "SELECT * FROM motorcycle_models WHERE brand_id = $1 ORDER BY year_start DESC",
      [brandId],
    );
    return result.rows.map(mapDbToModel);
  };

  /**
   * Find model by name
   */
  const findByModelName = async (
    brandId: number,
    modelName: string,
  ): Promise<MotorcycleModel | null> => {
    const result = await pg.query(
      "SELECT * FROM motorcycle_models WHERE brand_id = $1 AND model_name = $2",
      [brandId, modelName],
    );
    return result.rows[0] ? mapDbToModel(result.rows[0]) : null;
  };

  /**
   * Create new model
   */
  const create = async (data: CreateMotorcycleModelDto): Promise<MotorcycleModel> => {
    const {
      brandId,
      modelName,
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
      `INSERT INTO motorcycle_models (
        brand_id, model_name, year_start, year_end, is_current,
        engine_displacement, engine_type, power_hp, torque_nm,
        weight_kg, fuel_capacity_liters, description, image_url, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        brandId,
        modelName,
        yearStart,
        yearEnd || null,
        isCurrent !== undefined ? isCurrent : true,
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
  };

  /**
   * Update model
   */
  const update = async (
    id: number,
    data: UpdateMotorcycleModelDto,
  ): Promise<MotorcycleModel | null> => {
    const fields: string[] = [];
    const values = [];
    let paramCount = 1;

    const fieldMappings: Record<string, string> = {
      brandId: "brand_id",
      modelName: "model_name",
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

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && fieldMappings[key]) {
        fields.push(`${fieldMappings[key]} = $${paramCount++}`);
        values.push(value);
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE motorcycle_models SET ${fields.join(", ")} WHERE model_id = $${paramCount} RETURNING *`;

    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToModel(result.rows[0]) : null;
  };

  /**
   * Delete model
   */
  const remove = async (id: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM motorcycle_models WHERE model_id = $1 RETURNING model_id",
      [id],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  /**
   * Get current models
   */
  const getCurrentModels = async (): Promise<MotorcycleModel[]> => {
    const result = await pg.query(
      `SELECT m.*, b.brand_name 
       FROM motorcycle_models m
       JOIN motorcycle_brands b ON m.brand_id = b.brand_id
       WHERE m.is_current = true
       ORDER BY b.brand_name, m.model_name`,
    );
    return result.rows.map(mapDbToModelWithBrand);
  };

  return {
    findAll,
    findById,
    findByBrand,
    findByModelName,
    create,
    update,
    delete: remove,
    getCurrentModels,
  };
};

export type ModelRepository = ReturnType<typeof createModelRepository>;
