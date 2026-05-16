/**
 * Invoice Header Types - No classes, only types
 */

export type InvoiceHeader = {
  id: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  companyName: string;
  companyLogo?: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail?: string;
  companyWebsite?: string;
  taxCode?: string;
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  footerText?: string;
  termsAndConditions?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

export type CreateInvoiceHeaderDto = {
  name: string;
  isDefault?: boolean;
  isActive?: boolean;
  companyName: string;
  companyLogo?: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail?: string;
  companyWebsite?: string;
  taxCode?: string;
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  footerText?: string;
  termsAndConditions?: string;
  createdBy: string;
};

export type UpdateInvoiceHeaderDto = {
  name?: string;
  isDefault?: boolean;
  isActive?: boolean;
  companyName?: string;
  companyLogo?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyWebsite?: string;
  taxCode?: string;
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  footerText?: string;
  termsAndConditions?: string;
};

export type InvoiceHeadersData = {
  version: string;
  lastUpdated: string;
  headers: InvoiceHeader[];
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

export type GetAllHeadersParams = {
  isActive?: boolean;
  isDefault?: boolean;
};

export type StatsResponse = {
  total: number;
  active: number;
  inactive: number;
  defaultHeader: {
    id: string;
    name: string;
    companyName: string;
  } | null;
};
