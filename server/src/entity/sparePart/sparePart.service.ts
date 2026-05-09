import { FastifyInstance } from "fastify";
import * as partRepo from "./sparePart.repository";
import { CreateSparePartDto, UpdateSparePartDto, SparePartQueryParams } from "./sparePart.types";

export async function _getAllParts(fastify: FastifyInstance, params: SparePartQueryParams = {}) {
  const { data, total } = await partRepo.findAllParts(fastify, params);
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

export async function _getPartById(fastify: FastifyInstance, id: number) {
  const part = await partRepo.findPartById(fastify, id);
  if (!part) throw new Error("Part not found");
  return part;
}

export async function _getPartByCode(fastify: FastifyInstance, code: string) {
  const part = await partRepo.findPartByCode(fastify, code);
  if (!part) throw new Error("Part not found");
  return part;
}

export async function _createPart(fastify: FastifyInstance, data: CreateSparePartDto) {
  const existing = await partRepo.findPartByCode(fastify, data.code);
  if (existing) throw new Error("Part code already exists");
  return await partRepo.createPart(fastify, data);
}

export async function _updatePart(fastify: FastifyInstance, id: number, data: UpdateSparePartDto) {
  const part = await partRepo.findPartById(fastify, id);
  if (!part) throw new Error("Part not found");
  const updated = await partRepo.updatePart(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function _deletePart(fastify: FastifyInstance, id: number) {
  const part = await partRepo.findPartById(fastify, id);
  if (!part) throw new Error("Part not found");
  const deleted = await partRepo.deletePart(fastify, id);
  if (!deleted) throw new Error("Failed to delete part");
  return { message: "Part deleted successfully" };
}
