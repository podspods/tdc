export type Model = CreateModelDto & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateModelDto = UpdateModelDto & {
  brandId: number;
  createdBy: string;
};

export type UpdateModelDto = {
  name: string;
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
};

export type ModelQueryParams = {
  page?: number;
  limit?: number;
  brandId?: number;
  isCurrent?: boolean;
  search?: string; // search in model_name
  minYear?: number;
  maxYear?: number;
};
