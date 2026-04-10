import { apiClient } from "./api-client";
import type {
  Invoice,
  CreateInvoiceDto,
  UpdateInvoiceDto,
  AddLaborItemDto,
  AddPartItemDto,
  AddConsumableItemDto,
  AddPaymentDto,
  InvoiceQueryParams,
  InvoiceStats,
  ApiResponse,
  InvoiceLaborItem,
  InvoicePartItem,
  InvoiceConsumableItem,
  InvoicePayment,
} from "../types/invoice.types";

export const createInvoiceService = (baseUrl: string = "/api/invoices") => {
  const getAll = async (params: InvoiceQueryParams = {}): Promise<ApiResponse<Invoice[]>> => {
    const response = await apiClient.get(baseUrl, { params });
    return response.data;
  };

  const getById = async (id: number): Promise<ApiResponse<Invoice>> => {
    const response = await apiClient.get(`${baseUrl}/${id}`);
    return response.data;
  };

  const getByNumber = async (invoiceNumber: string): Promise<ApiResponse<Invoice>> => {
    const response = await apiClient.get(`${baseUrl}/number/${encodeURIComponent(invoiceNumber)}`);
    return response.data;
  };

  const getStats = async (): Promise<ApiResponse<InvoiceStats>> => {
    const response = await apiClient.get(`${baseUrl}/stats`);
    return response.data;
  };

  const create = async (data: CreateInvoiceDto): Promise<ApiResponse<Invoice>> => {
    const response = await apiClient.post(baseUrl, data);
    return response.data;
  };

  const update = async (id: number, data: UpdateInvoiceDto): Promise<ApiResponse<Invoice>> => {
    const response = await apiClient.put(`${baseUrl}/${id}`, data);
    return response.data;
  };

  const addLaborItem = async (
    id: number,
    data: AddLaborItemDto,
  ): Promise<ApiResponse<InvoiceLaborItem>> => {
    const response = await apiClient.post(`${baseUrl}/${id}/labor`, data);
    return response.data;
  };

  const addPartItem = async (
    id: number,
    data: AddPartItemDto,
  ): Promise<ApiResponse<InvoicePartItem>> => {
    const response = await apiClient.post(`${baseUrl}/${id}/parts`, data);
    return response.data;
  };

  const addConsumableItem = async (
    id: number,
    data: AddConsumableItemDto,
  ): Promise<ApiResponse<InvoiceConsumableItem>> => {
    const response = await apiClient.post(`${baseUrl}/${id}/consumables`, data);
    return response.data;
  };

  const addPayment = async (
    id: number,
    data: AddPaymentDto,
  ): Promise<ApiResponse<InvoicePayment>> => {
    const response = await apiClient.post(`${baseUrl}/${id}/payments`, data);
    return response.data;
  };

  const deleteLaborItem = async (itemId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`${baseUrl}/labor/${itemId}`);
    return response.data;
  };

  const deletePartItem = async (itemId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`${baseUrl}/parts/${itemId}`);
    return response.data;
  };

  const deleteConsumableItem = async (itemId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`${baseUrl}/consumables/${itemId}`);
    return response.data;
  };

  const remove = async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`${baseUrl}/${id}`);
    return response.data;
  };

  return {
    getAll,
    getById,
    getByNumber,
    getStats,
    create,
    update,
    addLaborItem,
    addPartItem,
    addConsumableItem,
    addPayment,
    deleteLaborItem,
    deletePartItem,
    deleteConsumableItem,
    delete: remove,
  };
};

export const invoiceService = createInvoiceService();
