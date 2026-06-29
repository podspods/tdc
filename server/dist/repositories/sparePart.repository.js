"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSparePartRepository = void 0;
/**
 * Map database snake_case to application camelCase
 */
const mapDbToSparePart = (row) => ({
    partId: row.part_id,
    partCode: row.part_code,
    partName: row.part_name,
    description: row.description,
    category: row.category,
    subcategory: row.subcategory,
    partType: row.part_type,
    compatibleBrands: row.compatible_brands,
    compatibleModels: row.compatible_models,
    yearFrom: row.year_from,
    yearTo: row.year_to,
    engineTypes: row.engine_types,
    oemPartNumber: row.oem_part_number,
    manufacturerPartNumber: row.manufacturer_part_number,
    alternativePartNumbers: row.alternative_part_numbers,
    material: row.material,
    weightGrams: row.weight_grams,
    dimensions: row.dimensions,
    color: row.color,
    unitPrice: parseFloat(row.unit_price),
    purchasePrice: row.purchase_price ? parseFloat(row.purchase_price) : undefined,
    wholesalePrice: row.wholesale_price ? parseFloat(row.wholesale_price) : undefined,
    taxRate: parseFloat(row.tax_rate),
    primarySupplierId: row.primary_supplier_id,
    secondarySupplierIds: row.secondary_supplier_ids,
    manufacturer: row.manufacturer,
    countryOfOrigin: row.country_of_origin,
    warrantyMonths: row.warranty_months,
    warrantyTerms: row.warranty_terms,
    currentStock: row.current_stock,
    minimumStock: row.minimum_stock,
    maximumStock: row.maximum_stock,
    reorderPoint: row.reorder_point,
    locationInWarehouse: row.location_in_warehouse,
    binNumber: row.bin_number,
    imageUrls: row.image_urls,
    technicalDrawingUrl: row.technical_drawing_url,
    installationGuideUrl: row.installation_guide_url,
    isActive: row.is_active,
    isDiscontinued: row.is_discontinued,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // Joined fields
    supplierName: row.supplier_name,
});
const createSparePartRepository = (fastify) => {
    const { pg } = fastify;
    /**
     * Find all spare parts with filters
     */
    const findAll = async (params = {}) => {
        const { page = 1, limit = 20, category, partType, brand, model, lowStock, search, minPrice, maxPrice, supplierId, } = params;
        const offset = (page - 1) * limit;
        let whereClause = "";
        const values = [];
        let paramCount = 1;
        if (category) {
            whereClause += ` WHERE p.category = $${paramCount++}`;
            values.push(category);
        }
        if (partType) {
            whereClause += whereClause ? " AND" : " WHERE";
            whereClause += ` p.part_type = $${paramCount++}`;
            values.push(partType);
        }
        if (brand) {
            whereClause += whereClause ? " AND" : " WHERE";
            whereClause += ` $${paramCount} = ANY(p.compatible_brands)`;
            values.push(brand);
            paramCount++;
        }
        if (model) {
            whereClause += whereClause ? " AND" : " WHERE";
            whereClause += ` $${paramCount} = ANY(p.compatible_models)`;
            values.push(model);
            paramCount++;
        }
        if (lowStock) {
            whereClause += whereClause ? " AND" : " WHERE";
            whereClause += ` p.current_stock <= p.minimum_stock`;
        }
        if (supplierId) {
            whereClause += whereClause ? " AND" : " WHERE";
            whereClause += ` p.primary_supplier_id = $${paramCount++}`;
            values.push(supplierId);
        }
        if (search) {
            whereClause += whereClause ? " AND" : " WHERE";
            whereClause += ` (p.part_name ILIKE $${paramCount} OR p.part_code ILIKE $${paramCount} OR p.oem_part_number ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
            values.push(`%${search}%`);
            paramCount++;
        }
        if (minPrice !== undefined) {
            whereClause += whereClause ? " AND" : " WHERE";
            whereClause += ` p.unit_price >= $${paramCount++}`;
            values.push(minPrice);
        }
        if (maxPrice !== undefined) {
            whereClause += whereClause ? " AND" : " WHERE";
            whereClause += ` p.unit_price <= $${paramCount++}`;
            values.push(maxPrice);
        }
        const countQuery = `
      SELECT COUNT(*) 
      FROM spare_part_catalog p
      ${whereClause}
    `;
        const dataQuery = `
      SELECT p.*, s.supplier_name
      FROM spare_part_catalog p
      LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
      ${whereClause}
      ORDER BY p.part_name
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;
        const [countResult, dataResult] = await Promise.all([
            pg.query(countQuery, values),
            pg.query(dataQuery, [...values, limit, offset]),
        ]);
        return {
            data: dataResult.rows.map(mapDbToSparePart),
            total: parseInt(countResult.rows[0].count),
        };
    };
    /**
     * Find by ID
     */
    const findById = async (id) => {
        const result = await pg.query(`SELECT p.*, s.supplier_name
       FROM spare_part_catalog p
       LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
       WHERE p.part_id = $1`, [id]);
        return result.rows[0] ? mapDbToSparePart(result.rows[0]) : null;
    };
    /**
     * Find by code
     */
    const findByCode = async (code) => {
        const result = await pg.query(`SELECT p.*, s.supplier_name
       FROM spare_part_catalog p
       LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
       WHERE p.part_code = $1`, [code]);
        return result.rows[0] ? mapDbToSparePart(result.rows[0]) : null;
    };
    /**
     * Find by OEM number
     */
    const findByOem = async (oemNumber) => {
        const result = await pg.query(`SELECT p.*, s.supplier_name
       FROM spare_part_catalog p
       LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
       WHERE p.oem_part_number = $1 OR $1 = ANY(p.alternative_part_numbers)`, [oemNumber]);
        return result.rows.map(mapDbToSparePart);
    };
    /**
     * Find compatible parts
     */
    const findCompatible = async (criteria) => {
        let query = `
      SELECT p.*, s.supplier_name
      FROM spare_part_catalog p
      LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
      WHERE p.is_active = true
    `;
        const values = [];
        let paramCount = 1;
        if (criteria.brand) {
            query += ` AND $${paramCount} = ANY(p.compatible_brands)`;
            values.push(criteria.brand);
            paramCount++;
        }
        if (criteria.model) {
            query += ` AND $${paramCount} = ANY(p.compatible_models)`;
            values.push(criteria.model);
            paramCount++;
        }
        if (criteria.year) {
            query += ` AND (p.year_from IS NULL OR p.year_from <= $${paramCount})`;
            query += ` AND (p.year_to IS NULL OR p.year_to >= $${paramCount})`;
            values.push(criteria.year);
            paramCount += 2;
        }
        query += ` ORDER BY p.part_name`;
        const result = await pg.query(query, values);
        return result.rows.map(mapDbToSparePart);
    };
    /**
     * Find low stock parts
     */
    const findLowStock = async () => {
        const result = await pg.query(`SELECT p.*, s.supplier_name
       FROM spare_part_catalog p
       LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
       WHERE p.current_stock <= p.minimum_stock 
       AND p.is_active = true
       ORDER BY (p.current_stock - p.minimum_stock)`);
        return result.rows.map(mapDbToSparePart);
    };
    /**
     * Find out of stock parts
     */
    const findOutOfStock = async () => {
        const result = await pg.query(`SELECT p.*, s.supplier_name
       FROM spare_part_catalog p
       LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
       WHERE p.current_stock <= 0 
       AND p.is_active = true
       ORDER BY p.part_name`);
        return result.rows.map(mapDbToSparePart);
    };
    /**
     * Find by supplier
     */
    const findBySupplier = async (supplierId) => {
        const result = await pg.query(`SELECT p.*, s.supplier_name
       FROM spare_part_catalog p
       LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
       WHERE p.primary_supplier_id = $1 OR $1 = ANY(p.secondary_supplier_ids)
       ORDER BY p.part_name`, [supplierId]);
        return result.rows.map(mapDbToSparePart);
    };
    /**
     * Find by category
     */
    const findByCategory = async (category) => {
        const result = await pg.query(`SELECT p.*, s.supplier_name
       FROM spare_part_catalog p
       LEFT JOIN suppliers s ON p.primary_supplier_id = s.supplier_id
       WHERE p.category = $1
       ORDER BY p.part_name`, [category]);
        return result.rows.map(mapDbToSparePart);
    };
    /**
     * Create new spare part
     */
    const create = async (data) => {
        const { partCode, partName, description, category, subcategory, partType, compatibleBrands, compatibleModels, yearFrom, yearTo, engineTypes, oemPartNumber, manufacturerPartNumber, alternativePartNumbers, material, weightGrams, dimensions, color, unitPrice, purchasePrice, wholesalePrice, taxRate, primarySupplierId, secondarySupplierIds, manufacturer, countryOfOrigin, warrantyMonths, warrantyTerms, currentStock, minimumStock, maximumStock, reorderPoint, locationInWarehouse, binNumber, imageUrls, technicalDrawingUrl, installationGuideUrl, createdBy, } = data;
        const result = await pg.query(`INSERT INTO spare_part_catalog (
        part_code, part_name, description, category, subcategory, part_type,
        compatible_brands, compatible_models, year_from, year_to, engine_types,
        oem_part_number, manufacturer_part_number, alternative_part_numbers,
        material, weight_grams, dimensions, color,
        unit_price, purchase_price, wholesale_price, tax_rate,
        primary_supplier_id, secondary_supplier_ids, manufacturer, country_of_origin,
        warranty_months, warranty_terms,
        current_stock, minimum_stock, maximum_stock, reorder_point,
        location_in_warehouse, bin_number,
        image_urls, technical_drawing_url, installation_guide_url,
        created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38)
      RETURNING *`, [
            partCode,
            partName,
            description,
            category,
            subcategory,
            partType,
            compatibleBrands,
            compatibleModels,
            yearFrom,
            yearTo,
            engineTypes,
            oemPartNumber,
            manufacturerPartNumber,
            alternativePartNumbers,
            material,
            weightGrams,
            dimensions,
            color,
            unitPrice,
            purchasePrice,
            wholesalePrice,
            taxRate || 10,
            primarySupplierId,
            secondarySupplierIds,
            manufacturer,
            countryOfOrigin,
            warrantyMonths || 6,
            warrantyTerms,
            currentStock || 0,
            minimumStock || 0,
            maximumStock,
            reorderPoint,
            locationInWarehouse,
            binNumber,
            imageUrls,
            technicalDrawingUrl,
            installationGuideUrl,
            createdBy,
        ]);
        return mapDbToSparePart(result.rows[0]);
    };
    /**
     * Update spare part
     */
    const update = async (id, data) => {
        const fields = [];
        const values = [];
        let paramCount = 1;
        const fieldMappings = {
            partName: "part_name",
            description: "description",
            category: "category",
            subcategory: "subcategory",
            partType: "part_type",
            compatibleBrands: "compatible_brands",
            compatibleModels: "compatible_models",
            yearFrom: "year_from",
            yearTo: "year_to",
            engineTypes: "engine_types",
            oemPartNumber: "oem_part_number",
            manufacturerPartNumber: "manufacturer_part_number",
            alternativePartNumbers: "alternative_part_numbers",
            material: "material",
            weightGrams: "weight_grams",
            dimensions: "dimensions",
            color: "color",
            unitPrice: "unit_price",
            purchasePrice: "purchase_price",
            wholesalePrice: "wholesale_price",
            taxRate: "tax_rate",
            primarySupplierId: "primary_supplier_id",
            secondarySupplierIds: "secondary_supplier_ids",
            manufacturer: "manufacturer",
            countryOfOrigin: "country_of_origin",
            warrantyMonths: "warranty_months",
            warrantyTerms: "warranty_terms",
            minimumStock: "minimum_stock",
            maximumStock: "maximum_stock",
            reorderPoint: "reorder_point",
            locationInWarehouse: "location_in_warehouse",
            binNumber: "bin_number",
            imageUrls: "image_urls",
            technicalDrawingUrl: "technical_drawing_url",
            installationGuideUrl: "installation_guide_url",
            isActive: "is_active",
            isDiscontinued: "is_discontinued",
        };
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && fieldMappings[key]) {
                fields.push(`${fieldMappings[key]} = $${paramCount++}`);
                values.push(value);
            }
        });
        if (fields.length === 0)
            return null;
        values.push(id);
        const query = `UPDATE spare_part_catalog SET ${fields.join(", ")} WHERE part_id = $${paramCount} RETURNING *`;
        const result = await pg.query(query, values);
        return result.rows[0] ? mapDbToSparePart(result.rows[0]) : null;
    };
    /**
     * Update stock
     */
    const updateStock = async (id, movement) => {
        const { quantity, type, reason, createdBy } = movement;
        // Start transaction
        await pg.query("BEGIN");
        try {
            let newStock;
            let result;
            if (type === "in") {
                // Add stock
                result = await pg.query(`UPDATE spare_part_catalog 
           SET current_stock = current_stock + $1 
           WHERE part_id = $2 
           RETURNING *`, [quantity, id]);
            }
            else if (type === "out") {
                // Remove stock
                result = await pg.query(`UPDATE spare_part_catalog 
           SET current_stock = current_stock - $1 
           WHERE part_id = $2 
           RETURNING *`, [quantity, id]);
            }
            else {
                // Adjustment - set absolute value
                result = await pg.query(`UPDATE spare_part_catalog 
           SET current_stock = $1 
           WHERE part_id = $2 
           RETURNING *`, [quantity, id]);
            }
            newStock = result.rows[0].current_stock;
            // Log stock movement (create a stock_movements table if needed)
            await pg.query(`INSERT INTO stock_movements (
          part_id, quantity, type, reason, new_stock, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6)`, [id, quantity, type, reason, newStock, createdBy]);
            await pg.query("COMMIT");
            const updated = await findById(id);
            return updated;
        }
        catch (error) {
            await pg.query("ROLLBACK");
            throw error;
        }
    };
    /**
     * Check if part is used in any invoices
     */
    const isUsedInInvoices = async (id) => {
        const result = await pg.query(`SELECT COUNT(*) FROM invoice_parts_items WHERE part_id = $1`, [
            id,
        ]);
        return parseInt(result.rows[0].count) > 0;
    };
    /**
     * Delete spare part
     */
    const remove = async (id) => {
        const result = await pg.query("DELETE FROM spare_part_catalog WHERE part_id = $1 RETURNING part_id", [id]);
        return result.rowCount ? result.rowCount > 0 : false;
    };
    return {
        findAll,
        findById,
        findByCode,
        findByOem,
        findCompatible,
        findLowStock,
        findOutOfStock,
        findBySupplier,
        findByCategory,
        create,
        update,
        updateStock,
        isUsedInInvoices,
        delete: remove,
    };
};
exports.createSparePartRepository = createSparePartRepository;
