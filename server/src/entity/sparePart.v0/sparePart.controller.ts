import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateSparePartDto, UpdateSparePartDto, SparePartQueryParams } from "./sparePart.types";
import {
  _createPart,
  _deletePart,
  _getAllParts,
  _getPartByCode,
  _getPartById,
  _updatePart,
} from "./sparePart.service";

type IdParams = { id: string };
type CodeParams = { code: string };
type GetAllQuery = SparePartQueryParams;

export async function getAllParts(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
) {
  try {
    const params: SparePartQueryParams = {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 20,
      search: request.query.search,
      minPrice: request.query.minPrice,
      maxPrice: request.query.maxPrice,
      lowStock: request.query.lowStock,
      isActive: request.query.isActive,
      supplier: request.query.supplier,
    };
    const result = await _getAllParts(fastify, params);
    reply.send({ success: true, data: result.data, pagination: result.pagination });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getPartById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const part = await _getPartById(fastify, id);
    reply.send({ success: true, data: part });
  } catch (error) {
    const status = error instanceof Error && error.message === "Part not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getPartByCode(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: CodeParams }>,
  reply: FastifyReply,
) {
  try {
    const part = await _getPartByCode(fastify, request.params.code);
    reply.send({ success: true, data: part });
  } catch (error) {
    const status = error instanceof Error && error.message === "Part not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function createPart(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateSparePartDto }>,
  reply: FastifyReply,
) {
  try {
    const part = await _createPart(fastify, request.body);
    reply.status(201).send({ success: true, data: part, message: "Part created successfully" });
  } catch (error) {
    const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function updatePart(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateSparePartDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const part = await _updatePart(fastify, id, request.body);
    reply.send({ success: true, data: part, message: "Part updated successfully" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error) {
      if (error.message === "Part not found") status = 404;
    }
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deletePart(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await _deletePart(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    const status = error instanceof Error && error.message === "Part not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
