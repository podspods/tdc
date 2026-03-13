/**
 * Owner/Client Types
 */

export type OwnerCategory = "basic" | "important" | "vip";

export interface Owner {
  ownerId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string; // Unique identifier
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

  // Virtual fields (computed)
  fullName?: string;
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
  createdBy: string;
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
  search?: string; // Search in name or phone
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

export interface OwnerWithDetails extends Owner {
  motorcycles: Array<{
    registrationId: number;
    plateNumber: string;
    brandName: string;
    modelName: string;
    color?: string;
  }>;
  invoices: Array<{
    invoiceId: number;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    status: string;
    totalAmount: number;
  }>;
  outstandingInvoices: number;
  totalPaid: number;
}
