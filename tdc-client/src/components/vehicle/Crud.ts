import { vehicleInit } from "../../common/constant";
import { _getVehicleById } from "./vehicle.service";
import type { Vehicle } from "./vehicle.types";

export async function getVehicleById(id: number): Promise<Vehicle> {
  const response = await _getVehicleById(id);
  if (response.success && response.data) {
    return response.data;
  }
  return vehicleInit;
}
