/**
 * Consumable (Ingrédients) Types
 */

export type ConsumableCategory =
  | "oil"
  | "cleaner"
  | "lubricant"
  | "coolant"
  | "brake_fluid"
  | "other";

export interface Consumable {
  consumableId: number;
  consumableCode: string;
  consumableName: string;
  description?: string;
  category?: ConsumableCategory;

  // Units
  unitOfMeasure: string;
  packageSize?: number;
  packageUnit?: string;

  // Pricing
  unitPrice: number;
  purchasePrice?: number;
  supplier?: string;

  // Stock
  currentStock: number;
  minimumStock: number;
  maximumStock?: number;
  reorderPoint?: number;
  locationInWarehouse?: string;

  // Specifications
  viscosity?: string;
  specification?: string;
  safetyDataSheetUrl?: string;
  hazardous: boolean;
  flammable: boolean;

  // Status
  isActive: boolean;

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConsumableDto {
  consumableCode: string;
  consumableName: string;
  description?: string;
  category?: ConsumableCategory;
  unitOfMeasure: string;
  packageSize?: number;
  packageUnit?: string;
  unitPrice: number;
  purchasePrice?: number;
  supplier?: string;
  currentStock?: number;
  minimumStock?: number;
  maximumStock?: number;
  reorderPoint?: number;
  locationInWarehouse?: string;
  viscosity?: string;
  specification?: string;
  safetyDataSheetUrl?: string;
  hazardous?: boolean;
  flammable?: boolean;
  createdBy: string;
}

export interface UpdateConsumableDto {
  consumableName?: string;
  description?: string;
  category?: ConsumableCategory;
  unitOfMeasure?: string;
  packageSize?: number;
  packageUnit?: string;
  unitPrice?: number;
  purchasePrice?: number;
  supplier?: string;
  currentStock?: number;
  minimumStock?: number;
  maximumStock?: number;
  reorderPoint?: number;
  locationInWarehouse?: string;
  viscosity?: string;
  specification?: string;
  safetyDataSheetUrl?: string;
  hazardous?: boolean;
  flammable?: boolean;
  isActive?: boolean;
}

export interface ConsumableQueryParams {
  page?: number;
  limit?: number;
  category?: ConsumableCategory;
  lowStock?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface StockMovement {
  consumableId: number;
  quantity: number;
  type: "in" | "out" | "adjustment";
  reason: string;
  createdBy: string;
}
