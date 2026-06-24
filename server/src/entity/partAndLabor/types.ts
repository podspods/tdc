// backend/src/entities/partAndLabor/types.ts
export type PartAndLabor = {
  id: number;
  typeLineCode: string;
  categoryCode: string;
  subCategoryCode: string;
  brandCode: string;
  duration: number;
  skillLevel: number;
  cost: number; // percentage (integer)
  margin: number; // integer
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  lastTimeUsed: Date;
  createdBy: string;
};

export type CreatePartAndLaborDto = Partial<Omit<PartAndLabor, "id" | "createdAt">>;

export type UpdatePartAndLaborDto = Partial<Omit<CreatePartAndLaborDto, "createdBy">>;

export type PartAndLaborQueryParams = {
  page?: number;
  limit?: number;
  typeLineCode?: string;
  categoryCode?: string;
  subCategoryCode?: string;
  brandCode?: string;
  search?: string;
};
