/**
 * Spare Part (Pièce de rechange) Types
 */

export type PartCategory =
  | "engine"
  | "transmission"
  | "brakes"
  | "suspension"
  | "electrical"
  | "body"
  | "other";
export type PartType = "OEM" | "aftermarket" | "performance" | "reconditioned";

export interface SparePart {
  partId: number;
  partCode: string;
  partName: string;
  description?: string;

  // Classification
  category?: PartCategory;
  subcategory?: string;
  partType?: PartType;

  // Compatibility
  compatibleBrands?: string[];
  compatibleModels?: string[];
  yearFrom?: number;
  yearTo?: number;
  engineTypes?: string[];

  // Part numbers
  oemPartNumber?: string;
  manufacturerPartNumber?: string;
  alternativePartNumbers?: string[];

  // Specifications
  material?: string;
  weightGrams?: number;
  dimensions?: string;
  color?: string;

  // Pricing
  unitPrice: number;
  purchasePrice?: number;
  wholesalePrice?: number;
  taxRate: number;

  // Supplier
  primarySupplierId?: number;
  secondarySupplierIds?: number[];
  manufacturer?: string;
  countryOfOrigin?: string;

  // Warranty
  warrantyMonths: number;
  warrantyTerms?: string;

  // Stock
  currentStock: number;
  minimumStock: number;
  maximumStock?: number;
  reorderPoint?: number;
  locationInWarehouse?: string;
  binNumber?: string;

  // Media
  imageUrls?: string[];
  technicalDrawingUrl?: string;
  installationGuideUrl?: string;

  // Status
  isActive: boolean;
  isDiscontinued: boolean;

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  // Joined fields
  supplierName?: string;
}

export interface CreateSparePartDto {
  partCode: string;
  partName: string;
  description?: string;
  category?: PartCategory;
  subcategory?: string;
  partType?: PartType;
  compatibleBrands?: string[];
  compatibleModels?: string[];
  yearFrom?: number;
  yearTo?: number;
  engineTypes?: string[];
  oemPartNumber?: string;
  manufacturerPartNumber?: string;
  alternativePartNumbers?: string[];
  material?: string;
  weightGrams?: number;
  dimensions?: string;
  color?: string;
  unitPrice: number;
  purchasePrice?: number;
  wholesalePrice?: number;
  taxRate?: number;
  primarySupplierId?: number;
  secondarySupplierIds?: number[];
  manufacturer?: string;
  countryOfOrigin?: string;
  warrantyMonths?: number;
  warrantyTerms?: string;
  currentStock?: number;
  minimumStock?: number;
  maximumStock?: number;
  reorderPoint?: number;
  locationInWarehouse?: string;
  binNumber?: string;
  imageUrls?: string[];
  technicalDrawingUrl?: string;
  installationGuideUrl?: string;
  createdBy: string;
}

export interface UpdateSparePartDto {
  partCode?: string; // ← Ajouter cette ligne
  partName?: string;
  description?: string;
  category?: PartCategory;
  subcategory?: string;
  partType?: PartType;
  compatibleBrands?: string[];
  compatibleModels?: string[];
  yearFrom?: number;
  yearTo?: number;
  engineTypes?: string[];
  oemPartNumber?: string;
  manufacturerPartNumber?: string;
  alternativePartNumbers?: string[];
  material?: string;
  weightGrams?: number;
  dimensions?: string;
  color?: string;
  unitPrice?: number;
  purchasePrice?: number;
  wholesalePrice?: number;
  taxRate?: number;
  primarySupplierId?: number;
  secondarySupplierIds?: number[];
  manufacturer?: string;
  countryOfOrigin?: string;
  warrantyMonths?: number;
  warrantyTerms?: string;
  currentStock?: number;
  minimumStock?: number;
  maximumStock?: number;
  reorderPoint?: number;
  locationInWarehouse?: string;
  binNumber?: string;
  imageUrls?: string[];
  technicalDrawingUrl?: string;
  installationGuideUrl?: string;
  isActive?: boolean;
  isDiscontinued?: boolean;
}

export interface SparePartQueryParams {
  page?: number;
  limit?: number;
  category?: PartCategory;
  partType?: PartType;
  brand?: string;
  model?: string;
  lowStock?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  supplierId?: number;
}

// Ajouter ces types à la fin du fichier existant

export type StockMovementType = "in" | "out" | "adjustment";

export interface StockMovement {
  partId: number;
  quantity: number;
  type: StockMovementType;
  reason: string;
  createdBy: string;
  notes?: string;
  reference?: string;
}

export interface StockMovementHistory extends StockMovement {
  movementId: number;
  newStock: number;
  previousStock: number;
  createdAt: string;
}
