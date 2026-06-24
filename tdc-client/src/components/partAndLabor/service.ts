// frontend/src/components/partAndLabor/service.ts
import { apiRequest } from "../../api/apirequest";
import type { ApiResponse } from "../../common/commun.types";
import type {
  PartAndLabor,
  CreatePartAndLaborDto,
  UpdatePartAndLaborDto,
  PartAndLaborQueryParams,
} from "./types";

const BASE_URL = "/part-and-labor";

//----------------------------------------------------------------------------------------------
export async function _getAllPartAndLabor(
  params?: PartAndLaborQueryParams,
): Promise<ApiResponse<PartAndLabor[]>> {
  return apiRequest<PartAndLabor[]>(BASE_URL, "get", params, []);
}
//----------------------------------------------------------------------------------------------
export async function _getPartAndLaborById(id: number): Promise<ApiResponse<PartAndLabor>> {
  return apiRequest<PartAndLabor>(`${BASE_URL}/${id}`, "get");
}
//----------------------------------------------------------------------------------------------
export async function _createPartAndLabor(
  data: CreatePartAndLaborDto,
): Promise<ApiResponse<PartAndLabor>> {
  return apiRequest<PartAndLabor>(BASE_URL, "post", data);
}
//----------------------------------------------------------------------------------------------
export async function _updatePartAndLabor(
  id: number,
  data: UpdatePartAndLaborDto,
): Promise<ApiResponse<PartAndLabor>> {
  return apiRequest<PartAndLabor>(`${BASE_URL}/${id}`, "put", data);
}
//----------------------------------------------------------------------------------------------
export async function _deletePartAndLabor(id: number): Promise<ApiResponse<void>> {
  return apiRequest<void>(`${BASE_URL}/${id}`, "delete");
}
//----------------------------------------------------------------------------------------------
