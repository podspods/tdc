export type Vehicle = {
  id: number;
  ownerId: number;
  modelId: number; // including brand and model
  color: string;
  plateNumber: string;
  vintage: number; // millsime
  mileage: number;
  createdAt: Date;
  updatedAt: Date;
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

export const vehicleQueryParamsInit: VehicleQueryParams = {
  page: 1,
  limit: 1,
  search: "",
  category: 1,
  status: 1,
};

export type VehicleStats = {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
};

export const createVehicleDtoInit: CreateVehicleDto = {
  ownerId: 0,
  modelId: 0,
  color: "",
  plateNumber: "",
  vintage: new Date().getFullYear(),
  mileage: 0,
  createdBy: "init",
};
