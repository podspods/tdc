import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createOwnerService } from "../services/owner.service";
import { CreateOwnerDto, UpdateOwnerDto, OwnerQueryParams } from "../types/owner.types";

interface IdParams {
  id: string;
}

interface PhoneParams {
  phone: string;
}

interface GetAllQuery extends OwnerQueryParams {}

export const createOwnerController = (fastify: FastifyInstance) => {
  const ownerService = createOwnerService(fastify);

  /**
   * GET /api/owners
   */
  const getAllOwners = async (
    request: FastifyRequest<{ Querystring: GetAllQuery }>,
    reply: FastifyReply,
  ) => {
    try {
      const pageStr = request.query.page ?? 0;
      const params: OwnerQueryParams = {
        page: request.query.page ?? 0,
        limit: request.query.limit ?? 20,
        search: request.query.search,
        category: request.query.category as any,
        city: request.query.city,
        minSpent: request.query.minSpent ?? 0,
        maxSpent: request.query.maxSpent ?? 0,
        // ✅ CORRECTION: Convertir le string en boolean correctement
        hasOutstandingInvoices: request.query.hasOutstandingInvoices ?? false,
      };

      const result = await ownerService.getAllOwners(params);

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
   * GET /api/owners/stats
   */
  const getStats = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const stats = await ownerService.getStatistics();
      reply.send({
        success: true,
        data: stats,
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * GET /api/owners/phone/:phone
   */
  const getOwnerByPhone = async (
    request: FastifyRequest<{ Params: PhoneParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const owner = await ownerService.getOwnerByPhone(request.params.phone);
      reply.send({
        success: true,
        data: owner,
      });
    } catch (error) {
      const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * GET /api/owners/:id
   */
  const getOwnerById = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const owner = await ownerService.getOwnerById(id);

      reply.send({
        success: true,
        data: owner,
      });
    } catch (error) {
      const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * GET /api/owners/:id/details
   */
  const getOwnerWithDetails = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const owner = await ownerService.getOwnerWithDetails(id);

      reply.send({
        success: true,
        data: owner,
      });
    } catch (error) {
      const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * POST /api/owners
   */
  const createOwner = async (
    request: FastifyRequest<{ Body: CreateOwnerDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const owner = await ownerService.createOwner(request.body);

      reply.status(201).send({
        success: true,
        data: owner,
        message: "Owner created successfully",
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message.includes("already exists")) status = 409;
      }
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * PUT /api/owners/:id
   */
  const updateOwner = async (
    request: FastifyRequest<{ Params: IdParams; Body: UpdateOwnerDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const owner = await ownerService.updateOwner(id, request.body);

      reply.send({
        success: true,
        data: owner,
        message: "Owner updated successfully",
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Owner not found") status = 404;
        if (error.message.includes("already exists")) status = 409;
      }
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * DELETE /api/owners/:id
   */
  const deleteOwner = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const result = await ownerService.deleteOwner(id);

      reply.send({
        success: true,
        ...result,
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Owner not found") status = 404;
        if (error.message.includes("Cannot delete")) status = 409;
      }
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  return {
    getAllOwners,
    getStats,
    getOwnerByPhone,
    getOwnerById,
    getOwnerWithDetails,
    createOwner,
    updateOwner,
    deleteOwner,
  };
};
