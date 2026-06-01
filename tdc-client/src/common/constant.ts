import type { Correspondance } from "../components/correspondance/types";
import type { CreateGarageDto, Garage, GarageInfo } from "../components/Garage/garage.types";
import type {
  Invoice,
  InvoiceFormLine,
  InvoiceInfo,
  InvoiceLine,
} from "../components/Invoice/invoice.types";
import type { PdfDataHeader } from "../components/Invoice/Pdf.types";
import type { CreateModelDto } from "../components/model/types";
import type {
  CreateOwnerDto,
  Owner,
  OwnerQueryParams,
  OwnerStats,
} from "../components/owner/owner.types";
import type {
  CreateSparePartDto,
  SparePart,
  SparePartStats,
} from "../components/sparePart/sparePart.types";
import type { CreateTaskDto, Task, TaskStats } from "../components/task/task.types";
import type {
  CreateVehicleDto,
  Vehicle,
  VehicleInfo,
  VehicleQueryParams,
  VehicleStats,
} from "../components/vehicle/vehicle.types";

export const SubjectCode = 0;
export const invoiceStatusSubjectCode = 1;
export const salaryPositionSubjectCode = 2;
export const ownerCategorySubjectCode = 3;
export const ownerStatusSubjectCode = 4;
export const lineTypeSubjectCode = 5;

export const qualificationSubjectCode = 10;
export const saleTypeSubjectCode = 200;
export const categoryTaskSubjectCode = 500;
export const subCategoryTaskSubjectCode = 600;
export const brandTaskSubjectCode = 700;

export const headerLine = 1000;
export const totalLine = 1001;

export const iconList: string[] = [
  "🖍",
  "🗑",
  "⚙",
  "❌",
  "➕",
  "✔",
  "🔄",
  "🏍",
  "👨‍💼",
  "🧹",
  "🆕",
  "📞",
  "🏠",
  "🔍",
];
export const GARAGE_NAME = "Tommy''s Ducati CLub";
export const defaulIdGarage = 1;

export const dateInit: Date = new Date(1999, 12, 25);

export const INIT_USER = "init-user";
export const SYSTEM_USER = "system";
export const ADMIN_USER = "admin";

export const DEFAULT_STATS_RESPONSE = {
  success: false,
  total: 42,
  active: 1,
  inactive: 9,
  defaultHeader: { id: "defaultId", name: "defaultName", companyName: "defaultCompagnie" },
};

export const OWNER_DTO_INIT: CreateOwnerDto = {
  firstName: "firstname-init",
  lastName: "lastname init",
  phoneNumber: "00000000",
  email: "email@init.ini",
  address: "addresse init",
  city: "city init",
  category: 0,
  status: 0,
  notes: "note -init",
  createdBy: INIT_USER,
  createdAt: dateInit,
  updatedAt: dateInit,
};
export const OWNER_INIT: Owner = {
  ...OWNER_DTO_INIT,
  id: 0,
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

export const vehicleInit: Vehicle = {
  id: 0,
  plateNumber: "init",
  modelId: 0,
  vintage: new Date().getFullYear(),
  color: "init",
  ownerId: 0,
  mileage: 0,
  createdAt: dateInit,
  updatedAt: dateInit,
  createdBy: INIT_USER,
};

export const STATS_VEHICLE_INIT: VehicleStats = {
  total: 0,
  active: 0,
  inactive: 0,
  blocked: 0,
};

export const VEHICLE_DTO_INIT: CreateVehicleDto = vehicleInit;

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
  createdBy: INIT_USER,
};

export const TASK_DTO_INIT: CreateTaskDto = {
  code: "INIT",
  name: "INIT",
  description: "INIT",
  durationHours: 0,
  skillLevel: 0,
  isActive: false,
  brandId: 0,
  createdBy: INIT_USER,
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
  createdBy: INIT_USER,
  createdAt: dateInit,
  updatedAt: dateInit,
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
  createdBy: INIT_USER,
};

export const invoiceInit: Invoice = {
  id: 0,
  garageId: 0,
  vehicleId: 0,
  invoiceNumber: "invoiceNumber-init",
  issueDate: dateInit,
  dueDate: dateInit,
  statusCode: 0,
  createdBy: INIT_USER,
  createdAt: dateInit,
  updatedAt: dateInit,
  notes: "note-init",
};

export const invoiceFormLineInit: InvoiceFormLine = {
  tempId: Date.now(),
  lineTypeCode: 0,
  description: "-",
  quantity: 0,
  unitPrice: 0,
  discountRate: 0,
  amount: 0,
};

export const garageInfoInit: GarageInfo = {
  name: "TDC Moto Garage",
  logoUrl: "/logo.jpg",
  address: "123 Lê Lợi, Quận 1",
  zipcode: "700000",
  city: "TP. Hồ  Chí Minh",
  phone: "028 1234 5678",
  email: "contact@tdcmoto.com",
  taxCode: "1234567890",
  website: "garage-website.com",
  bankName: "garage-bankName",
  bankAccount: "garage-bankAccount",
  taxRate: 0,
};

export const zgarageInit: Garage = {
  ...garageInfoInit,
  id: 0,
  isActive: false,
  createdBy: INIT_USER,
  createdAt: dateInit,
  updatedAt: dateInit,
};

export const PdfDataHeaderInit: PdfDataHeader = {
  garage: zgarageInit,
  owner: OWNER_INIT,
  vehicle: vehicleInit,
  invoiceNumber: "INVOICE-NUMBER-INIT",
  invoiceDate: dateInit,
};

export const CreateGarageDtoInit: CreateGarageDto = {
  createdBy: INIT_USER,
  isActive: false,
  name: "name-init",
  address: "address-init",
  zipcode: "zipcode-init",
  city: "city_Init",
  phone: "phone-Init",
  email: "email-Init",
  logoUrl: "logoUrl-Init",
  taxCode: "taxCode-Init",
  taxRate: 0,
  website: "website-Init",
  bankName: "bankName-Init",
  bankAccount: "bankAccount-Init",
};

export const correspondanceInit: Correspondance = {
  id: 0,
  createdAt: dateInit,
  createdBy: "init",
  subjectCode: 0,
  code: 0,
  valueStr: "0",
  valueNum: -1,
  description: "O",
  sortOrder: 0,
};

export const modelInit: CreateModelDto = {
  brandId: 0,
  name: "",
  createdBy: "",
  yearStart: undefined,
  yearEnd: undefined,
  isCurrent: false,
  engineDisplacement: undefined,
  engineType: "",
  powerHp: undefined,
  torqueNm: undefined,
  weightKg: undefined,
  fuelCapacityLiters: undefined,
  description: "",
  imageUrl: "",
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
  createdBy: ADMIN_USER,
  createdAt: dateInit,
};

export const ownerInit: Owner = {
  ...createOwnerDtoInit,
  id: 0,
  updatedAt: dateInit,
};

export const garageInit: Garage = {
  name: "init",
  address: "init",
  zipcode: "init",
  city: "init",
  phone: "init",
  email: "init",
  logoUrl: "init",
  taxCode: "init",
  taxRate: 0,
  website: "init",
  bankName: "init",
  bankAccount: "init",
  isActive: false,
  createdBy: "init",
  id: 0,
  createdAt: dateInit,
  updatedAt: dateInit,
};

export const invoiceInfoInit: InvoiceInfo = {
  ...invoiceInit,
  statusText: "init",
  vehicleId: 0,
  ownerId: 0,
  vehicleModelId: 0,
  vehicleBrandId: 0,
  ownerFirstName: "init",
  ownerLastName: "init",
  ownerAddress: "init",
  ownerCity: "init",
  ownerPhone: "init",
  vehicleBrand: "init",
  vehicleModel: "init",
  vehicleColor: "init",
  vehiclePlateNumber: "init",
};

export const ZvehicleQueryParamsInit: VehicleQueryParams = {
  page: 1,
  limit: 1,
  search: "",
  category: 1,
  status: 1,
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

export const vehicleInfoInit: VehicleInfo = {
  ...vehicleInit,
  brandName: "",
  brandCode: "",
  brandId: 0,
  countryOfOrigin: "",
  modelName: "",
  userFirstName: "",
  userLastName: "",
};

export const InvoiceLineInit: InvoiceLine = {
  lineTypeCode: 0,
  description: "init",
  quantity: 0,
  unitPrice: 0,
  discountRate: 0,
  invoiceId: 0,
  id: 0,
  amount: 0,
  createdAt: dateInit,
};
