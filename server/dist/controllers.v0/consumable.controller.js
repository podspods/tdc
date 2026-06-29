"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsumableController = void 0;
const consumable_service_1 = require("../services/consumable.service");
const createConsumableController = (fastify) => {
    const consumableService = (0, consumable_service_1.createConsumableService)(fastify);
    /**
     * GET /api/consumables
     * Get all consumables with filters
     */
    const getAllConsumables = async (request, reply) => {
        try {
            const params = {
                page: request.query.page ? parseInt(request.query.page) : 1,
                limit: request.query.limit ? parseInt(request.query.limit) : 20,
                category: request.query.category,
                lowStock: request.query.lowStock ?? false,
                search: request.query.search,
                minPrice: request.query.minPrice ? parseInt(request.query.minPrice) : undefined,
                maxPrice: request.query.maxPrice ? parseInt(request.query.maxPrice) : undefined,
            };
            const result = await consumableService.getAllConsumables(params);
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
     * GET /api/consumables/low-stock
     * Get low stock consumables
     */
    const getLowStockConsumables = async (request, reply) => {
        try {
            const consumables = await consumableService.getLowStockConsumables();
            reply.send({
                success: true,
                data: consumables,
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
     * GET /api/consumables/code/:code
     * Get consumable by code
     */
    const getConsumableByCode = async (request, reply) => {
        try {
            const consumable = await consumableService.getConsumableByCode(request.params.code);
            reply.send({
                success: true,
                data: consumable,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Consumable not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/consumables/:id
     * Get consumable by ID
     */
    const getConsumableById = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const consumable = await consumableService.getConsumableById(id);
            reply.send({
                success: true,
                data: consumable,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Consumable not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/consumables
     * Create new consumable
     */
    const createConsumable = async (request, reply) => {
        try {
            const consumable = await consumableService.createConsumable(request.body);
            reply.status(201).send({
                success: true,
                data: consumable,
                message: "Consumable created successfully",
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Consumable code already exists" ? 409 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/consumables/:id/stock
     * Update stock quantity
     */
    const updateStock = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const { quantity, type, reason } = request.body;
            const result = await consumableService.updateStock(id, {
                consumableId: id,
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
                if (error.message === "Consumable not found")
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
     * PUT /api/consumables/:id
     * Update consumable
     */
    const updateConsumable = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const consumable = await consumableService.updateConsumable(id, request.body);
            reply.send({
                success: true,
                data: consumable,
                message: "Consumable updated successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Consumable not found")
                    status = 404;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/consumables/:id
     * Delete consumable
     */
    const deleteConsumable = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const result = await consumableService.deleteConsumable(id);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Consumable not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    return {
        getAllConsumables,
        getLowStockConsumables,
        getConsumableByCode,
        getConsumableById,
        createConsumable,
        updateStock,
        updateConsumable,
        deleteConsumable,
    };
};
exports.createConsumableController = createConsumableController;
