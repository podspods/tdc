import type { Garage, GarageInfo } from "./garage.types";

export function garage2GarageInfo(currentGarage: Garage): GarageInfo {
  const { id, isActive, createdBy, createdAt, updatedAt, ...garageInfo } = currentGarage;
  return garageInfo;
}
