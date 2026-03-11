import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createRegistrationService } from "../services/registration.service";
import {
  CreateRegistrationDto,
  UpdateRegistrationDto,
  RegistrationQueryParams,
} from "../types/registration.types";

interface IdParams {
  id: string;
}

interface PlateParams {
  plate: string;
}

interface GetAllQuery extends RegistrationQueryParams {}

export const createRegistrationController = (fastify: FastifyInstance) => {
  const registrationService = createRegistrationService(fastify);

  /**
   * GET /api/registrations
   */
  const getAllRegistrations = async (
    request: FastifyRequest<{ Querystring: GetAllQuery }>,
    reply: FastifyReply,
  ) => {
    try {
      const params: RegistrationQueryParams = {
        page: request.query.page ? parseInt(request.query.page as any) : 1,
        limit: request.query.limit ? parseInt(request.query.limit as any) : 20,
        plateNumber: request.query.plateNumber as string,
        ownerName: request.query.ownerName as string,
        brandId: request.query.brandId ? parseInt(request.query.brandId as any) : undefined,
        modelId: request.query.modelId ? parseInt(request.query.modelId as any) : undefined,
        search: request.query.search as string,
      };

      const result = await registrationService.getAllRegistrations(params);

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
   * GET /api/registrations/plate/:plate
   */
  const getRegistrationByPlate = async (
    request: FastifyRequest<{ Params: PlateParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const registration = await registrationService.getRegistrationByPlate(request.params.plate);
      reply.send({
        success: true,
        data: registration,
      });
    } catch (error) {
      const status =
        error instanceof Error && error.message === "Registration not found" ? 404 : 500;
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * GET /api/registrations/:id
   */
  const getRegistrationById = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const registration = await registrationService.getRegistrationById(id);

      reply.send({
        success: true,
        data: registration,
      });
    } catch (error) {
      const status =
        error instanceof Error && error.message === "Registration not found" ? 404 : 500;
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * POST /api/registrations
   */
  const createRegistration = async (
    request: FastifyRequest<{ Body: CreateRegistrationDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const registration = await registrationService.createRegistration(request.body);

      reply.status(201).send({
        success: true,
        data: registration,
        message: "Registration created successfully",
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
   * PUT /api/registrations/:id
   */
  const updateRegistration = async (
    request: FastifyRequest<{ Params: IdParams; Body: UpdateRegistrationDto }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const registration = await registrationService.updateRegistration(id, request.body);

      reply.send({
        success: true,
        data: registration,
        message: "Registration updated successfully",
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Registration not found") status = 404;
        if (error.message.includes("already exists")) status = 409;
      }
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  /**
   * DELETE /api/registrations/:id
   */
  const deleteRegistration = async (
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const result = await registrationService.deleteRegistration(id);

      reply.send({
        success: true,
        ...result,
      });
    } catch (error) {
      const status =
        error instanceof Error && error.message === "Registration not found" ? 404 : 500;
      reply.status(status).send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  return {
    getAllRegistrations,
    getRegistrationByPlate,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration,
  };
};
