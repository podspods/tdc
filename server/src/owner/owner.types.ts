/**
 * Owner/Client Types
 */

// export type OwnerCategory = "basic" | "important" | "vip";

export type Owner = {
  ownerId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string; // Unique identifier
  email?: string;
  address?: string;
  city?: string;
  category: number;
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
};

export type CreateOwnerDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  city?: string;
  category?: number;
  notes?: string;
  createdBy: string;
};

export type UpdateOwnerDto = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  category?: number;
  notes?: string;
};

export type OwnerQueryParams = {
  page?: number;
  limit?: number;
  search?: string; // Search in name or phone
  category?: number;
  city?: string;
  minSpent?: number;
  maxSpent?: number;
  hasOutstandingInvoices?: boolean;
};

export type OwnerStats = {
  totalOwners: number;
  // byCategory: number;
  totalSpentAll: number;
  averageSpentPerOwner: number;
  topCities: Array<{ city: string; count: number }>;
};
