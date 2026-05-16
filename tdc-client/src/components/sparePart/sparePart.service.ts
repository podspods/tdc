import { apiRequest } from "../../api/apirequest";
import type { ApiResponse } from "../../common/commun.types";
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
  const url = `${BASE_URL}`;
  return apiRequest<SparePart>(url, "post", data);
}

//--------------------------------------------------------------------------------------------------------------------------
export async function _updateSparePart(
  id: number,
  data: UpdateSparePartDto,
): Promise<ApiResponse<SparePart>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<SparePart>(url, "put", data);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _sparePartList(
  params?: SparePartQueryParams,
): Promise<ApiResponse<SparePart[]>> {
  const url = `${BASE_URL}`;
  return apiRequest<SparePart[]>(url, "get", params, []);
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _sparePartStats(): Promise<ApiResponse<SparePartStats>> {
  const url = `${BASE_URL}/stats`;
  return apiRequest<SparePartStats>(url, "get", []);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _getSparePartById(id: number): Promise<ApiResponse<SparePart>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<SparePart>(url, "get");
}

export async function _getSparePartByCode(code: string): Promise<ApiResponse<SparePart>> {
  const url = `${BASE_URL}/code/${code}`;
  return apiRequest<SparePart>(url, "get");
}
