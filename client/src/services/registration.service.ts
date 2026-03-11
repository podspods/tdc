import type { ApiResponse } from "../types/motorcycleBrand.types";
import type {
  CreateRegistrationDto,
  Registration,
  RegistrationQueryParams,
  UpdateRegistrationDto,
} from "../types/registration.types";

import { apiClient } from "./api-client";

export const createRegistrationService = (baseUrl: string = "/api/registrations") => {
  const getAll = async (
    params: RegistrationQueryParams = {},
  ): Promise<ApiResponse<Registration[]>> => {
    const response = await apiClient.get(baseUrl, { params });
    return response.data;
  };

  const getById = async (id: number): Promise<ApiResponse<Registration>> => {
    const response = await apiClient.get(`${baseUrl}/${id}`);
    return response.data;
  };

  const getByPlate = async (plateNumber: string): Promise<ApiResponse<Registration>> => {
    const response = await apiClient.get(`${baseUrl}/plate/${encodeURIComponent(plateNumber)}`);
    return response.data;
  };

  const create = async (data: CreateRegistrationDto): Promise<ApiResponse<Registration>> => {
    const response = await apiClient.post(baseUrl, data);
    return response.data;
  };

  const update = async (
    id: number,
    data: UpdateRegistrationDto,
  ): Promise<ApiResponse<Registration>> => {
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
    getByPlate,
    create,
    update,
    delete: remove,
  };
};

export const registrationService = createRegistrationService();
