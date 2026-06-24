// backend/src/entities/partAndLabor/controller.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as service from "./service";
import type {
  PartAndLaborQueryParams,
  CreatePartAndLaborDto,
  UpdatePartAndLaborDto,
} from "./types";

export async function getAllPartAndLabor(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: PartAndLaborQueryParams }>,
  reply: FastifyReply,
) {
  try {
    const result = await service.getAllPartAndLabor(fastify, request.query);
    reply.send({ success: true, data: result.data, total: result.total });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getPartAndLaborById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id, 10);
    const result = await service.getPartAndLaborById(fastify, id);
    if (!result) {
      reply.status(404).send({ success: false, error: "PartAndLabor not found" });
      return;
    }
    reply.send({ success: true, data: result });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function createPartAndLabor(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreatePartAndLaborDto }>,
  reply: FastifyReply,
) {
  try {
    const result = await service.createPartAndLabor(fastify, request.body);
    reply.status(201).send({ success: true, data: result });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function updatePartAndLabor(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: { id: string }; Body: UpdatePartAndLaborDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id, 10);
    const result = await service.updatePartAndLabor(fastify, id, request.body);
    if (!result) {
      reply.status(404).send({ success: false, error: "PartAndLabor not found" });
      return;
    }
    reply.send({ success: true, data: result });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deletePartAndLabor(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id, 10);
    const result = await service.deletePartAndLabor(fastify, id);
    if (!result) {
      reply.status(404).send({ success: false, error: "PartAndLabor not found" });
      return;
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
