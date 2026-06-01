import { FastifyInstance } from "fastify";
import * as costRepo from "./repository";
import { CreateCostDto, UpdateCostDto, CostQueryParams } from "./types";

export async function _getAllCosts(fastify: FastifyInstance, params: CostQueryParams = {}) {
  const { data, total } = await costRepo.findAllCosts(fastify, params);
  return {
    data,
    pagination: {
      page: params.page || 1,
      limit: params.limit || 20,
      total,
      pages: Math.ceil(total / (params.limit || 20)),
    },
  };
}

export async function _getCostById(fastify: FastifyInstance, id: number) {
  const cost = await costRepo.findCostById(fastify, id);
  if (!cost) throw new Error("Cost record not found");
  return cost;
}

export async function _getActiveCostByDate(fastify: FastifyInstance, date: string) {
  const cost = await costRepo.findActiveCostByDate(fastify, date);
  if (!cost) throw new Error(`No active cost for date ${date}`);
  return cost;
}

export async function _createCost(fastify: FastifyInstance, data: CreateCostDto) {
  // Validate that effective_date is not in the past? Up to business logic.
  return await costRepo.createCost(fastify, data);
}

export async function _updateCost(fastify: FastifyInstance, id: number, data: UpdateCostDto) {
  const existing = await costRepo.findCostById(fastify, id);
  if (!existing) throw new Error("Cost record not found");
  const updated = await costRepo.updateCost(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function _deleteCost(fastify: FastifyInstance, id: number) {
  const existing = await costRepo.findCostById(fastify, id);
  if (!existing) throw new Error("Cost record not found");
  const deleted = await costRepo.deleteCost(fastify, id);
  if (!deleted) throw new Error("Failed to delete cost");
  return { message: "Cost record deleted successfully" };
}
