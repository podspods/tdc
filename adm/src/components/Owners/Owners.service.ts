import api from "../../api/client";
import type {
  Owner,
  CreateOwnerDto,
  UpdateOwnerDto,
  OwnerStats,
  OwnersQueryParams,
  ApiResponse,
} from "./Owners.types";

const BASE_URL = "/owners";

export async function getAllOwners(params?: OwnersQueryParams): Promise<ApiResponse<Owner[]>> {
  const response = await api.get(BASE_URL, { params });
  return response as ApiResponse<Owner[]>;
}

export async function getOwnerById(id: number): Promise<ApiResponse<Owner>> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response as ApiResponse<Owner>;
}

export async function getOwnerStats(): Promise<ApiResponse<OwnerStats>> {
  const response = await api.get(`${BASE_URL}/stats`);
  return response as ApiResponse<OwnerStats>;
}

export async function createOwner(data: CreateOwnerDto): Promise<ApiResponse<Owner>> {
  const response = await api.post(BASE_URL, data);
  return response as ApiResponse<Owner>;
}

export async function updateOwner(id: number, data: UpdateOwnerDto): Promise<ApiResponse<Owner>> {
  const response = await api.put(`${BASE_URL}/${id}`, data);
  return response as ApiResponse<Owner>;
}

export async function deleteOwner(id: number): Promise<ApiResponse<void>> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response as ApiResponse<void>;
}

export async function searchOwners(query: string): Promise<ApiResponse<Owner[]>> {
  const response = await api.get(`${BASE_URL}/search`, { params: { q: query } });
  return response as ApiResponse<Owner[]>;
}

export async function getOwnersByCategory(category: string): Promise<ApiResponse<Owner[]>> {
  const response = await api.get(`${BASE_URL}/category/${category}`);
  return response as ApiResponse<Owner[]>;
}
