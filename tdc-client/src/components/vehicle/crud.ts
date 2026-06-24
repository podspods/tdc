import { vehicleInfoInit, vehicleInit } from "../../common/constant";
import {
  _createVehicle,
  _getVehicleById,
  _getVehicleInfoById,
  _getVehicleInfoList,
  _getVehiclesByOwner,
  _getVehicleInfoByOwnerId,
  _updateVehicle,
} from "./vehicle.service";
import type { Vehicle, VehicleInfo } from "./types";

export async function getVehicleById(id: number): Promise<Vehicle> {
  const response = await _getVehicleById(id);
  if (response.success && response.data) {
    return response.data;
  }
  return vehicleInit;
}

export async function updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
  const response = await _updateVehicle(vehicle.id, vehicle);
  if (response.success && response.data) {
    return response.data;
  }
  return vehicleInit;
}

export async function createVehicle(vehicle: Vehicle): Promise<Vehicle> {
  const response = await _createVehicle(vehicle);
  if (response.success && response.data) {
    return response.data;
  }
  return vehicleInit;
}

export async function getVehicleInfoById(id: number): Promise<VehicleInfo> {
  const vehicleResponse = await _getVehicleInfoById(id);
  if (vehicleResponse.success && vehicleResponse.data) {
    return vehicleResponse.data;
  }

  return vehicleInfoInit;
}

export async function getAllVehicleInfo(): Promise<VehicleInfo[]> {
  const vehicleResponse = await _getVehicleInfoList();
  if (vehicleResponse.success && vehicleResponse.data) {
    return vehicleResponse.data;
  }

  return [];
}
//--------------------------------------------------------------------------------------------------------------------------

export async function getVehicleInfoByOwnerId(
  ownerId: number,
  page?: number,
  limit?: number,
): Promise<VehicleInfo[]> {
  const response = await _getVehicleInfoByOwnerId(ownerId, { page, limit });
  if (response.success && response.data) {
    return response.data;
  }
  return [];
}
