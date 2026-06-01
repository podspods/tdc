import { apiRequest } from "../../api/apirequest";
import type { ApiResponse } from "../../common/commun.types";
import type {
  Correspondance,
  CreateCorrespondanceDto,
  UpdateCorrespondanceDto,
  CorrespondanceQueryParams,
} from "./types";

const BASE_URL = "/correspondance";

export async function _getAllCorrespondances(
  params?: CorrespondanceQueryParams,
): Promise<ApiResponse<Correspondance[]>> {
  const url = `${BASE_URL}`;

  return apiRequest<Correspondance[]>(url, "get", params, []);
}

export async function _getCorrespondanceById(id: number): Promise<ApiResponse<Correspondance>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Correspondance>(url, "get");
}

export async function _getCorrespondanceBySubject(
  subjectId: number,
): Promise<ApiResponse<Correspondance[]>> {
  const url = `${BASE_URL}/subject/${subjectId}`;

  return apiRequest<Correspondance[]>(url, "get");
}

export async function _getCorrespondanceBySubjectAndCode(
  subjectCode: number,
  code: number,
): Promise<ApiResponse<Correspondance>> {
  const url = `${BASE_URL}/lookup?subjectCode=${subjectCode}&code=${code}`;
  return apiRequest<Correspondance>(url, "get");
}

export async function _createCorrespondance(
  data: CreateCorrespondanceDto,
): Promise<ApiResponse<Correspondance>> {
  const url = `${BASE_URL}`;
  return apiRequest<Correspondance>(url, "post", data);
}

export async function _updateCorrespondance(
  id: number,
  data: UpdateCorrespondanceDto,
): Promise<ApiResponse<Correspondance>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Correspondance>(url, "put", data);
}

export async function _deleteCorrespondance(id: number): Promise<ApiResponse<void>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<void>(url, "delete");
}
