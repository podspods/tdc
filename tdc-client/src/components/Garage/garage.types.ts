export type Garage = GarageInfo & {
  id: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateGarageDto = GarageInfo & {
  createdBy: string;
};

export type UpdateGarageDto = GarageInfo & {
  isActive?: boolean;
};
export type GarageInfo = {
  name: string;
  address: string;
  zipcode: string;
  city: string;
  phone: string;
  email: string;
  logoUrl: string;
  taxCode: string;
  website: string;
  bankName: string;
  bankAccount: string;
};

export type GarageQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
};
