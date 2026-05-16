import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  CreateSparePartDto,
  UpdateSparePartDto,
  SparePartQueryParams,
} from "../types/sparePart.types";
import { createSparePartService } from "../services/sparePart.service";

interface IdParams {
  id: string;
}

interface CodeParams {
  code: string;
}

interface OemParams {
  number: string;
}

interface GetAllQuery extends SparePartQueryParams {}

interface StockMovementBody {
  quantity: number;
  type: "in" | "out" | "adjustment";
  reason: string;
}

interface CompatibilityQuery {
  brand?: string;
  model?: string;
  year?: string;
}

export const createSparePartController = (fastify: FastifyInstance) => {
  const sparePartService = createSparePartService(fastify);

  /**
   * GET /api/spare-parts
   * Get all spare parts with filters
   */
  const getAllSpareParts = async (
    request: FastifyRequest<{ Querystring: GetAllQuery }>,
    reply: FastifyReply,
  ) => {
    try {
      const params: SparePartQueryParams = {
        page: request.query.page ? parseInt(request.query.page as any) : 1,
        limit: request.query.limit ? parseInt(request.query.limit as any) : 20,
        category: request.query.category,
        partType: request.query.partType,
        brand: request.query.brand,
        model: request.query.model,
        lowStock: request.query.lowStock ?? false,
        search: request.query.search,
        minPrice: request.query.minPrice ? parseInt(request.query.minPrice as any) : undefined,
        maxPrice: request.query.maxPrice ? parseInt(request.query.maxPrice as any) : undefined,
        supplierId: request.query.supplierId
          ? parseInt(request.query.supplierId as any)
          : undefined,
      };

      const result = await sparePartService.getAllSpareParts(params);

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
   * GET /api/spare-parts/low-stock
   * Get low stock parts
   */
  const getLowStockParts = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const parts = await sparePartService.getLowStockParts();
      reply.send({
        success: true,
        data: parts,
      });
    } catch (error) {
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
  const getCompatibleParts = async (
    request: FastifyRequest<{ Querystring: CompatibilityQuery }>,
    reply: FastifyReply,
  ) => {
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
    } catch (error) {
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
  const getSparePartByCode = async (
    request: FastifyRequest<{ Params: CodeParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const part = await sparePartService.getSparePartByCode(request.params.code);
      reply.send({
        success: true,
        data: part,
      });
    } catch (error) {
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
  const getSparePartByOem = async (
    request: FastifyRequest<{ Params: OemParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const parts = await sparePartService.getSparePartByOem(request.params.number);
      reply.send({
        success: true,
        data: parts,
      });
    } catch (error) {
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
  const getSparePartById = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const part = await sparePartService.getSparePartById(id);

      reply.send({
        success: true,
        data: part,
      });
    } catch (error) {
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
  const createSparePart = async (
    request: FastifyRequest<{ Body: CreateSparePartDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const part = await sparePartService.createSparePart(request.body);

      reply.status(201).send({
        success: true,
        data: part,
        message: "Spare part created successfully",
      });
    } catch (error) {
      const status =
        error instanceof Error && error.message === "Part code already exists" ? 409 : 500;
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
  const updateStock = async (
    request: FastifyRequest<{ Params: IdParams; Body: StockMovementBody }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const { quantity, type, reason } = request.body;

      const result = await sparePartService.updateStock(id, {
        partId: id,
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
        if (error.message === "Spare part not found") status = 404;
        if (error.message.includes("Insufficient stock")) status = 400;
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
  const updateSparePart = async (
    request: FastifyRequest<{ Params: IdParams; Body: UpdateSparePartDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const part = await sparePartService.updateSparePart(id, request.body);

      reply.send({
        success: true,
        data: part,
        message: "Spare part updated successfully",
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Spare part not found") status = 404;
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
  const deleteSparePart = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const result = await sparePartService.deleteSparePart(id);

      reply.send({
        success: true,
        ...result,
      });
    } catch (error) {
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
