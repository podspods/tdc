export interface Client {
  id: number;
  client_code: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateClientDTO {
  client_code: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
}

export interface UpdateClientDTO extends Partial<CreateClientDTO> {}

export interface ApiResponse<T = any> {
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
