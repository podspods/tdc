import api, { type ApiResponse } from "../../api/client";
import type {
  CreateSparePartDto,
  UpdateSparePartDto,
  SparePart,
  SparePartQueryParams,
  SparePartStats,
} from "./sparePart.types";

const BASE_URL = "/spare-part";
//--------------------------------------------------------------------------------------------------------------------------

export async function _createSparePart(data: CreateSparePartDto): Promise<ApiResponse<SparePart>> {
  try {
    const response = await api.post(BASE_URL, data);
    return response.data as ApiResponse<SparePart>;
  } catch (error) {
    console.error("Failed to create sparePart :", error);
    return { success: false, error: "Failed to create sparePart" };
  }
}

//--------------------------------------------------------------------------------------------------------------------------
export async function _updateSparePart(
  id: number,
  data: UpdateSparePartDto,
): Promise<ApiResponse<SparePart>> {
  try {
    const response = await api.put(`${BASE_URL}/${id}`, data);
    return response.data as ApiResponse<SparePart>;
  } catch (error) {
    console.error("Failed to update sparePart:", error);
    return { success: false, error: "Failed to update sparePart" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _sparePartList(
  params?: SparePartQueryParams,
): Promise<ApiResponse<SparePart[]>> {
  try {
    const response = await api.get(BASE_URL, { params });
    if (response.data) {
      return {
        success: true,
        data: response.data || [],
        error: "",
      };
    }
    return { success: false, data: [], error: "failed to fetch sparePart" };
  } catch (error) {
    console.error("Failed to fetch spareParts:", error);
    return { success: false, data: [], error: "failed to fetch sparePart" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _sparePartStats(): Promise<ApiResponse<SparePartStats>> {
  try {
    const response = await api.get(`${BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sparePart stats:", error);
    return { success: false, error: "Failed to fetch sparePart stats" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _getSparePartById(id: number): Promise<SparePart | null> {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    if (response.data && response.data.success) {
      return response.data.data || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch sparePart:", error);
    return null;
  }
}

export async function _getSparePartByCode(code: string): Promise<SparePart[]> {
  try {
    const response = await api.get(`${BASE_URL}/code/${code}`);
    if (response.data && response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch spareParts by code:", error);
    return [];
  }
}
