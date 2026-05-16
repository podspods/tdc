import { FastifyInstance } from "fastify";
import * as modelRepo from "./model.repository";
import { CreateModelDto, UpdateModelDto, ModelQueryParams } from "./model.types";

export async function _getAllModels(fastify: FastifyInstance, params: ModelQueryParams = {}) {
  const { data, total } = await modelRepo.findAllModels(fastify, params);
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

export async function _getModelById(fastify: FastifyInstance, id: number) {
  const model = await modelRepo.findModelById(fastify, id);
  if (!model) throw new Error("Model not found");
  return model;
}

export async function _getModelsByBrand(fastify: FastifyInstance, brandId: number) {
  return await modelRepo.findModelsByBrand(fastify, brandId);
}

export async function _createModel(fastify: FastifyInstance, data: CreateModelDto) {
  // Optionally check for duplicate (brand_id + model_name + year_start) before inserting
  // The unique constraint will catch it, but we can add a friendly check.
  return await modelRepo.createModel(fastify, data);
}

export async function _updateModel(fastify: FastifyInstance, id: number, data: UpdateModelDto) {
  const existing = await modelRepo.findModelById(fastify, id);
  if (!existing) throw new Error("Model not found");
  const updated = await modelRepo.updateModel(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function _deleteModel(fastify: FastifyInstance, id: number) {
  const existing = await modelRepo.findModelById(fastify, id);
  if (!existing) throw new Error("Model not found");
  const deleted = await modelRepo.deleteModel(fastify, id);
  if (!deleted) throw new Error("Failed to delete model");
  return { message: "Model deleted successfully" };
}
