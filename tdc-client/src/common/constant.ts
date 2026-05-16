import type { Invoice, InvoiceFormLine } from "../components/Invoice/invoice.types";
import type { CreateOwnerDto, Owner, OwnerStats } from "../components/owner/owner.types";
import type {
  CreateSparePartDto,
  SparePart,
  SparePartStats,
} from "../components/sparePart/sparePart.types";
import type { CreateTaskDto, Task, TaskStats } from "../components/task/task.types";
import type { CreateVehicleDto, Vehicle, VehicleStats } from "../components/vehicle/vehicle.types";

export const GARAGE_NAME = "Tommy''s Ducati CLub";

export const dateInit: Date = new Date(1999, 12, 25);

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
  createdAt: dateInit,
  updatedAt: dateInit,
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
  createdAt: dateInit,
  updatedAt: dateInit,
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

export const VEHICLE_INIT: Vehicle = {
  id: 0,
  plateNumber: "init",
  modelId: 0,
  vintage: new Date().getFullYear(),
  color: "init",
  ownerId: 0,
  mileage: 0,
  createdAt: dateInit,
  updatedAt: dateInit,
  createdBy: "init",
};

export const STATS_VEHICLE_INIT: VehicleStats = {
  total: 0,
  active: 0,
  inactive: 0,
  blocked: 0,
};

export const VEHICLE_DTO_INIT: CreateVehicleDto = VEHICLE_INIT;

export const TASK_INIT: Task = {
  id: 0,
  code: "TASK_INIT",
  name: "TASK_INIT",
  description: "TASK_INIT",
  durationHours: 0, // stocké en quart d’heure (ex: 4 = 1 heure)
  skillLevel: 0, // 0=basic,1=intermediate,2=advanced,3=expert,4=master
  brandId: 0, // 0 = toutes marques
  isActive: false,
  createdAt: dateInit,
  updatedAt: dateInit,
  createdBy: "init",
};

export const TASK_DTO_INIT: CreateTaskDto = {
  code: "INIT",
  name: "INIT",
  description: "INIT",
  durationHours: 0,
  skillLevel: 0,
  brandId: 0,
  createdBy: "INIT",
};

export const STATS_TASK_INIT: TaskStats = {
  total: 0,
  active: 0,
  inactive: 0,
  blocked: 0,
};

export const SPARE_PART_INIT: SparePart = {
  id: 0,
  code: "INIT",
  name: "INIT",
  description: "INIT",
  purchasePrice: 0,
  sellingPrice: 0,
  markupMultiplier: 2,
  stockQuantity: 0,
  supplier: "INIT",
  isActive: 0,
  createdBy: "INIT",
  createdAt: Date(),
  updatedAt: Date(),
};
export const STATS_SPARE_PART_INIT: SparePartStats = {
  total: 0,
  active: 0,
  inactive: 0,
  blocked: 0,
};

export const SPARE_PART_DTO_INIT: CreateSparePartDto = {
  code: "INIT",
  name: "INIT",
  description: "INIT",
  purchasePrice: 0,
  sellingPrice: 0,
  markupMultiplier: 2,
  stockQuantity: 0,
  supplier: "INIT",
  isActive: 0,
  createdBy: "INIT",
};

export const INVOICE_INIT: Invoice = {
  invoiceId: 0,
  garageId: 0,
  vehicleId: 0,
  invoiceNumber: "invoiceNumber-init",
  issueDate: new Date(1975, 4, 30),
  dueDate: new Date(1975, 4, 30),
  statusCode: 0,
  createdBy: "INIT",
  createdAt: new Date(1975, 4, 30),
  updatedAt: new Date(1975, 4, 30),
};

export const invoiceFormLineInit: InvoiceFormLine = {
  tempId: 0,
  lineTypeCode: 0,
  description: "init",
  quantity: 0,
  unitPrice: 0,
  discountRate: 0,
  amount: 0,
};
