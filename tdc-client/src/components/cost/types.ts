export type Cost = CreateCostDto & {
  id: number;

  createdAt: Date;
  updatedAt: Date;
};

export type CreateCostDto = UpdateCostDto & {
  createdBy: string;
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
  effectiveDate?: Date; // find rate applicable at this date
};
