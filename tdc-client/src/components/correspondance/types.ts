export type Correspondance = CreateCorrespondanceDto & {
  id: number;
  createdAt: Date;
};

export type CreateCorrespondanceDto = UpdateCorrespondanceDto & {
  createdBy: string;
};

export type UpdateCorrespondanceDto = {
  subjectCode: number;
  code: number;
  valueStr: string;
  valueNum: number;
  description: string;
  sortOrder: number;
};

export type CorrespondanceQueryParams = {
  page?: number;
  limit?: number;
  subjectCode?: number;
  code?: number;
  search?: string;
};
