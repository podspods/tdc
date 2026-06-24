import type { Brand } from "../brand/types";
import type { Model } from "../model/types";
import type { Owner } from "../owner/types";

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

export type VehicleStats = {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
};

// export type VehicleInfo = Vehicle & {
//   brandName: string;
//   brandCode: string;
//   brandId: number;
//   countryOfOrigin: string;
//   modelName: string;
//   userFirstName: string;
//   userLastName: string;
// };

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

export type VehicleInfo = {
  vehicle: Vehicle;
  brand: Brand;
  model: Model;
  owner: Owner;
};
