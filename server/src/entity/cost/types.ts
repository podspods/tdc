export type Cost = CreateCostDto & {
  id: number;

  createdAt: string;
  updatedAt: Date;
};

export type CreateCostDto = UpdateCostDto & {
  createdBy: Date;
};

export type UpdateCostDto = {
  name: string;
  monthlyBase: number;
  dayWork: number;
  hourWork: number;
  effectiveDate: Date;
  endDate: Date | null;
};

export type CostQueryParams = {
  page?: number;
  limit?: number;
  effectiveDate?: string; // find rate applicable at this date
};
