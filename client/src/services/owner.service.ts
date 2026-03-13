import { apiClient } from "./api-client";
import type {
  Owner,
  CreateOwnerDto,
  UpdateOwnerDto,
  OwnerQueryParams,
  OwnerStats,
  OwnerWithDetails,
  ApiResponse,
} from "../types/owner.types";

/**
 * Owner Service
 * Handles all API calls related to owners/clients
 */
export const createOwnerService = (baseUrl: string = "/api/owners") => {
  /**
   * Get all owners with pagination and filters
   */
  const getAll = async (params: OwnerQueryParams = {}): Promise<ApiResponse<Owner[]>> => {
    const response = await apiClient.get(baseUrl, { params });
    return response.data;
  };

  /**
   * Get owner by ID
   */
  const getById = async (id: number): Promise<ApiResponse<Owner>> => {
    const response = await apiClient.get(`${baseUrl}/${id}`);
    return response.data;
  };

  /**
   * Get owner by phone number (unique identifier)
   */
  const getByPhone = async (phone: string): Promise<ApiResponse<Owner>> => {
    const response = await apiClient.get(`${baseUrl}/phone/${encodeURIComponent(phone)}`);
    return response.data;
  };

  /**
   * Get owner with details (motorcycles and invoices)
   */
  const getWithDetails = async (id: number): Promise<ApiResponse<OwnerWithDetails>> => {
    const response = await apiClient.get(`${baseUrl}/${id}/details`);
    return response.data;
  };

  /**
   * Get owner statistics
   */
  const getStats = async (): Promise<ApiResponse<OwnerStats>> => {
    const response = await apiClient.get(`${baseUrl}/stats`);
    return response.data;
  };

  /**
   * Create new owner
   */
  const create = async (data: CreateOwnerDto): Promise<ApiResponse<Owner>> => {
    const response = await apiClient.post(baseUrl, data);
    return response.data;
  };

  /**
   * Update existing owner
   */
  const update = async (id: number, data: UpdateOwnerDto): Promise<ApiResponse<Owner>> => {
    const response = await apiClient.put(`${baseUrl}/${id}`, data);
    return response.data;
  };

  /**
   * Delete owner
   */
  const remove = async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`${baseUrl}/${id}`);
    return response.data;
  };

  /**
   * Search owners by name or phone
   */
  const search = async (query: string): Promise<ApiResponse<Owner[]>> => {
    const response = await apiClient.get(`${baseUrl}/search`, {
      params: { q: query },
    });
    return response.data;
  };

  /**
   * Get owners by category
   */
  const getByCategory = async (category: string): Promise<ApiResponse<Owner[]>> => {
    const response = await apiClient.get(`${baseUrl}/category/${category}`);
    return response.data;
  };

  /**
   * Get owners with outstanding invoices
   */
  const getWithOutstandingInvoices = async (): Promise<ApiResponse<Owner[]>> => {
    const response = await apiClient.get(`${baseUrl}/outstanding`);
    return response.data;
  };

  /**
   * Get recent owners (last 30 days)
   */
  const getRecent = async (limit: number = 10): Promise<ApiResponse<Owner[]>> => {
    const response = await apiClient.get(`${baseUrl}/recent`, {
      params: { limit },
    });
    return response.data;
  };

  /**
   * Get top spending owners
   */
  const getTopSpenders = async (limit: number = 10): Promise<ApiResponse<Owner[]>> => {
    const response = await apiClient.get(`${baseUrl}/top-spenders`, {
      params: { limit },
    });
    return response.data;
  };

  /**
   * Update owner category
   */
  const updateCategory = async (id: number, category: string): Promise<ApiResponse<Owner>> => {
    const response = await apiClient.patch(`${baseUrl}/${id}/category`, { category });
    return response.data;
  };

  /**
   * Export owners to CSV
   */
  const exportToCsv = async (params: OwnerQueryParams = {}): Promise<Blob> => {
    const response = await apiClient.get(`${baseUrl}/export`, {
      params,
      responseType: "blob",
    });
    return response.data;
  };

  return {
    // Core CRUD
    getAll,
    getById,
    getByPhone,
    getWithDetails,
    getStats,
    create,
    update,
    delete: remove,

    // Search and filters
    search,
    getByCategory,

    // Specialized queries
    getWithOutstandingInvoices,
    getRecent,
    getTopSpenders,

    // Utilities
    updateCategory,
    exportToCsv,
  };
};

/**
 * Singleton instance of owner service
 */
export const ownerService = createOwnerService();

/**
 * Type definition for OwnerService
 */
export type OwnerService = ReturnType<typeof createOwnerService>;
