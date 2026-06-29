import toast from "react-hot-toast";
import { modelInit } from "../../common/constant";
import {
  _createModel,
  _getAllModelInfo,
  _getAllModels,
  _getModelById,
  _updateModel,
} from "./service";
import type { Model, ModelInfo } from "./types";

export async function getModelList(): Promise<Model[]> {
  const ownerResponse = await _getAllModels({ limit: 0 });
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return [];
}

export async function getModelById(id: number): Promise<Model> {
  const response = await _getModelById(id);
  if (response.success && response.data) {
    return response.data;
  }
  return modelInit;
}

export async function getModelInfoList(): Promise<ModelInfo[]> {
  const ownerResponse = await _getAllModelInfo({ limit: 0 });
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return [];
}

export async function createOrUpdate(model: Model): Promise<Model> {
  if (model.id === modelInit.id) {
    const response = await _createModel(model);
    if (response.success && response.data) {
      toast.success(`Create : ${response.success}`);
      return response.data;
    }
    toast.error(`Create : ${response.success}`);

    return model;
  } else {
    const response = await _updateModel(model.id, model);
    if (response.success && response.data) {
      toast.success(`Update : ${response.success}`);
      return response.data;
    }
    toast.error(`Update : ${response.success}`);
    return model;
  }
}
