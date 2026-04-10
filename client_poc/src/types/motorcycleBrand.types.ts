/**
 * Motorcycle Brand Types
 * Using camelCase notation throughout the application
 */

export interface MotorcycleBrand {
  brandId: number;
  brandName: string;
  countryOfOrigin: string;
  createdBy: string;
  createDate: string;
}

export interface CreateMotorcycleBrandDto {
  brandName: string;
  countryOfOrigin: string;
  createdBy: string;
}

export interface UpdateMotorcycleBrandDto {
  brandName?: string;
  countryOfOrigin?: string;
}

export interface ApiResponse<T = any> {
  pagination: any;
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  country?: string;
  search?: string;
}
export interface BrandOption {
  brandId: number;
  brandName: string;
  countryOfOrigin: string;
}
