import { dateInit } from "../../common/constant";

export type OwnerCategory = "basic" | "important" | "vip" | "gold" | "platinum";

// export const enum ZOwnerCategory {
//   basic = 0,
//   important = 1,
//   vip = 2,
//   gold = 3,
//   platinum = 4,
// }

export type OwnerInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
};
export type Owner = CreateOwnerDto & {
  id: number;
  totalMotorcycles: number | 0;
  totalInvoices: number;
  totalSpent: number;
  lastVisitDate: string;
};
//  dto =data transfert object
export type CreateOwnerDto = UpdateOwnerDto & {
  createdBy: string;
  createdAt: Date;
};

export type UpdateOwnerDto = OwnerInfo & {
  email: string | "";
  category?: number;
  status?: number;
  notes?: string;
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
export const ownerQueryParamsInit: OwnerQueryParams = {
  page: 1,
  limit: 1,
  search: "",
  category: 1,
  city: "",
  status: 0,
  minSpent: 0,
  maxSpent: 0,
};

export const ZcreateOwnerDtoInit: CreateOwnerDto = {
  firstName: "init",
  lastName: "init",
  phoneNumber: "init",
  address: "init",
  city: "init",
  email: "init",
  category: 0,
  status: 0,
  notes: "init",
  updatedAt: dateInit, // Assurez-vous que dateInit est défini ailleurs
  createdBy: "init",
  createdAt: dateInit,
};
export const createOwnerDtoInit: CreateOwnerDto = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
  city: "",
  email: "",
  category: 0,
  status: 0,
  notes: "",
  updatedAt: dateInit, // Assurez-vous que dateInit est défini ailleurs
  createdBy: "init",
  createdAt: dateInit,
};
