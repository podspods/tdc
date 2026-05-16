import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateModelDto, UpdateModelDto, ModelQueryParams } from "./model.types";
import {
  _createModel,
  _deleteModel,
  _getAllModels,
  _getModelById,
  _getModelsByBrand,
  _updateModel,
} from "./model.service";

type IdParams = { id: string };
type GetAllQuery = ModelQueryParams;

export async function getAllModels(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
) {
  try {
    const params: ModelQueryParams = {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 20,
      brandId: request.query.brandId,
      isCurrent: request.query.isCurrent,
      search: request.query.search,
      minYear: request.query.minYear,
      maxYear: request.query.maxYear,
    };
    const result = await _getAllModels(fastify, params);
    reply.send({ success: true, data: result.data, pagination: result.pagination });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getModelById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const model = await _getModelById(fastify, id);
    reply.send({ success: true, data: model });
  } catch (error) {
    const status = error instanceof Error && error.message === "Model not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getModelsByBrand(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: { brandId: string } }>,
  reply: FastifyReply,
) {
  try {
    const brandId = parseInt(request.params.brandId);
    const models = await _getModelsByBrand(fastify, brandId);
    reply.send({ success: true, data: models });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function createModel(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateModelDto }>,
  reply: FastifyReply,
) {
  try {
    const model = await _createModel(fastify, request.body);
    reply.status(201).send({ success: true, data: model, message: "Model created successfully" });
  } catch (error) {
    const status = error instanceof Error && error.message.includes("duplicate") ? 409 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function updateModel(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateModelDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const model = await _updateModel(fastify, id, request.body);
    reply.send({ success: true, data: model, message: "Model updated successfully" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Model not found") status = 404;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deleteModel(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await _deleteModel(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Model not found") status = 404;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
