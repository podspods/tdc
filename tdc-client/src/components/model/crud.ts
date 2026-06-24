import { modelInit } from "../../common/constant";
import { _getAllModels, _getModelById } from "./service";
import type { Model } from "./types";

export async function getModelList(): Promise<Model[]> {
  const ownerResponse = await _getAllModels({ limit: 0 });
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return [];
}

export async function getModelById(id: number): Promise<Model> {
  const response: Model = await _getModelById(id);
  if (response.success && response.data) {
    return response.data;
  }
  return modelInit;
}
