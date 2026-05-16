import { apiRequest } from "../../api/apirequest";
import api from "../../api/client";
import type { ApiResponse } from "../../common/commun.types";
import type { CreateBrandDto, UpdateBrandDto, BrandQueryParams, Brand } from "./brand.types";

const BASE_URL = "/brands";

export async function _getAllBrands(params?: BrandQueryParams): Promise<ApiResponse<Brand[]>> {
  const url = BASE_URL;
  return apiRequest<Brand[]>(url, "get", params, []);
}

export async function _getBrandById(id: number): Promise<ApiResponse<Brand>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Brand>(url, "get");
}

export async function _getBrandByName(name: string): Promise<ApiResponse<Brand>> {
  const url = `${BASE_URL}/name/${encodeURIComponent(name)}`;
  return apiRequest<Brand>(url, "get");
}

export async function _createBrand(data: CreateBrandDto): Promise<ApiResponse<Brand>> {
  const url = `${BASE_URL}`;
  return apiRequest<Brand>(url, "post", data);
}

export async function _updateBrand(id: number, data: UpdateBrandDto): Promise<ApiResponse<Brand>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Brand>(url, "put", data);
}

export async function _deleteBrand(id: number): Promise<ApiResponse<void>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<void>(url, "delete");
}
