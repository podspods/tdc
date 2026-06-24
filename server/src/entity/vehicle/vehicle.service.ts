import { FastifyInstance } from "fastify";
import * as vehicleRepo from "./vehicle.repository";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleInfo,
  VehicleQueryParams,
} from "./vehicle.types";

export async function _getAllVehicles(fastify: FastifyInstance, params: VehicleQueryParams = {}) {
  const { data, total } = await vehicleRepo.findAllVehicles(fastify, params);
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
//--------------------------------------------------------------------------------------------------------------------------
export async function _getAllVehicleInfo(
  fastify: FastifyInstance,
  params: VehicleQueryParams = {},
) {
  const { data, total } = await vehicleRepo.findAllVehicleInfo(fastify, params);
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
//--------------------------------------------------------------------------------------------------------------------------

export async function _findVehicleInfoByOwnerId(
  fastify: FastifyInstance,
  ownerId: number,
  page?: number,
  limit?: number,
): Promise<{ data: VehicleInfo[]; total: number }> {
  // On réutilise findAllVehicleInfo avec le filtre ownerId
  return vehicleRepo.findAllVehicleInfo(fastify, {
    ownerId, // ← restriction sur le propriétaire
    page: page || 1,
    limit: limit || 0, // 0 = pas de pagination (retourne tous les véhicules du propriétaire)
    // search: undefined, // on ne filtre pas par texte
  });
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _getVehicleInfoById(fastify: FastifyInstance, id: number) {
  const vehicle: VehicleInfo | null = await vehicleRepo.findVehicleInfoById(fastify, id);
  if (!vehicle) throw new Error("Vehicle not found");
  return vehicle;
}
export async function _getVehicleById(fastify: FastifyInstance, id: number) {
  const vehicle = await vehicleRepo.findVehicleById(fastify, id);
  if (!vehicle) throw new Error("Vehicle not found");
  return vehicle;
}

export async function _getVehicleByPlate(fastify: FastifyInstance, plate: string) {
  const vehicle = await vehicleRepo.findVehicleByPlate(fastify, plate);
  if (!vehicle) throw new Error("Vehicle not found");
  return vehicle;
}

export async function _createVehicle(fastify: FastifyInstance, data: CreateVehicleDto) {
  const existing = await vehicleRepo.findVehicleByPlate(fastify, data.plateNumber);
  if (existing) throw new Error("Plate number already exists");
  return await vehicleRepo.createVehicle(fastify, data);
}

export async function _updateVehicle(fastify: FastifyInstance, id: number, data: UpdateVehicleDto) {
  const vehicle = await vehicleRepo.findVehicleById(fastify, id);
  if (!vehicle) throw new Error("Vehicle not found");

  if (data.plateNumber && data.plateNumber !== vehicle.plateNumber) {
    const existing = await vehicleRepo.findVehicleByPlate(fastify, data.plateNumber);
    if (existing) throw new Error("Plate number already exists");
  }
  const updated = await vehicleRepo.updateVehicle(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function _deleteVehicle(fastify: FastifyInstance, id: number) {
  const vehicle = await vehicleRepo.findVehicleById(fastify, id);
  if (!vehicle) throw new Error("Vehicle not found");
  const deleted = await vehicleRepo.deleteVehicle(fastify, id);
  if (!deleted) throw new Error("Failed to delete vehicle");
  return { message: "Vehicle deleted successfully" };
}
