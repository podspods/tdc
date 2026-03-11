import { FastifyInstance } from "fastify";
import { createModelRepository } from "../repositories/motorcycleModel.repository";
import {
  CreateMotorcycleModelDto,
  UpdateMotorcycleModelDto,
  ModelQueryParams,
} from "../types/motorcycleModel.types";

export const createModelService = (fastify: FastifyInstance) => {
  const repository = createModelRepository(fastify);

  /**
   * Get all models with filters
   */
  const getAllModels = async (params: ModelQueryParams = {}) => {
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
  const getModelById = async (id: number) => {
    const model = await repository.findById(id);
    if (!model) {
      throw new Error("Model not found");
    }
    return model;
  };

  /**
   * Get models by brand
   */
  const getModelsByBrand = async (brandId: number) => {
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
  const createModel = async (data: CreateMotorcycleModelDto) => {
    // Validate year range
    if (data.yearEnd && data.yearEnd < data.yearStart) {
      throw new Error("Year end cannot be before year start");
    }

    // Set isCurrent based on yearEnd
    if (data.yearEnd === null || data.yearEnd >= new Date().getFullYear()) {
      data.isCurrent = true;
    }

    return await repository.create(data);
  };

  /**
   * Update model
   */
  const updateModel = async (id: number, data: UpdateMotorcycleModelDto) => {
    const model = await repository.findById(id);
    if (!model) {
      throw new Error("Model not found");
    }

    // Validate year range if both are provided
    if (data.yearStart && data.yearEnd) {
      if (data.yearEnd < data.yearStart) {
        throw new Error("Year end cannot be before year start");
      }
    } else if (data.yearStart && model.yearEnd) {
      if (model.yearEnd < data.yearStart) {
        throw new Error("Year end cannot be before year start");
      }
    } else if (data.yearEnd && model.yearStart) {
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
  const deleteModel = async (id: number) => {
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

export type ModelService = ReturnType<typeof createModelService>;
