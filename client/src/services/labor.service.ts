import { apiClient } from "./api-client";
import type {
  Labor,
  CreateLaborDto,
  UpdateLaborDto,
  LaborQueryParams,
  ApiResponse,
} from "../types/labor.types";

export const createLaborService = (baseUrl: string = "labor") => {
  const getAll = async (params: LaborQueryParams = {}): Promise<ApiResponse<Labor[]>> => {
    console.log("Calling URL:", `${apiClient.defaults.baseURL}${baseUrl}`);
    console.log("Full request:", `${apiClient.defaults.baseURL}${baseUrl}`, { params });
    const response = await apiClient.get(baseUrl, { params });
    return response.data;
  };

  const getById = async (id: number): Promise<ApiResponse<Labor>> => {
    const response = await apiClient.get(`${baseUrl}/${id}`);
    return response.data;
  };

  const getByCode = async (code: string): Promise<ApiResponse<Labor>> => {
    const response = await apiClient.get(`${baseUrl}/code/${code}`);
    return response.data;
  };

  const create = async (data: CreateLaborDto): Promise<ApiResponse<Labor>> => {
    const response = await apiClient.post(baseUrl, data);
    return response.data;
  };

  const update = async (id: number, data: UpdateLaborDto): Promise<ApiResponse<Labor>> => {
    const response = await apiClient.put(`${baseUrl}/${id}`, data);
    return response.data;
  };

  const remove = async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`${baseUrl}/${id}`);
    return response.data;
  };

  return { getAll, getById, getByCode, create, update, delete: remove };
};

export const laborService = createLaborService();
