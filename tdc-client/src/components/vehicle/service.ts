import { apiRequest } from "../../api/apirequest";
import type { ApiResponse } from "../../common/commun.types";
import type {
  CreateVehicleDto,
  UpdateVehicleDto,
  Vehicle,
  VehicleInfo,
  VehicleQueryParams,
  VehicleStats,
} from "./types";

const BASE_URL = "/vehicle";

//--------------------------------------------------------------------------------------------------------------------------

export async function _createVehicle(data: CreateVehicleDto): Promise<ApiResponse<Vehicle>> {
  const url = `${BASE_URL}`;
  return apiRequest<Vehicle>(url, "post", data);
}

//--------------------------------------------------------------------------------------------------------------------------
export async function _updateVehicle(
  id: number,
  data: UpdateVehicleDto,
): Promise<ApiResponse<Vehicle>> {
  const url = `${BASE_URL}/${id}̀`;
  return apiRequest<Vehicle>(url, "put", data);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _vehicleList(params?: VehicleQueryParams): Promise<ApiResponse<Vehicle[]>> {
  const url = `${BASE_URL}`;
  return apiRequest<Vehicle[]>(url, "get", params, []);
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _vehicleStats(): Promise<ApiResponse<VehicleStats>> {
  const url = `${BASE_URL}/stats`;
  return apiRequest<VehicleStats>(url, "get");
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _getVehicleById(id: number): Promise<ApiResponse<Vehicle>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Vehicle>(url, "get");
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _getVehicleInfoById(id: number): Promise<ApiResponse<VehicleInfo>> {
  const url = `${BASE_URL}/info/${id}`;
  return apiRequest<VehicleInfo>(url, "get");
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _getVehicleInfoList(): Promise<ApiResponse<VehicleInfo[]>> {
  const url = `${BASE_URL}/info`;
  return apiRequest<VehicleInfo[]>(url, "get");
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _getVehiclesByOwner(ownerId: number): Promise<ApiResponse<Vehicle[]>> {
  const url = `${BASE_URL}/owner/${ownerId}`;
  return apiRequest<Vehicle[]>(url, "get", []);
}

//--------------------------------------------------------------------------------------------------------------------------
export async function _getVehicleInfoByOwnerId(
  ownerId: number,
  params?: { page?: number; limit?: number },
): Promise<ApiResponse<VehicleInfo[]>> {
  return apiRequest<VehicleInfo[]>(`${BASE_URL}/owner/${ownerId}`, "get", params, []);
}
