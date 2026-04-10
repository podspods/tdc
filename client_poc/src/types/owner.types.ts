/**
 * Owner/Client Types for Frontend
 */

export type OwnerCategory = "basic" | "important" | "vip";

export interface Owner {
  ownerId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  city?: string;
  category: OwnerCategory;
  notes?: string;

  // Stats
  totalMotorcycles: number;
  totalInvoices: number;
  totalSpent: number;
  lastVisitDate?: string;

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  // Computed
  fullName: string;
}

export interface CreateOwnerDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  city?: string;
  category?: OwnerCategory;
  notes?: string;
}

export interface UpdateOwnerDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  category?: OwnerCategory;
  notes?: string;
}

export interface OwnerQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: OwnerCategory;
  city?: string;
  minSpent?: number;
  maxSpent?: number;
  hasOutstandingInvoices?: boolean;
}

export interface OwnerStats {
  totalOwners: number;
  byCategory: {
    basic: number;
    important: number;
    vip: number;
  };
  totalSpentAll: number;
  averageSpentPerOwner: number;
  topCities: Array<{ city: string; count: number }>;
}

export interface MotorcycleInfo {
  registrationId: number;
  plateNumber: string;
  brandName: string;
  modelName: string;
  color?: string;
}

export interface InvoiceInfo {
  invoiceId: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: string;
  totalAmount: number;
}

export interface OwnerWithDetails extends Owner {
  motorcycles: MotorcycleInfo[];
  invoices: InvoiceInfo[];
  outstandingInvoices: number;
  totalPaid: number;
}

export interface ApiResponse<T = any> {
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
}
