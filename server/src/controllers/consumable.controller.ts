import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  CreateConsumableDto,
  UpdateConsumableDto,
  ConsumableQueryParams,
  StockMovement,
} from "../types/consumable.types";
import { createConsumableService } from "../services/consumable.service";

interface IdParams {
  id: string;
}

interface CodeParams {
  code: string;
}

interface GetAllQuery extends ConsumableQueryParams {}

interface StockMovementBody {
  quantity: number;
  type: "in" | "out" | "adjustment";
  reason: string;
}

export const createConsumableController = (fastify: FastifyInstance) => {
  const consumableService = createConsumableService(fastify);

  /**
   * GET /api/consumables
   * Get all consumables with filters
   */
  const getAllConsumables = async (
    request: FastifyRequest<{ Querystring: GetAllQuery }>,
    reply: FastifyReply,
  ) => {
    try {
      const params: ConsumableQueryParams = {
        page: request.query.page ? parseInt(request.query.page as any) : 1,
        limit: request.query.limit ? parseInt(request.query.limit as any) : 20,
        category: request.query.category,
        lowStock: request.query.lowStock ?? false,
        search: request.query.search,
        minPrice: request.query.minPrice ? parseInt(request.query.minPrice as any) : undefined,
        maxPrice: request.query.maxPrice ? parseInt(request.query.maxPrice as any) : undefined,
      };

      const result = await consumableService.getAllConsumables(params);

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
   * GET /api/consumables/low-stock
   * Get low stock consumables
   */
  const getLowStockConsumables = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const consumables = await consumableService.getLowStockConsumables();
      reply.send({
        success: true,
        data: consumables,
      });
    } catch (error) {
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
  const getConsumableByCode = async (
    request: FastifyRequest<{ Params: CodeParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const consumable = await consumableService.getConsumableByCode(request.params.code);
      reply.send({
        success: true,
        data: consumable,
      });
    } catch (error) {
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
  const getConsumableById = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const consumable = await consumableService.getConsumableById(id);

      reply.send({
        success: true,
        data: consumable,
      });
    } catch (error) {
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
  const createConsumable = async (
    request: FastifyRequest<{ Body: CreateConsumableDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const consumable = await consumableService.createConsumable(request.body);

      reply.status(201).send({
        success: true,
        data: consumable,
        message: "Consumable created successfully",
      });
    } catch (error) {
      const status =
        error instanceof Error && error.message === "Consumable code already exists" ? 409 : 500;
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
  const updateStock = async (
    request: FastifyRequest<{ Params: IdParams; Body: StockMovementBody }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const { quantity, type, reason } = request.body;

      const result = await consumableService.updateStock(id, {
        consumableId: id,
        quantity,
        type,
        reason,
        createdBy: (request as any).user?.id || "system",
      });

      reply.send({
        success: true,
        data: result,
        message: "Stock updated successfully",
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Consumable not found") status = 404;
        if (error.message.includes("Insufficient stock")) status = 400;
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
  const updateConsumable = async (
    request: FastifyRequest<{ Params: IdParams; Body: UpdateConsumableDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const consumable = await consumableService.updateConsumable(id, request.body);

      reply.send({
        success: true,
        data: consumable,
        message: "Consumable updated successfully",
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Consumable not found") status = 404;
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
  const deleteConsumable = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const result = await consumableService.deleteConsumable(id);

      reply.send({
        success: true,
        ...result,
      });
    } catch (error) {
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
