import type { ApiResponse, PaginatedResponse } from "../types/motorcycleBrand.types";
import type {
  CreateMotorcycleModelDto,
  ModelQueryParams,
  MotorcycleModel,
  UpdateMotorcycleModelDto,
} from "../types/motorcycleModel.types";
import { apiClient } from "./api-client";

export const createMotorcycleModelService = (baseUrl: string = "/api/motorcycle-models") => {
  const getAll = async (
    params: ModelQueryParams = {},
  ): Promise<PaginatedResponse<MotorcycleModel>> => {
    const response = await apiClient.get(baseUrl, { params });
    return response.data;
  };

  const getById = async (id: number): Promise<ApiResponse<MotorcycleModel>> => {
    const response = await apiClient.get(`${baseUrl}/${id}`);
    return response.data;
  };

  const getByBrand = async (brandId: number): Promise<ApiResponse<MotorcycleModel[]>> => {
    const response = await apiClient.get(`${baseUrl}/by-brand/${brandId}`);
    return response.data;
  };

  const getCurrent = async (): Promise<ApiResponse<MotorcycleModel[]>> => {
    const response = await apiClient.get(`${baseUrl}/current`);
    return response.data;
  };

  const create = async (data: CreateMotorcycleModelDto): Promise<ApiResponse<MotorcycleModel>> => {
    const response = await apiClient.post(baseUrl, data);
    return response.data;
  };

  const update = async (
    id: number,
    data: UpdateMotorcycleModelDto,
  ): Promise<ApiResponse<MotorcycleModel>> => {
    const response = await apiClient.put(`${baseUrl}/${id}`, data);
    return response.data;
  };

  const remove = async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`${baseUrl}/${id}`);
    return response.data;
  };

  return {
    getAll,
    getById,
    getByBrand,
    getCurrent,
    create,
    update,
    delete: remove,
  };
};

export const motorcycleModelService = createMotorcycleModelService();
