"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModelController = void 0;
const motorcycleModel_service_1 = require("../services/motorcycleModel.service");
const createModelController = (fastify) => {
    const modelService = (0, motorcycleModel_service_1.createModelService)(fastify);
    /**
     * GET /api/motorcycle-models
     */
    const getAllModels = async (request, reply) => {
        try {
            const params = {
                page: request.query.page ? parseInt(request.query.page) : 1,
                limit: request.query.limit ? parseInt(request.query.limit) : 20,
                brandId: request.query.brandId ? parseInt(request.query.brandId) : undefined,
                isCurrent: request.query.isCurrent,
                search: request.query.search,
                year: request.query.year ? parseInt(request.query.year) : undefined,
            };
            const result = await modelService.getAllModels(params);
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
     * GET /api/motorcycle-models/current
     */
    const getCurrentModels = async (request, reply) => {
        try {
            const models = await modelService.getCurrentModels();
            reply.send({
                success: true,
                data: models,
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
     * GET /api/motorcycle-models/by-brand/:brandId
     */
    const getModelsByBrand = async (request, reply) => {
        try {
            const brandId = parseInt(request.params.brandId);
            const models = await modelService.getModelsByBrand(brandId);
            reply.send({
                success: true,
                data: models,
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
     * GET /api/motorcycle-models/:id
     */
    const getModelById = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const model = await modelService.getModelById(id);
            reply.send({
                success: true,
                data: model,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Model not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/motorcycle-models
     */
    const createModel = async (request, reply) => {
        try {
            const model = await modelService.createModel(request.body);
            reply.status(201).send({
                success: true,
                data: model,
                message: "Model created successfully",
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * PUT /api/motorcycle-models/:id
     */
    const updateModel = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const model = await modelService.updateModel(id, request.body);
            reply.send({
                success: true,
                data: model,
                message: "Model updated successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Model not found")
                    status = 404;
                if (error.message.includes("already exists"))
                    status = 409;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/motorcycle-models/:id
     */
    const deleteModel = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const result = await modelService.deleteModel(id);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Model not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    return {
        getAllModels,
        getCurrentModels,
        getModelsByBrand,
        getModelById,
        createModel,
        updateModel,
        deleteModel,
    };
};
exports.createModelController = createModelController;
