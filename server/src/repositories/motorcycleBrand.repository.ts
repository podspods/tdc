import { FastifyInstance } from "fastify";
import { CreateBrandDTO, MotorcycleBrand, UpdateBrandDTO } from "../types/motorcycleBrand.types";

/**
 * Map database snake_case to application camelCase
 */
const mapDbToBrand = (row: any): MotorcycleBrand => ({
  brandId: row.brand_id,
  brandName: row.brand_name,
  countryOfOrigin: row.country_of_origin,
  createdBy: row.created_by,
  createdDate: row.create_date,
});

/**
 * Repository functions for motorcycle brands
 */
export const createBrandRepository = (fastify: FastifyInstance) => {
  const { pg } = fastify;

  /**
   * Find all brands with pagination
   */
  const findAll = async (
    page: number = 1,
    limit: number = 20,
  ): Promise<{ data: MotorcycleBrand[]; total: number }> => {
    const offset = (page - 1) * limit;

    const [dataResult, countResult] = await Promise.all([
      pg.query("SELECT * FROM motorcycle_brands ORDER BY brand_name LIMIT $1 OFFSET $2", [
        limit,
        offset,
      ]),
      pg.query("SELECT COUNT(*) FROM motorcycle_brands"),
    ]);

    return {
      data: dataResult.rows.map(mapDbToBrand),
      total: parseInt(countResult.rows[0].count),
    };
  };

  /**
   * Find brand by ID
   */
  const findById = async (id: number): Promise<MotorcycleBrand | null> => {
    const result = await pg.query("SELECT * FROM motorcycle_brands WHERE brand_id = $1", [id]);
    return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
  };

  /**
   * Find brand by name
   */
  const findByBrandName = async (brandName: string): Promise<MotorcycleBrand | null> => {
    const result = await pg.query("SELECT * FROM motorcycle_brands WHERE brand_name = $1", [
      brandName,
    ]);
    return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
  };

  /**
   * Find brands by country
   */
  const findByCountry = async (country: string): Promise<MotorcycleBrand[]> => {
    const result = await pg.query(
      "SELECT * FROM motorcycle_brands WHERE country_of_origin = $1 ORDER BY brand_name",
      [country],
    );
    return result.rows.map(mapDbToBrand);
  };

  /**
   * Search brands by name
   */
  const search = async (searchTerm: string): Promise<MotorcycleBrand[]> => {
    const result = await pg.query(
      "SELECT * FROM motorcycle_brands WHERE brand_name ILIKE $1 ORDER BY brand_name",
      [`%${searchTerm}%`],
    );
    return result.rows.map(mapDbToBrand);
  };

  /**
   * Create new brand
   */
  const create = async (data: CreateBrandDTO): Promise<MotorcycleBrand> => {
    const result = await pg.query(
      `INSERT INTO motorcycle_brands (brand_name, country_of_origin, created_by)
       VALUES ($1, $2, $3) RETURNING *`,
      [data.brandName, data.countryOfOrigin, data.createdBy],
    );
    return mapDbToBrand(result.rows[0]);
  };

  /**
   * Update existing brand
   */
  const update = async (id: number, data: UpdateBrandDTO): Promise<MotorcycleBrand | null> => {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (data.brandName) {
      fields.push(`brand_name = $${paramCount++}`);
      values.push(data.brandName);
    }
    if (data.countryOfOrigin) {
      fields.push(`country_of_origin = $${paramCount++}`);
      values.push(data.countryOfOrigin);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE motorcycle_brands SET ${fields.join(", ")} WHERE brand_id = $${paramCount} RETURNING *`;

    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToBrand(result.rows[0]) : null;
  };

  /**
   * Delete brand
   */
  const remove = async (id: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM motorcycle_brands WHERE brand_id = $1 RETURNING brand_id",
      [id],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  return {
    findAll,
    findById,
    findByBrandName,
    findByCountry,
    search,
    create,
    update,
    delete: remove,
  };
};

export type BrandRepository = ReturnType<typeof createBrandRepository>;
