import { garageInit } from "../../common/constant";
import { _createGarage, _getAllGarages, _getGarageById, _updateGarage } from "./garage.service";
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

export async function createOrUpdate(garage: Garage): Promise<Garage> {
  if (garage.id === garageInit.id) {
    const response = await _createGarage(garage);
    if (response.success && response.data) {
      return response.data;
    }
    return garage;
  } else {
    const response = await _updateGarage(garage.id, garage);
    if (response.success && response.data) {
      return response.data;
    }
    return garage;
  }
}
