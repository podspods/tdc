import api, { type ApiResponse } from "../../api/client";
import type {
  CreateVehicleDto,
  UpdateVehicleDto,
  Vehicle,
  VehicleQueryParams,
  VehicleStats,
} from "./vehicle.types";

const BASE_URL = "/vehicle";
//--------------------------------------------------------------------------------------------------------------------------

export async function _createVehicle(data: CreateVehicleDto): Promise<ApiResponse<Vehicle>> {
  try {
    const response = await api.post(BASE_URL, data);
    return response.data as ApiResponse<Vehicle>;
  } catch (error) {
    console.error("Failed to create vehicle :", error);
    return { success: false, error: "Failed to create vehicle" };
  }
}

//--------------------------------------------------------------------------------------------------------------------------
export async function _updateVehicle(
  id: number,
  data: UpdateVehicleDto,
): Promise<ApiResponse<Vehicle>> {
  try {
    const response = await api.put(`/vehicle/${id}`, data);
    return response.data as ApiResponse<Vehicle>;
  } catch (error) {
    console.error("Failed to update vehicle:", error);
    return { success: false, error: "Failed to update vehicle" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _vehicleList(params?: VehicleQueryParams): Promise<ApiResponse<Vehicle[]>> {
  try {
    const response = await api.get("/vehicle", { params });
    if (response.data && response.data.success) {
      return {
        success: true,
        data: response.data || [],
        error: "",
      };
    }
    return { success: false, data: [], error: "failed to fetch vehicle" };
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return { success: false, data: [], error: "failed to fetch vehicle" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _vehicleStats(): Promise<ApiResponse<VehicleStats>> {
  try {
    const response = await api.get("/vehicle/stats");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch vehicle stats:", error);
    return { success: false, error: "Failed to fetch vehicle stats" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function getVehicleById(id: number): Promise<Vehicle | null> {
  try {
    const response = await api.get(`/vehicles/${id}`);
    if (response.data && response.data.success) {
      return response.data.data || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch vehicle:", error);
    return null;
  }
}

export async function getVehiclesByOwner(ownerId: number): Promise<Vehicle[]> {
  try {
    const response = await api.get(`/vehicles/owner/${ownerId}`);
    if (response.data && response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch vehicles by owner:", error);
    return [];
  }
}
