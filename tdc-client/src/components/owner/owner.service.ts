import api from "../../api/client";
import type {
  Owner,
  OwnerQueryParams,
  ApiResponse,
  OwnerStats,
  CreateOwnerDto,
  UpdateOwnerDto,
} from "./owner.types";

const BASE_URL = "/owners";

export async function _getAllOwners(params?: OwnerQueryParams): Promise<ApiResponse<Owner[]>> {
  try {
    const response = await api.get("/owners", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch owners:", error);
    return { success: false, data: [], error: "Failed to fetch owners" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _getOwnerById(id: number): Promise<ApiResponse<Owner>> {
  try {
    const response = await api.get(`/owners/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch owner:", error);
    return { success: false, error: "Failed to fetch owner" };
  }
}

//--------------------------------------------------------------------------------------------------------------------------

export async function _getOwnerStats(): Promise<ApiResponse<OwnerStats>> {
  try {
    const response = await api.get("/owners/stats");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch owner stats:", error);
    return { success: false, error: "Failed to fetch owner stats" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _createOwner(data: CreateOwnerDto): Promise<ApiResponse<Owner>> {
  try {
    const response = await api.post(BASE_URL, data);
    return response.data as ApiResponse<Owner>;
  } catch (error) {
    console.error("Failed to create owner :", error);
    return { success: false, error: "Failed to create owner" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _updateOwner(id: number, data: UpdateOwnerDto): Promise<ApiResponse<Owner>> {
  try {
    const response = await api.put(`/owners/${id}`, data);
    return response.data as ApiResponse<Owner>;
  } catch (error) {
    console.error("Failed to update owner:", error);
    return { success: false, error: "Failed to update owner" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _deleteOwner(id: number): Promise<ApiResponse<void>> {
  try {
    const response = await api.delete(`/owners/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete owner:", error);
    return { success: false, error: "Failed to delete owner" };
  }
}

//--------------------------------------------------------------------------------------------------------------------------

export async function _searchOwners(query: string): Promise<ApiResponse<Owner[]>> {
  try {
    const response = await api.get("/owners/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to search owners:", error);
    return { success: false, error: "Failed to search owners" };
  }
}
