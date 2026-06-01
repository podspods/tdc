import type { ApiResponse } from "../../common/commun.types";
import type { CreateModelDto, UpdateModelDto, ModelQueryParams, Model } from "./types";
import { apiRequest } from "../../api/apirequest";

const BASE_URL = "/model";

export async function _getAllModels(params?: ModelQueryParams): Promise<ApiResponse<Model[]>> {
  const url = BASE_URL;
  return apiRequest<Model[]>(url, "get", params, []);
}

export async function _getModelById(id: number): Promise<ApiResponse<Model>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Model>(url, "get");
}

export async function _getModelsByBrand(brandId: number): Promise<ApiResponse<Model[]>> {
  const url = `${BASE_URL}/brand/${brandId}`;
  return apiRequest<Model[]>(url, "get");
}

export async function _createModel(data: CreateModelDto): Promise<ApiResponse<Model>> {
  const url = `${BASE_URL}`;
  return apiRequest<Model>(url, "post", data);
}

export async function _updateModel(id: number, data: UpdateModelDto): Promise<ApiResponse<Model>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Model>(url, "put", data);
}

export async function _deleteModel(id: number): Promise<ApiResponse<void>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<void>(url, "delete");
}
