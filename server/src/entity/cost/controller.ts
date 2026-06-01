import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as costService from "./service";
import { CreateCostDto, UpdateCostDto, CostQueryParams } from "./types";

type IdParams = { id: string };
type DateQuery = { date: string };

export async function getAllCosts(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: CostQueryParams }>,
  reply: FastifyReply,
) {
  try {
    const params: CostQueryParams = {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 20,
      effectiveDate: request.query.effectiveDate,
    };
    const result = await costService._getAllCosts(fastify, params);
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

export async function getCostById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const cost = await costService._getCostById(fastify, id);
    reply.send({ success: true, data: cost });
  } catch (error) {
    const status = error instanceof Error && error.message === "Cost record not found" ? 404 : 500;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function getActiveCostByDate(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: DateQuery }>,
  reply: FastifyReply,
) {
  try {
    const { date } = request.query;
    if (!date) {
      return reply.status(400).send({ success: false, error: "date query parameter is required" });
    }
    const cost = await costService._getActiveCostByDate(fastify, date);
    reply.send({ success: true, data: cost });
  } catch (error) {
    const status = error instanceof Error && error.message.includes("No active cost") ? 404 : 500;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function createCost(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateCostDto }>,
  reply: FastifyReply,
) {
  try {
    const cost = await costService._createCost(fastify, request.body);
    reply.status(201).send({ success: true, data: cost, message: "Cost record created" });
  } catch (error) {
    reply
      .status(500)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function updateCost(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateCostDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const cost = await costService._updateCost(fastify, id, request.body);
    reply.send({ success: true, data: cost, message: "Cost record updated" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Cost record not found") status = 404;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function deleteCost(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await costService._deleteCost(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Cost record not found") status = 404;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}
