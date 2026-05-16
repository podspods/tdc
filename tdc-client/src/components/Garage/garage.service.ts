import { apiRequest } from "../../api/apirequest";
import api from "../../api/client";
import type { ApiResponse } from "../../common/commun.types";
import type { Garage, CreateGarageDto, UpdateGarageDto, GarageQueryParams } from "./garage.types";

const BASE_URL = "/garage";

export async function _getAllGarages(params?: GarageQueryParams): Promise<ApiResponse<Garage[]>> {
  const url = BASE_URL;
  return apiRequest<Garage[]>(url, "get", params, []);
}

export async function _getGarageById(id: number): Promise<ApiResponse<Garage>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Garage>(url, "get");
}

export async function _createGarage(data: CreateGarageDto): Promise<ApiResponse<Garage>> {
  const url = `${BASE_URL}`;
  return apiRequest<Garage>(url, "post", data);
}

export async function _updateGarage(
  id: number,
  data: UpdateGarageDto,
): Promise<ApiResponse<Garage>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Garage>(url, "put", data);
}

export async function _deleteGarage(id: number): Promise<ApiResponse<void>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<void>(url, "delete");
}
