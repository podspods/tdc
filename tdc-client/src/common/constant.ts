import type { CreateOwnerDto, Owner, OwnerStats } from "../components/owner/owner.types";

export const GARAGE_NAME = "Tommy''s Ducati CLub";

export const DEFAULT_STATS_RESPONSE = {
  success: false,
  total: 42,
  active: 1,
  inactive: 9,
  defaultHeader: { id: "defaultId", name: "defaultName", companyName: "defaultCompagnie" },
};

export const OWNER_INIT: Owner = {
  id: 0,
  firstName: "firstname-init",
  lastName: "lastname init",
  fullName: "fullname init",
  phoneNumber: "00000000",
  email: "email@init.ini",
  address: "addresse init",
  city: "city init",
  category: 0,
  status: 0,
  notes: "note -init",
  totalMotorcycles: 0,
  totalInvoices: 0,
  totalSpent: 0,
  lastVisitDate: "",
  createdAt: "",
  updatedAt: "",
  createdBy: "createdBy init",
};

export const OWNER_DTO_INIT: CreateOwnerDto = {
  firstName: "firstname-init",
  lastName: "lastname init",
  phoneNumber: "00000000",
  email: "email@init.ini",
  address: "addresse init",
  city: "city init",
  category: 0,
  notes: "note -init",
  createdBy: "createdBy init",
};

export const STATS_INIT: OwnerStats = {
  total: 0,
  active: 0,
  inactive: 0,
  blocked: 0,
  byCategory: {
    basic: 0,
    important: 0,
    vip: 0,
    gold: 0,
    platinum: 0,
  },
  totalSpentAll: 0,
  averageSpentPerOwner: 0,
  topCities: [],
};
