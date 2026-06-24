import { garageInit } from "../../common/constant";
import { _getAllGarages, _getGarageById } from "./garage.service";
import type { Garage } from "./garage.types";

export async function getGarageList(): Promise<Garage[]> {
  const response = await _getAllGarages();
  if (response.success && response.data) {
    return response.data;
  }
  return [];
}

export async function getGarage(id: number): Promise<Garage> {
  const response = await _getGarageById(id);
  if (response.success && response.data) {
    return response.data;
  }
  return garageInit;
}
