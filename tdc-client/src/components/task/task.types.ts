export type Task = {
  id: number;
  code: string;
  name: string;
  description?: string;
  durationHours: number; // stocké en quart d’heure (ex: 4 = 1 heure)
  skillLevel: number; // 0=basic,1=intermediate,2=advanced,3=expert,4=master
  brandId: number; // 0 = toutes marques
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTaskDto = {
  code: string;
  name: string;
  description?: string;
  durationHours?: number;
  skillLevel?: number;
  brandId?: number;
  createdBy: string;
};

export type UpdateTaskDto = {
  code?: string;
  name?: string;
  description?: string;
  durationHours?: number;
  skillLevel?: number;
  brandId?: number;
  isActive?: boolean;
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
