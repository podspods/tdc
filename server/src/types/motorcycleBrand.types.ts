/**
 * Motorcycle Brand Types
 * Using camelCase for all TypeScript interfaces
 */

// Main brand interface

export interface MotorcycleBrandPostgreSql {
  brand_id: number; // Maps to database column: brand_id
  brand_name: string; // Maps to database column: brand_name
  country_of_origin: string; // Maps to database column: country_of_origin
  created_by: string; // Maps to database column: created_by
  create_date: Date; // Maps to database column: created_at
}

export interface MotorcycleBrand {
  brandId: number; // Maps to database column: brand_id
  brandName: string; // Maps to database column: brand_name
  countryOfOrigin: string; // Maps to database column: country_of_origin
  createdBy: string; // Maps to database column: created_by
  createdDate: Date; // Maps to database column: created_at
}

// DTO for creating a new brand
export interface CreateBrandDTO {
  brandName: string;
  countryOfOrigin: string;
  createdBy: string;
}

// DTO for updating an existing brand
export interface UpdateBrandDTO {
  brandName?: string;
  countryOfOrigin?: string;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Paginated response
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query parameters for list endpoints
export interface ListQueryParams {
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
