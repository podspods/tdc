import { apiRequest } from "../../api/apirequest";
import type { ApiResponse } from "../../common/commun.types";

import type { Cost, CreateCostDto, UpdateCostDto, CostQueryParams } from "./types";

const BASE_URL = "/cost";

export async function _getAllCosts(params?: CostQueryParams): Promise<ApiResponse<Cost[]>> {
  const url = BASE_URL;
  return apiRequest<Cost[]>(url, "get", params, []);
}

export async function _getActiveCostByDate(date: string): Promise<ApiResponse<Cost>> {
  const url = `${BASE_URL}/active`;

  const params = { date: date };
  return apiRequest<Cost>(url, "get", params);
  //   const response = await api.get(`${BASE_URL}/active`, { params: { date } });
  //   return response.data;
}

export async function _getCostById(id: number): Promise<ApiResponse<Cost>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Cost>(url, "get");
}

export async function _createCost(data: CreateCostDto): Promise<ApiResponse<Cost>> {
  const url = `${BASE_URL}`;
  return apiRequest<Cost>(url, "post", data);
}

export async function _updateCost(id: number, data: UpdateCostDto): Promise<ApiResponse<Cost>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Cost>(url, "put", data);
}

export async function _deleteCost(id: number): Promise<ApiResponse<void>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<void>(url, "delete");
}
