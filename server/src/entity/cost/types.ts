export type Cost = CreateCostDto & {
  id: number;

  createdAt: string;
  updatedAt: string;
};

export type CreateCostDto = UpdateCostDto & {
  createdBy: string;
};

export type UpdateCostDto = {
  monthlyBase: number;
  dayWork: number;
  hourWork: number;
  effectiveDate: string;
  endDate: string | null;
};

export type CostQueryParams = {
  page?: number;
  limit?: number;
  effectiveDate?: string; // find rate applicable at this date
};
