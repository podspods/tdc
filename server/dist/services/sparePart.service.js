"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSparePartService = void 0;
const sparePart_repository_1 = require("../repositories/sparePart.repository");
const createSparePartService = (fastify) => {
    const repository = (0, sparePart_repository_1.createSparePartRepository)(fastify);
    /**
     * Get all spare parts with filters
     */
    const getAllSpareParts = async (params = {}) => {
        const { data, total } = await repository.findAll(params);
        return {
            data,
            pagination: {
                page: params.page || 1,
                limit: params.limit || 20,
                total,
                pages: Math.ceil(total / (params.limit || 20)),
            },
        };
    };
    /**
     * Get low stock parts
     */
    const getLowStockParts = async () => {
        return await repository.findLowStock();
    };
    /**
     * Get compatible parts by brand/model
     */
    const getCompatibleParts = async (criteria) => {
        return await repository.findCompatible(criteria);
    };
    /**
     * Get spare part by ID
     */
    const getSparePartById = async (id) => {
        const part = await repository.findById(id);
        if (!part) {
            throw new Error("Spare part not found");
        }
        return part;
    };
    /**
     * Get spare part by code
     */
    const getSparePartByCode = async (code) => {
        const part = await repository.findByCode(code);
        if (!part) {
            throw new Error("Spare part not found");
        }
        return part;
    };
    /**
     * Get spare parts by OEM number
     */
    const getSparePartByOem = async (oemNumber) => {
        return await repository.findByOem(oemNumber);
    };
    /**
     * Create new spare part
     */
    const createSparePart = async (data) => {
        // Check if part code already exists
        const existing = await repository.findByCode(data.partCode);
        if (existing) {
            throw new Error("Part code already exists");
        }
        // Check if OEM number already exists (if provided)
        if (data.oemPartNumber) {
            const existingOem = await repository.findByOem(data.oemPartNumber);
            if (existingOem.length > 0) {
                throw new Error("OEM part number already exists");
            }
        }
        return await repository.create(data);
    };
    /**
     * Update spare part
     */
    const updateSparePart = async (id, data) => {
        const part = await repository.findById(id);
        if (!part) {
            throw new Error("Spare part not found");
        }
        // Check if new part code already exists (if changing code)
        if (data.partCode && data.partCode !== part.partCode) {
            const existing = await repository.findByCode(data.partCode);
            if (existing) {
                throw new Error("Part code already exists");
            }
        }
        // Check if new OEM number already exists (if changing OEM)
        if (data.oemPartNumber && data.oemPartNumber !== part.oemPartNumber) {
            const existingOem = await repository.findByOem(data.oemPartNumber);
            if (existingOem.length > 0 && existingOem[0].partId !== id) {
                throw new Error("OEM part number already exists");
            }
        }
        const updated = await repository.update(id, data);
        if (!updated) {
            throw new Error("No fields to update");
        }
        return updated;
    };
    /**
     * Update stock
     */
    const updateStock = async (id, movement) => {
        const part = await repository.findById(id);
        if (!part) {
            throw new Error("Spare part not found");
        }
        // Validate stock for outgoing movements
        if (movement.type === "out") {
            if (part.currentStock < movement.quantity) {
                throw new Error(`Insufficient stock. Current: ${part.currentStock}, Requested: ${movement.quantity}`);
            }
        }
        return await repository.updateStock(id, movement);
    };
    /**
     * Delete spare part (soft delete or actual delete)
     */
    const deleteSparePart = async (id, permanent = false) => {
        const part = await repository.findById(id);
        if (!part) {
            throw new Error("Spare part not found");
        }
        // Check if part is used in any invoices
        const isUsed = await repository.isUsedInInvoices(id);
        if (isUsed) {
            if (permanent) {
                throw new Error("Cannot permanently delete part that has been used in invoices");
            }
            // Soft delete instead
            const updated = await repository.update(id, { isActive: false, isDiscontinued: true });
            return { message: "Part discontinued (soft deleted)", data: updated };
        }
        // Not used, can delete permanently
        const deleted = await repository.delete(id);
        if (!deleted) {
            throw new Error("Failed to delete spare part");
        }
        return { message: "Spare part deleted successfully" };
    };
    /**
     * Get parts by supplier
     */
    const getPartsBySupplier = async (supplierId) => {
        return await repository.findBySupplier(supplierId);
    };
    /**
     * Get parts by category
     */
    const getPartsByCategory = async (category) => {
        return await repository.findByCategory(category);
    };
    /**
     * Get parts with low stock alert
     */
    const getStockAlerts = async () => {
        const lowStock = await repository.findLowStock();
        const outOfStock = await repository.findOutOfStock();
        return {
            lowStock,
            outOfStock,
            totalAlerts: lowStock.length + outOfStock.length,
        };
    };
    /**
     * Bulk update prices
     */
    const bulkUpdatePrices = async (partIds, increasePercentage, updatedBy) => {
        const results = [];
        for (const id of partIds) {
            const part = await repository.findById(id);
            if (part) {
                const newPrice = part.unitPrice * (1 + increasePercentage / 100);
                const updated = await repository.update(id, {
                    unitPrice: Math.round(newPrice / 1000) * 1000, // Round to nearest 1000
                });
                results.push(updated);
            }
        }
        return results;
    };
    return {
        // Core CRUD
        getAllSpareParts,
        getSparePartById,
        getSparePartByCode,
        getSparePartByOem,
        createSparePart,
        updateSparePart,
        deleteSparePart,
        // Stock management
        updateStock,
        getLowStockParts,
        getStockAlerts,
        // Filters and queries
        getCompatibleParts,
        getPartsBySupplier,
        getPartsByCategory,
        // Bulk operations
        bulkUpdatePrices,
    };
};
exports.createSparePartService = createSparePartService;
