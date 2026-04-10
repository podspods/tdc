export interface MotorcycleModel {
  modelId: number;
  brandId: number;
  modelName: string;
  yearStart: number;
  yearEnd: number | null;
  isCurrent: boolean;
  engineDisplacement?: number;
  engineType?: string;
  powerHp?: number;
  torqueNm?: number;
  weightKg?: number;
  fuelCapacityLiters?: number;
  description?: string;
  imageUrl?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  // Joined fields
  brandName?: string;
  brandCountry?: string;
}

export interface CreateMotorcycleModelDto {
  brandId: number;
  modelName: string;
  yearStart: number;
  yearEnd?: number | null;
  isCurrent?: boolean;
  engineDisplacement?: number;
  engineType?: string;
  powerHp?: number;
  torqueNm?: number;
  weightKg?: number;
  fuelCapacityLiters?: number;
  description?: string;
  imageUrl?: string;
  createdBy: string;
}

export interface UpdateMotorcycleModelDto {
  brandId?: number;
  modelName?: string;
  yearStart?: number;
  yearEnd?: number | null;
  isCurrent?: boolean;
  engineDisplacement?: number;
  engineType?: string;
  powerHp?: number;
  torqueNm?: number;
  weightKg?: number;
  fuelCapacityLiters?: number;
  description?: string;
  imageUrl?: string;
}

export interface ModelQueryParams {
  page?: number;
  limit?: number;
  brandId?: number;
  isCurrent?: boolean;
  search?: string;
  year?: number;
}
