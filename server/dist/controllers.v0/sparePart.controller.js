"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSparePartController = void 0;
const sparePart_service_1 = require("../services/sparePart.service");
const createSparePartController = (fastify) => {
    const sparePartService = (0, sparePart_service_1.createSparePartService)(fastify);
    /**
     * GET /api/spare-parts
     * Get all spare parts with filters
     */
    const getAllSpareParts = async (request, reply) => {
        try {
            const params = {
                page: request.query.page ? parseInt(request.query.page) : 1,
                limit: request.query.limit ? parseInt(request.query.limit) : 20,
                category: request.query.category,
                partType: request.query.partType,
                brand: request.query.brand,
                model: request.query.model,
                lowStock: request.query.lowStock ?? false,
                search: request.query.search,
                minPrice: request.query.minPrice ? parseInt(request.query.minPrice) : undefined,
                maxPrice: request.query.maxPrice ? parseInt(request.query.maxPrice) : undefined,
                supplierId: request.query.supplierId
                    ? parseInt(request.query.supplierId)
                    : undefined,
            };
            const result = await sparePartService.getAllSpareParts(params);
            reply.send({
                success: true,
                data: result.data,
                pagination: result.pagination,
            });
        }
        catch (error) {
            reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/spare-parts/low-stock
     * Get low stock parts
     */
    const getLowStockParts = async (request, reply) => {
        try {
            const parts = await sparePartService.getLowStockParts();
            reply.send({
                success: true,
                data: parts,
            });
        }
        catch (error) {
            reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/spare-parts/compatible
     * Get compatible parts
     */
    const getCompatibleParts = async (request, reply) => {
        try {
            const { brand, model, year } = request.query;
            if (!brand && !model) {
                return reply.status(400).send({
                    success: false,
                    error: "At least brand or model is required",
                });
            }
            const parts = await sparePartService.getCompatibleParts({
                brand,
                model,
                year: year ? parseInt(year) : undefined,
            });
            reply.send({
                success: true,
                data: parts,
            });
        }
        catch (error) {
            reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/spare-parts/code/:code
     * Get part by code
     */
    const getSparePartByCode = async (request, reply) => {
        try {
            const part = await sparePartService.getSparePartByCode(request.params.code);
            reply.send({
                success: true,
                data: part,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Spare part not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/spare-parts/oem/:number
     * Get part by OEM number
     */
    const getSparePartByOem = async (request, reply) => {
        try {
            const parts = await sparePartService.getSparePartByOem(request.params.number);
            reply.send({
                success: true,
                data: parts,
            });
        }
        catch (error) {
            reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/spare-parts/:id
     * Get part by ID
     */
    const getSparePartById = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const part = await sparePartService.getSparePartById(id);
            reply.send({
                success: true,
                data: part,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Spare part not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/spare-parts
     * Create new spare part
     */
    const createSparePart = async (request, reply) => {
        try {
            const part = await sparePartService.createSparePart(request.body);
            reply.status(201).send({
                success: true,
                data: part,
                message: "Spare part created successfully",
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Part code already exists" ? 409 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/spare-parts/:id/stock
     * Update stock quantity
     */
    const updateStock = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const { quantity, type, reason } = request.body;
            const result = await sparePartService.updateStock(id, {
                partId: id,
                quantity,
                type,
                reason,
                createdBy: request.user?.id || "system",
            });
            reply.send({
                success: true,
                data: result,
                message: "Stock updated successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Spare part not found")
                    status = 404;
                if (error.message.includes("Insufficient stock"))
                    status = 400;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * PUT /api/spare-parts/:id
     * Update spare part
     */
    const updateSparePart = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const part = await sparePartService.updateSparePart(id, request.body);
            reply.send({
                success: true,
                data: part,
                message: "Spare part updated successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Spare part not found")
                    status = 404;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/spare-parts/:id
     * Delete spare part
     */
    const deleteSparePart = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const result = await sparePartService.deleteSparePart(id);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Spare part not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    return {
        getAllSpareParts,
        getLowStockParts,
        getCompatibleParts,
        getSparePartByCode,
        getSparePartByOem,
        getSparePartById,
        createSparePart,
        updateStock,
        updateSparePart,
        deleteSparePart,
    };
};
exports.createSparePartController = createSparePartController;
