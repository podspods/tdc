import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  _createVehicle,
  _deleteVehicle,
  _getAllVehicles,
  _getVehicleById,
  _getVehicleByPlate,
  _updateVehicle,
} from "./vehicle.service";
import { CreateVehicleDto, UpdateVehicleDto, VehicleQueryParams } from "./vehicle.types";

type IdParams = { id: string };
type PlateParams = { plate: string };
type GetAllQuery = VehicleQueryParams;

export async function getAllVehicles(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
) {
  try {
    const params: VehicleQueryParams = {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 20,
      ownerId: request.query.ownerId,
      modelId: request.query.modelId,
      search: request.query.search,
    };
    const result = await _getAllVehicles(fastify, params);
    reply.send({ success: true, data: result.data, pagination: result.pagination });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getVehicleById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const vehicle = await _getVehicleById(fastify, id);
    reply.send({ success: true, data: vehicle });
  } catch (error) {
    const status = error instanceof Error && error.message === "Vehicle not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getVehicleByPlate(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: PlateParams }>,
  reply: FastifyReply,
) {
  try {
    const vehicle = await _getVehicleByPlate(fastify, request.params.plate);
    reply.send({ success: true, data: vehicle });
  } catch (error) {
    const status = error instanceof Error && error.message === "Vehicle not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function createVehicle(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateVehicleDto }>,
  reply: FastifyReply,
) {
  try {
    const vehicle = await _createVehicle(fastify, request.body);
    reply
      .status(201)
      .send({ success: true, data: vehicle, message: "Vehicle created successfully" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message.includes("already exists")) status = 409;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function updateVehicle(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateVehicleDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const vehicle = await _updateVehicle(fastify, id, request.body);
    reply.send({ success: true, data: vehicle, message: "Vehicle updated successfully" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error) {
      if (error.message === "Vehicle not found") status = 404;
      if (error.message.includes("already exists")) status = 409;
    }
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deleteVehicle(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await _deleteVehicle(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    const status = error instanceof Error && error.message === "Vehicle not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
