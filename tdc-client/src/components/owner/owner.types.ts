export type OwnerCategory = "basic" | "important" | "vip" | "gold" | "platinum";

// export const enum ZOwnerCategory {
//   basic = 0,
//   important = 1,
//   vip = 2,
//   gold = 3,
//   platinum = 4,
// }

export type Owner = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  category: number;
  status: number;
  notes: string;
  totalMotorcycles: number;
  totalInvoices: number;
  totalSpent: number;
  lastVisitDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};
//  dto =data transfert object
export type CreateOwnerDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  city?: string;
  category?: number;
  notes?: string;
  createdBy?: string;
};

export type UpdateOwnerDto = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  category?: number;
  status?: number;
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

export type ApiResponse<T = Owner> = {
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

export type OwnerQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: number;
  city?: string;
  status?: number;
  minSpent?: number;
  maxSpent?: number;
};
