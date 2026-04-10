export type OwnerCategory = "basic" | "important" | "vip" | "gold" | "platinum";

export type OwnerStatus = "active" | "inactive" | "blocked";

export type Owner = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  category: OwnerCategory;
  status: OwnerStatus;
  notes: string;
  totalMotorcycles: number;
  totalInvoices: number;
  totalSpent: number;
  lastVisitDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

export type CreateOwnerDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  city?: string;
  category?: OwnerCategory;
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
  category?: OwnerCategory;
  status?: OwnerStatus;
  notes?: string;
};

export type OwnerStats = {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
  byCategory: {
    basic: number;
    important: number;
    vip: number;
    gold: number;
    platinum: number;
  };
  totalSpentAll: number;
  averageSpentPerOwner: number;
  topCities: Array<{ city: string; count: number }>;
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

export type OwnersQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: OwnerCategory;
  city?: string;
  status?: OwnerStatus;
  minSpent?: number;
  maxSpent?: number;
};
