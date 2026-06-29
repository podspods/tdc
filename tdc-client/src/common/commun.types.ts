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

export type OptionValue = { value: string; label: string };

export type ModalIsOpen = {
  owner: boolean;
  vehicule: boolean;
  invoiceLine: boolean;
};

export const ComponentStatus = {
  Init: 0,
  View: 1,
  Edit: 2,
  Create: 3,
  ToPdf: 4,
} as const;
export type ComponentStatus = (typeof ComponentStatus)[keyof typeof ComponentStatus];
