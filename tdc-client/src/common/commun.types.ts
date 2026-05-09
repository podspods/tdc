export type ViewMode = "list" | "create" | "edit" | "view";
export type Status = "active" | "inactive" | "blocked";
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
