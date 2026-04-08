import api from "../../api/client";
import {
  type CreateInvoiceHeaderDto,
  type UpdateInvoiceHeaderDto,
  type GetAllHeadersParams,
  type StatsResponse,
  type ApiHeaderResponse,
} from "./invoiceHeader.types";

const BASE_URL = "/invoice-headers";

/**
 * Get all invoice headers
 */
export async function getAllInvoiceHeaders(
  params?: GetAllHeadersParams,
): Promise<ApiHeaderResponse> {
  const response = await api.get(BASE_URL, { params });
  return response.data;
}

/**
 * Get default invoice header
 */
export async function getDefaultInvoiceHeader(): Promise<ApiHeaderResponse> {
  const response = await api.get(`${BASE_URL}/default`);
  return response.data;
}

/**
 * Get invoice header statistics
 */
export async function getInvoiceHeaderStats(): Promise<StatsResponse> {
  const response = await api.get(`${BASE_URL}/stats`);
  return response.data;
}

/**
 * Get invoice header by ID
 */
export async function getInvoiceHeaderById(id: string): Promise<ApiHeaderResponse> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}

/**
 * Create new invoice header
 */
export async function createInvoiceHeader(
  data: CreateInvoiceHeaderDto,
): Promise<ApiHeaderResponse> {
  const response = await api.post(BASE_URL, data);
  return response.data;
}

/**
 * Update invoice header
 */
export async function updateInvoiceHeader(
  id: string,
  data: UpdateInvoiceHeaderDto,
): Promise<ApiHeaderResponse> {
  const response = await api.put(`${BASE_URL}/${id}`, data);
  return response.data;
}

/**
 * Set header as default
 */
export async function setInvoiceHeaderAsDefault(id: string): Promise<ApiHeaderResponse> {
  const response = await api.post(`${BASE_URL}/${id}/set-default`);
  return response.data;
}

/**
 * Delete invoice header
 */
export async function deleteInvoiceHeader(id: string): Promise<ApiHeaderResponse> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}
