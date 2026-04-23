export type ViewMode = "list" | "create" | "edit" | "view";

export type QueryParams = {
  page?: number;
  limit?: number;
  ownerId?: number;
  modelId?: number;
  search?: string; // multi criteria seach
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
