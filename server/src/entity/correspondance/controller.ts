import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as service from "./service";
import {
  CreateCorrespondanceDto,
  UpdateCorrespondanceDto,
  CorrespondanceQueryParams,
} from "./types";

type IdParams = { id: string };
type GetAllQuery = CorrespondanceQueryParams;

export async function getAllCorrespondances(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
) {
  try {
    const { page, limit, subjectCode, code, search } = request.query;
    const params: CorrespondanceQueryParams = {
      page,
      limit,
      subjectCode,
      code,
      search,
    };

    const result = await service.getAllCorrespondances(fastify, params);
    reply.send({ success: true, data: result.data, pagination: result.pagination });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function getCorrespondanceById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const record = await service.getCorrespondanceById(fastify, id);
    reply.send({ success: true, data: record });
  } catch (error) {
    const status =
      error instanceof Error && error.message === "Correspondance not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getCorrespondanceBySubjectAndCode(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: { subjectCode: string; code: string } }>,
  reply: FastifyReply,
) {
  try {
    const subjectCode = parseInt(request.query.subjectCode);
    const code = parseInt(request.query.code);
    const record = await service.getCorrespondanceBySubjectAndCode(fastify, subjectCode, code);
    reply.send({ success: true, data: record });
  } catch (error) {
    const status =
      error instanceof Error && error.message === "Correspondance not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function createCorrespondance(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateCorrespondanceDto }>,
  reply: FastifyReply,
) {
  try {
    const record = await service.createCorrespondance(fastify, request.body);
    reply.status(201).send({ success: true, data: record, message: "Correspondance created" });
  } catch (error) {
    const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function updateCorrespondance(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateCorrespondanceDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const record = await service.updateCorrespondance(fastify, id, request.body);

    reply.send({ success: true, data: record, message: "Correspondance updated" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Correspondance not found") status = 404;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deleteCorrespondance(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await service.deleteCorrespondance(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    const status =
      error instanceof Error && error.message === "Correspondance not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getCorrespondanceBySubject(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: { subjectCode: string } }>,
  reply: FastifyReply,
) {
  try {
    const subjectCode = parseInt(request.params.subjectCode);
    const items = await service.getBySubject(fastify, subjectCode);
    reply.send({ success: true, data: items });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
