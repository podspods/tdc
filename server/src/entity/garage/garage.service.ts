import { FastifyInstance } from "fastify";
import * as garageRepo from "./garage.repository";
import { CreateGarageDto, UpdateGarageDto, GarageQueryParams } from "./garage.types";

export async function getAllGarages(fastify: FastifyInstance, params: GarageQueryParams = {}) {
  const { data, total } = await garageRepo.findAllGarages(fastify, params);
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

export async function getGarageById(fastify: FastifyInstance, id: number) {
  const garage = await garageRepo.findGarageById(fastify, id);
  if (!garage) throw new Error("Garage not found");
  return garage;
}

export async function createGarage(fastify: FastifyInstance, data: CreateGarageDto) {
  return await garageRepo.createGarage(fastify, data);
}

export async function updateGarage(fastify: FastifyInstance, id: number, data: UpdateGarageDto) {
  const existing = await garageRepo.findGarageById(fastify, id);
  if (!existing) throw new Error("Garage not found");
  const updated = await garageRepo.updateGarage(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function deleteGarage(fastify: FastifyInstance, id: number) {
  const existing = await garageRepo.findGarageById(fastify, id);
  if (!existing) throw new Error("Garage not found");
  const deleted = await garageRepo.deleteGarage(fastify, id);
  if (!deleted) throw new Error("Failed to delete garage");
  return { message: "Garage deleted successfully" };
}
