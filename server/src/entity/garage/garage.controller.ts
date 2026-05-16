import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as garageService from "./garage.service";
import { CreateGarageDto, UpdateGarageDto, GarageQueryParams } from "./garage.types";

type IdParams = { id: string };
type GetAllQuery = GarageQueryParams;

export async function getAllGarages(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
) {
  try {
    const params: GarageQueryParams = {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 20,
      search: request.query.search,
      isActive: request.query.isActive,
    };
    const result = await garageService.getAllGarages(fastify, params);
    reply.send({ success: true, data: result.data, pagination: result.pagination });
  } catch (error) {
    reply
      .status(500)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function getGarageById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const garage = await garageService.getGarageById(fastify, id);
    reply.send({ success: true, data: garage });
  } catch (error) {
    const status = error instanceof Error && error.message === "Garage not found" ? 404 : 500;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function createGarage(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateGarageDto }>,
  reply: FastifyReply,
) {
  try {
    const garage = await garageService.createGarage(fastify, request.body);
    reply.status(201).send({ success: true, data: garage, message: "Garage created successfully" });
  } catch (error) {
    reply
      .status(500)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function updateGarage(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateGarageDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const garage = await garageService.updateGarage(fastify, id, request.body);
    reply.send({ success: true, data: garage, message: "Garage updated successfully" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Garage not found") status = 404;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function deleteGarage(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await garageService.deleteGarage(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Garage not found") status = 404;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}
