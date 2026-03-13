import { FastifyInstance } from "fastify";
import {
  Consumable,
  CreateConsumableDto,
  UpdateConsumableDto,
  ConsumableQueryParams,
  StockMovement,
} from "../types/consumable.types";

/**
 * Map database snake_case to application camelCase
 */
const mapDbToConsumable = (row: any): Consumable => ({
  consumableId: row.consumable_id,
  consumableCode: row.consumable_code,
  consumableName: row.consumable_name,
  description: row.description,
  category: row.category,
  unitOfMeasure: row.unit_of_measure,
  packageSize: row.package_size ? parseFloat(row.package_size) : undefined,
  packageUnit: row.package_unit,
  unitPrice: parseFloat(row.unit_price),
  purchasePrice: row.purchase_price ? parseFloat(row.purchase_price) : undefined,
  supplier: row.supplier,
  currentStock: parseFloat(row.current_stock),
  minimumStock: parseFloat(row.minimum_stock),
  maximumStock: row.maximum_stock ? parseFloat(row.maximum_stock) : undefined,
  reorderPoint: row.reorder_point ? parseFloat(row.reorder_point) : undefined,
  locationInWarehouse: row.location_in_warehouse,
  viscosity: row.viscosity,
  specification: row.specification,
  safetyDataSheetUrl: row.safety_data_sheet_url,
  hazardous: row.hazardous || false,
  flammable: row.flammable || false,
  isActive: row.is_active,
  createdBy: row.created_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const createConsumableRepository = (fastify: FastifyInstance) => {
  const { pg } = fastify;

  /**
   * Find all consumables with filters
   */
  const findAll = async (params: ConsumableQueryParams = {}) => {
    const { page = 1, limit = 20, category, lowStock, search, minPrice, maxPrice } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    const values: any[] = [];
    let paramCount = 1;

    if (category) {
      whereClause += ` WHERE category = $${paramCount++}`;
      values.push(category);
    }

    if (lowStock) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` current_stock <= minimum_stock`;
    }

    if (search) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` (consumable_name ILIKE $${paramCount} OR consumable_code ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      values.push(`%${search}%`);
      paramCount++;
    }

    if (minPrice !== undefined) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` unit_price >= $${paramCount++}`;
      values.push(minPrice);
    }

    if (maxPrice !== undefined) {
      whereClause += whereClause ? " AND" : " WHERE";
      whereClause += ` unit_price <= $${paramCount++}`;
      values.push(maxPrice);
    }

    const countQuery = `SELECT COUNT(*) FROM consumable_catalog ${whereClause}`;
    const dataQuery = `SELECT * FROM consumable_catalog ${whereClause} ORDER BY consumable_name LIMIT $${paramCount} OFFSET $${paramCount + 1}`;

    const [countResult, dataResult] = await Promise.all([
      pg.query(countQuery, values),
      pg.query(dataQuery, [...values, limit, offset]),
    ]);

    return {
      data: dataResult.rows.map(mapDbToConsumable),
      total: parseInt(countResult.rows[0].count),
    };
  };

  /**
   * Find low stock consumables
   */
  const findLowStock = async (): Promise<Consumable[]> => {
    const result = await pg.query(
      `SELECT * FROM consumable_catalog 
       WHERE current_stock <= minimum_stock 
       AND is_active = true 
       ORDER BY (current_stock - minimum_stock)`,
    );
    return result.rows.map(mapDbToConsumable);
  };

  /**
   * Find by ID
   */
  const findById = async (id: number): Promise<Consumable | null> => {
    const result = await pg.query("SELECT * FROM consumable_catalog WHERE consumable_id = $1", [
      id,
    ]);
    return result.rows[0] ? mapDbToConsumable(result.rows[0]) : null;
  };

  /**
   * Find by code
   */
  const findByCode = async (code: string): Promise<Consumable | null> => {
    const result = await pg.query("SELECT * FROM consumable_catalog WHERE consumable_code = $1", [
      code,
    ]);
    return result.rows[0] ? mapDbToConsumable(result.rows[0]) : null;
  };

  /**
   * Create new consumable
   */
  const create = async (data: CreateConsumableDto): Promise<Consumable> => {
    const {
      consumableCode,
      consumableName,
      description,
      category,
      unitOfMeasure,
      packageSize,
      packageUnit,
      unitPrice,
      purchasePrice,
      supplier,
      currentStock,
      minimumStock,
      maximumStock,
      reorderPoint,
      locationInWarehouse,
      viscosity,
      specification,
      safetyDataSheetUrl,
      hazardous,
      flammable,
      createdBy,
    } = data;

    const result = await pg.query(
      `INSERT INTO consumable_catalog (
        consumable_code, consumable_name, description, category, 
        unit_of_measure, package_size, package_unit, unit_price, purchase_price,
        supplier, current_stock, minimum_stock, maximum_stock, reorder_point,
        location_in_warehouse, viscosity, specification, safety_data_sheet_url,
        hazardous, flammable, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *`,
      [
        consumableCode,
        consumableName,
        description,
        category,
        unitOfMeasure,
        packageSize,
        packageUnit,
        unitPrice,
        purchasePrice,
        supplier,
        currentStock || 0,
        minimumStock || 0,
        maximumStock,
        reorderPoint,
        locationInWarehouse,
        viscosity,
        specification,
        safetyDataSheetUrl,
        hazardous || false,
        flammable || false,
        createdBy,
      ],
    );

    return mapDbToConsumable(result.rows[0]);
  };

  /**
   * Update consumable
   */
  const update = async (id: number, data: UpdateConsumableDto): Promise<Consumable | null> => {
    const fields: string[] = [];
    const values = [];
    let paramCount = 1;

    const fieldMappings: Record<string, string> = {
      consumableName: "consumable_name",
      description: "description",
      category: "category",
      unitOfMeasure: "unit_of_measure",
      packageSize: "package_size",
      packageUnit: "package_unit",
      unitPrice: "unit_price",
      purchasePrice: "purchase_price",
      supplier: "supplier",
      minimumStock: "minimum_stock",
      maximumStock: "maximum_stock",
      reorderPoint: "reorder_point",
      locationInWarehouse: "location_in_warehouse",
      viscosity: "viscosity",
      specification: "specification",
      safetyDataSheetUrl: "safety_data_sheet_url",
      hazardous: "hazardous",
      flammable: "flammable",
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
    const query = `UPDATE consumable_catalog SET ${fields.join(", ")} WHERE consumable_id = $${paramCount} RETURNING *`;

    const result = await pg.query(query, values);
    return result.rows[0] ? mapDbToConsumable(result.rows[0]) : null;
  };

  /**
   * Update stock
   */
  const updateStock = async (id: number, movement: StockMovement): Promise<Consumable> => {
    const { quantity, type, reason, createdBy } = movement;

    // Start transaction
    await pg.query("BEGIN");

    try {
      let newStock: number;

      if (type === "in") {
        // Add stock
        const result = await pg.query(
          `UPDATE consumable_catalog 
           SET current_stock = current_stock + $1 
           WHERE consumable_id = $2 
           RETURNING *`,
          [quantity, id],
        );
        newStock = result.rows[0].current_stock;
      } else if (type === "out") {
        // Remove stock
        const result = await pg.query(
          `UPDATE consumable_catalog 
           SET current_stock = current_stock - $1 
           WHERE consumable_id = $2 
           RETURNING *`,
          [quantity, id],
        );
        newStock = result.rows[0].current_stock;
      } else {
        // Adjustment - set absolute value
        const result = await pg.query(
          `UPDATE consumable_catalog 
           SET current_stock = $1 
           WHERE consumable_id = $2 
           RETURNING *`,
          [quantity, id],
        );
        newStock = quantity;
      }

      // Log stock movement (optional - could have a separate table)
      await pg.query(
        `INSERT INTO stock_movements (
          consumable_id, quantity, type, reason, new_stock, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, quantity, type, reason, newStock, createdBy],
      );

      await pg.query("COMMIT");

      const updated = await findById(id);
      return updated!;
    } catch (error) {
      await pg.query("ROLLBACK");
      throw error;
    }
  };

  /**
   * Delete consumable
   */
  const remove = async (id: number): Promise<boolean> => {
    const result = await pg.query(
      "DELETE FROM consumable_catalog WHERE consumable_id = $1 RETURNING consumable_id",
      [id],
    );
    return result.rowCount ? result.rowCount > 0 : false;
  };

  return {
    findAll,
    findLowStock,
    findById,
    findByCode,
    create,
    update,
    updateStock,
    delete: remove,
  };
};

export type ConsumableRepository = ReturnType<typeof createConsumableRepository>;
