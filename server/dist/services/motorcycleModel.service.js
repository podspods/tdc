"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModelService = void 0;
const motorcycleModel_repository_1 = require("../repositories/motorcycleModel.repository");
const createModelService = (fastify) => {
    const repository = (0, motorcycleModel_repository_1.createModelRepository)(fastify);
    /**
     * Get all models with filters
     */
    const getAllModels = async (params = {}) => {
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
     * Get model by ID
     */
    const getModelById = async (id) => {
        const model = await repository.findById(id);
        if (!model) {
            throw new Error("Model not found");
        }
        return model;
    };
    /**
     * Get models by brand
     */
    const getModelsByBrand = async (brandId) => {
        return await repository.findByBrand(brandId);
    };
    /**
     * Get current models
     */
    const getCurrentModels = async () => {
        return await repository.getCurrentModels();
    };
    /**
     * Create new model
     */
    const createModel = async (data) => {
        // Validate year range
        if (data.yearEnd !== undefined && data.yearEnd !== null && data.yearEnd < data.yearStart) {
            throw new Error("Year end cannot be before year start");
        }
        // Set isCurrent based on yearEnd
        // ✅ CORRECTION: Vérifier explicitement undefined et null
        if (data.yearEnd === null || data.yearEnd === undefined) {
            data.isCurrent = true;
        }
        else if (data.yearEnd >= new Date().getFullYear()) {
            data.isCurrent = true;
        }
        else {
            data.isCurrent = false;
        }
        return await repository.create(data);
    };
    /**
     * Update model
     */
    const updateModel = async (id, data) => {
        const model = await repository.findById(id);
        if (!model) {
            throw new Error("Model not found");
        }
        // Validate year range if both are provided
        if (data.yearStart !== undefined && data.yearEnd !== undefined && data.yearEnd !== null) {
            if (data.yearEnd < data.yearStart) {
                throw new Error("Year end cannot be before year start");
            }
        }
        else if (data.yearStart !== undefined && model.yearEnd !== null) {
            if (model.yearEnd < data.yearStart) {
                throw new Error("Year end cannot be before year start");
            }
        }
        else if (data.yearEnd !== undefined && data.yearEnd !== null && model.yearStart) {
            if (data.yearEnd < model.yearStart) {
                throw new Error("Year end cannot be before year start");
            }
        }
        const updated = await repository.update(id, data);
        if (!updated) {
            throw new Error("No fields to update");
        }
        return updated;
    };
    /**
     * Delete model
     */
    const deleteModel = async (id) => {
        const model = await repository.findById(id);
        if (!model) {
            throw new Error("Model not found");
        }
        const deleted = await repository.delete(id);
        if (!deleted) {
            throw new Error("Failed to delete model");
        }
        return { message: "Model deleted successfully" };
    };
    return {
        getAllModels,
        getModelById,
        getModelsByBrand,
        getCurrentModels,
        createModel,
        updateModel,
        deleteModel,
    };
};
exports.createModelService = createModelService;
