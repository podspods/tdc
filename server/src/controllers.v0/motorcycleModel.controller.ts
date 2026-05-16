import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createModelService } from "../services/motorcycleModel.service";
import {
  CreateMotorcycleModelDto,
  UpdateMotorcycleModelDto,
  ModelQueryParams,
} from "../types/motorcycleModel.types";

interface IdParams {
  id: string;
}

interface GetAllQuery extends ModelQueryParams {}

export const createModelController = (fastify: FastifyInstance) => {
  const modelService = createModelService(fastify);

  /**
   * GET /api/motorcycle-models
   */
  const getAllModels = async (
    request: FastifyRequest<{ Querystring: GetAllQuery }>,
    reply: FastifyReply,
  ) => {
    try {
      const params: ModelQueryParams = {
        page: request.query.page ? parseInt(request.query.page as any) : 1,
        limit: request.query.limit ? parseInt(request.query.limit as any) : 20,
        brandId: request.query.brandId ? parseInt(request.query.brandId as any) : undefined,
        isCurrent: request.query.isCurrent,
        search: request.query.search as string,
        year: request.query.year ? parseInt(request.query.year as any) : undefined,
      };

      const result = await modelService.getAllModels(params);

      reply.send({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * GET /api/motorcycle-models/current
   */
  const getCurrentModels = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const models = await modelService.getCurrentModels();
      reply.send({
        success: true,
        data: models,
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * GET /api/motorcycle-models/by-brand/:brandId
   */
  const getModelsByBrand = async (
    request: FastifyRequest<{ Params: { brandId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const brandId = parseInt(request.params.brandId);
      const models = await modelService.getModelsByBrand(brandId);
      reply.send({
        success: true,
        data: models,
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * GET /api/motorcycle-models/:id
   */
  const getModelById = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const model = await modelService.getModelById(id);

      reply.send({
        success: true,
        data: model,
      });
    } catch (error) {
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
  const createModel = async (
    request: FastifyRequest<{ Body: CreateMotorcycleModelDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const model = await modelService.createModel(request.body);

      reply.status(201).send({
        success: true,
        data: model,
        message: "Model created successfully",
      });
    } catch (error) {
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
  const updateModel = async (
    request: FastifyRequest<{ Params: IdParams; Body: UpdateMotorcycleModelDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const model = await modelService.updateModel(id, request.body);

      reply.send({
        success: true,
        data: model,
        message: "Model updated successfully",
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Model not found") status = 404;
        if (error.message.includes("already exists")) status = 409;
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
  const deleteModel = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const result = await modelService.deleteModel(id);

      reply.send({
        success: true,
        ...result,
      });
    } catch (error) {
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
