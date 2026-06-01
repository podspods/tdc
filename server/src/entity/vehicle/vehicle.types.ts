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
  ownerId?: number;
  modelId?: number;
  search?: string; // multi criteria seach
};

export type VehicleInfo = Vehicle & {
  vehicleId: number;
  brandName: string;
  brandCode: string;
  brandId: number;
  countryOfOrigin: string;
  modelName: string;
  userFirstName: string;
  userLastName: string;
};

export type VehicleInfoQueryParams = {
  page?: number;
  limit?: number;
  ownerId?: number;
  modelId?: number;
  brandName: string;
  brandCode: string;
  modelName: string;
  brandId?: number;
  search?: string; // multi criteria seach
};
