import { apiRequest } from "../../api/apirequest";
import type { ApiResponse } from "../../common/commun.types";
import type { Owner, OwnerQueryParams, OwnerStats, CreateOwnerDto, UpdateOwnerDto } from "./types";

const BASE_URL = "/owners";

export async function _getAllOwners(params?: OwnerQueryParams): Promise<ApiResponse<Owner[]>> {
  const url = BASE_URL;
  return apiRequest<Owner[]>(url, "get", params, []);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _getOwnerById(id: number): Promise<ApiResponse<Owner>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Owner>(url, "get");
}

//--------------------------------------------------------------------------------------------------------------------------

export async function _getOwnerStats(): Promise<ApiResponse<OwnerStats>> {
  const url = `${BASE_URL}/stats`;
  return apiRequest<OwnerStats>(url, "get");
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _createOwner(data: CreateOwnerDto): Promise<ApiResponse<Owner>> {
  const url = `${BASE_URL}`;
  return apiRequest<Owner>(url, "post", data);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _updateOwner(id: number, data: UpdateOwnerDto): Promise<ApiResponse<Owner>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Owner>(url, "put", data);
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _deleteOwner(id: number): Promise<ApiResponse<void>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<void>(url, "delete");
}

//--------------------------------------------------------------------------------------------------------------------------

export async function _searchOwners(query: string): Promise<ApiResponse<Owner[]>> {
  const url = `${BASE_URL}/info`;
  return apiRequest<Owner[]>(url, "get", query, []);
}
