export type OwnerInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
};
export type Owner = CreateOwnerDto & {
  id: number;
};
//  dto =data transfert object
export type CreateOwnerDto = UpdateOwnerDto & {
  createdBy: string;
  createdAt: Date;
};

export type UpdateOwnerDto = OwnerInfo & {
  email: string;
  category: number; // 1= "basic" | 2="important" | 3="vip" | 4="gold" | 5="platinum";
  status: number;
  notes: string;
  updatedAt: Date;
};

export type OwnerStats = {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
  byCategory: {
    basic: number;
    important: number;
    vip: number;
    gold: number;
    platinum: number;
  };
  totalSpentAll: number;
  averageSpentPerOwner: number;
  topCities: Array<{ city: string; count: number }>;
};

export type OwnerQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: number;
  city?: string;
  status?: number;
  minSpent?: number;
  maxSpent?: number;
};
