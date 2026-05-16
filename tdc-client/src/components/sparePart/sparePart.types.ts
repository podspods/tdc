export type SparePart = {
  id: number;
  code: string;
  name: string;
  description?: string;
  purchasePrice: number;
  sellingPrice: number;
  markupMultiplier: number;
  stockQuantity: number;
  supplier?: string;
  isActive: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSparePartDto = {
  code: string;
  name: string;
  description?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  markupMultiplier?: number;
  stockQuantity: number;
  supplier?: string;
  isActive?: number;
  createdBy: string;
};

export type UpdateSparePartDto = {
  code?: string;
  name?: string;
  description?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  markupMultiplier?: number;
  stockQuantity?: number;
  supplier?: string;
  isActive?: number;
};

export type SparePartQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  lowStock?: boolean;
  isActive?: number;
  supplier?: string;
};

export type SparePartStats = {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
};
