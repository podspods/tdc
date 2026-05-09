export type SparePart = {
  id: number;
  code: string; // code interne unique
  name: string;
  description?: string;
  purchasePrice: number; // prix HT en VND
  sellingPrice: number; // prix HT en VND
  markupMultiplier: number; // prix HT en VND
  stockQuantity: number; // quantité actuelle en stock
  supplier?: string; // nom du fournisseur
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSparePartDto = {
  code: string; // code interne unique
  name: string;
  description?: string;
  purchasePrice?: number; // prix HT en VND
  sellingPrice?: number; // prix HT en VND
  markupMultiplier?: number; // prix HT en VND
  stockQuantity: number; // quantité actuelle en stock
  supplier?: string; // nom du fournisseur
  isActive: boolean;
  createdBy: string;
  createdAt: string;
};

export type UpdateSparePartDto = {
  code?: string;
  name?: string;
  description?: string;
  purchasePrice?: number; // prix HT en VND
  sellingPrice?: number; // prix HT en VND
  markupMultiplier?: number; // prix HT en VND
  supplier?: string; // nom du fournisseur
  isActive?: boolean;
};

export type SparePartQueryParams = {
  page?: number;
  limit?: number;
  search?: string; // code, name, supplier
  minPrice?: number;
  maxPrice?: number;
  lowStock?: boolean; // stock_quantity <= 5
  isActive?: boolean;
  supplier?: string;
};

export type ApiResponse<T = SparePart> = {
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
