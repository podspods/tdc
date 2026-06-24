export type Task = CreateTaskDto & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskDto = UpdateTaskDto & {
  createdBy: string;
};

export type UpdateTaskDto = {
  code: string;
  name: string;
  description: string;
  durationHours: number;
  skillLevel: number;
  brandId: number;
  isActive: boolean;
};

export type TaskQueryParams = {
  page?: number;
  limit?: number;
  brandId?: number;
  skillLevel?: number;
  isActive?: boolean;
  search?: string;
};

export type TaskStats = {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
};
