export type Garage = CreateGarageDto & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateGarageDto = UpdateGarageDto & {
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
  taxRate: number;
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
