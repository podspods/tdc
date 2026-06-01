import { vehicleInfoInit, vehicleInit } from "../../common/constant";
import { _getVehicleById, _getVehicleInfoById } from "./vehicle.service";
import type { Vehicle, VehicleInfo } from "./vehicle.types";

export async function getVehicleById(id: number): Promise<Vehicle> {
  const vehicleResponse = await _getVehicleById(id);
  if (vehicleResponse.success && vehicleResponse.data) {
    return vehicleResponse.data;
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
