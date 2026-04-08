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

export type GetAllHeadersParams = {
  isActive?: boolean;
  isDefault?: boolean;
};

export type StatsResponse = {
  success: boolean;
  total: number;
  active: number;
  inactive: number;
  defaultHeader: {
    id: string;
    name: string;
    companyName: string;
  } | null;
};

export type ApiHeaderResponse = {
  success: boolean;
  data?: InvoiceHeader;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
