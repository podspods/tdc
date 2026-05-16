import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createLaborService } from "../services/labor.service";
import { CreateLaborDto, UpdateLaborDto, LaborQueryParams } from "../types/labor.types";

interface IdParams {
  id: string;
}
interface CodeParams {
  code: string;
}
interface GetAllQuery extends LaborQueryParams {}

export const createLaborController = (fastify: FastifyInstance) => {
  const laborService = createLaborService(fastify);

  const getAllLabor = async (
    request: FastifyRequest<{ Querystring: GetAllQuery }>,
    reply: FastifyReply,
  ) => {
    try {
      const params: LaborQueryParams = {
        page: request.query.page ? parseInt(request.query.page as any) : 1,
        limit: request.query.limit ? parseInt(request.query.limit as any) : 20,
        category: request.query.category,
        isActive: request.query.isActive,
        search: request.query.search,
        minRate: request.query.minRate ? parseInt(request.query.minRate as any) : undefined,
        maxRate: request.query.maxRate ? parseInt(request.query.maxRate as any) : undefined,
      };

      const result = await laborService.getAllLabor(params);
      reply.send({ success: true, data: result.data, pagination: result.pagination });
    } catch (error) {
      reply
        .status(500)
        .send({
          success: false,
          error: error instanceof Error ? error.message : "Internal server error",
        });
    }
  };

  const getLaborById = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const labor = await laborService.getLaborById(parseInt(request.params.id));
      reply.send({ success: true, data: labor });
    } catch (error) {
      const status = error instanceof Error && error.message === "Labor not found" ? 404 : 500;
      reply
        .status(status)
        .send({
          success: false,
          error: error instanceof Error ? error.message : "Internal server error",
        });
    }
  };

  const getLaborByCode = async (
    request: FastifyRequest<{ Params: CodeParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const labor = await laborService.getLaborByCode(request.params.code);
      reply.send({ success: true, data: labor });
    } catch (error) {
      const status = error instanceof Error && error.message === "Labor not found" ? 404 : 500;
      reply
        .status(status)
        .send({
          success: false,
          error: error instanceof Error ? error.message : "Internal server error",
        });
    }
  };

  const createLabor = async (
    request: FastifyRequest<{ Body: CreateLaborDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const labor = await laborService.createLabor(request.body);
      reply.status(201).send({ success: true, data: labor, message: "Labor created successfully" });
    } catch (error) {
      const status =
        error instanceof Error && error.message === "Labor code already exists" ? 409 : 500;
      reply
        .status(status)
        .send({
          success: false,
          error: error instanceof Error ? error.message : "Internal server error",
        });
    }
  };

  const updateLabor = async (
    request: FastifyRequest<{ Params: IdParams; Body: UpdateLaborDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const labor = await laborService.updateLabor(parseInt(request.params.id), request.body);
      reply.send({ success: true, data: labor, message: "Labor updated successfully" });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Labor not found") status = 404;
      }
      reply
        .status(status)
        .send({
          success: false,
          error: error instanceof Error ? error.message : "Internal server error",
        });
    }
  };

  const deleteLabor = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const result = await laborService.deleteLabor(parseInt(request.params.id));
      reply.send({ success: true, ...result });
    } catch (error) {
      const status = error instanceof Error && error.message === "Labor not found" ? 404 : 500;
      reply
        .status(status)
        .send({
          success: false,
          error: error instanceof Error ? error.message : "Internal server error",
        });
    }
  };

  return {
    getAllLabor,
    getLaborById,
    getLaborByCode,
    createLabor,
    updateLabor,
    deleteLabor,
  };
};
