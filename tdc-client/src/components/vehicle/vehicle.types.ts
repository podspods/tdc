export type Vehicle = {
  id: number;
  ownerId: number;
  modelId: number; // including brand and model
  color: string;
  plateNumber: string;
  vintage: number; // millsime
  mileage: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

export type CreateVehicleDto = {
  ownerId?: number;
  modelId?: number; // including brand and model
  color?: string;
  plateNumber: string;
  vintage?: number;
  mileage?: number;
  createdBy: string;
};
export type UpdateVehicleDto = {
  ownerId?: number;
  modelId?: number; // including brand and model
  color?: string;
  plateNumber: string;
  vintage?: number;
  mileage?: number;
};

export type VehicleQueryParams = {
  page?: number;
  limit?: number;
  search?: string; // plateNumber, owner name, model name
  category?: number;
  status?: number;
};

export type VehicleStats = {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
};
