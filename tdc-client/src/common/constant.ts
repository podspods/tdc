import type { Brand } from "../components/brand/types";
import type { Correspondance } from "../components/correspondance/types";
import type { Cost } from "../components/cost/types";
import type { CreateGarageDto, Garage, GarageInfo } from "../components/garage/garage.types";
import type {
  Invoice,
  InvoiceFormLine,
  InvoiceInfo,
  InvoiceLine,
  SummaryValue,
} from "../components/invoice/types";
import type { InvoiceDisplay } from "../components/invoice/types";
import type { Model, ModelInfo } from "../components/model/types";
import type {
  CreateOwnerDto,
  Owner,
  OwnerInfo,
  OwnerQueryParams,
  OwnerStats,
} from "../components/owner/types";
import type { PartAndLabor, PartAndLaborFilter } from "../components/partAndLabor/types";
import type {
  CreateVehicleDto,
  Vehicle,
  VehicleInfo,
  VehicleQueryParams,
  VehicleStats,
} from "../components/vehicle/types";
import type { ModalIsOpen, OptionValue } from "./commun.types";

export const SubjectCode = 0;
export const invoiceStatusSubjectCode = 1;
export const salaryPositionSubjectCode = 2;
export const ownerCategorySubjectCode = 3;
export const ownerStatusSubjectCode = 4;
export const baseSalarySubjectCode = 6;
export const skillLevelSubjectCode = 10;
export const qualificationSubjectCode = skillLevelSubjectCode;

// export const saleTypeSubjectCode = 200;
export const lineTypeSubjectCode = 101;
export const categoryTaskSubjectCode = 102;
export const subCategoryTaskSubjectCode = 103;
export const brandTaskSubjectCode = 104;

export const headerLine = 1000;
export const totalLine = 1001;

export const taskTypeLine = "TA";
export const sparepartTypeLine = "SP";
export const consumableTypeLine = "CO";
export const saleItemTypeLine = "SA";
export const otherTypeLine = "OT";
export const allBrand = "AL";
export const defaultPlaceHolder = "..";

export const statusCodeDraft = 1;

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
  "⏳",
];
export const GARAGE_NAME = "Tommy''s Ducati CLub";
export const defaulIdGarage = 1;

export const dateInit: Date = new Date(1999, 11, 25);
export const todayDate: Date = new Date();

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

// export const TASK_INIT: Task = {
//   id: 0,
//   code: "TASK_INIT",
//   name: "TASK_INIT",
//   description: "TASK_INIT",
//   durationHours: 0, // stocké en quart d’heure (ex: 4 = 1 heure)
//   skillLevel: 0, // 0=basic,1=intermediate,2=advanced,3=expert,4=master
//   brandId: 0, // 0 = toutes marques
//   isActive: false,
//   createdAt: dateInit,
//   updatedAt: dateInit,
//   createdBy: INIT_USER,
// };

// export const TASK_DTO_INIT: CreateTaskDto = {
//   code: "INIT",
//   name: "INIT",
//   description: "INIT",
//   durationHours: 0,
//   skillLevel: 0,
//   isActive: false,
//   brandId: 0,
//   createdBy: INIT_USER,
// };

// export const STATS_TASK_INIT: TaskStats = {
//   total: 0,
//   active: 0,
//   inactive: 0,
//   blocked: 0,
// };

// export const SPARE_PART_INIT: SparePart = {
//   id: 0,
//   code: "INIT",
//   name: "INIT",
//   description: "INIT",
//   purchasePrice: 0,
//   sellingPrice: 0,
//   markupMultiplier: 2,
//   stockQuantity: 0,
//   supplier: "INIT",
//   isActive: 0,
//   createdBy: INIT_USER,
//   createdAt: dateInit,
//   updatedAt: dateInit,
// };
// export const STATS_SPARE_PART_INIT: SparePartStats = {
//   total: 0,
//   active: 0,
//   inactive: 0,
//   blocked: 0,
// };

// export const SPARE_PART_DTO_INIT: CreateSparePartDto = {
//   code: "INIT",
//   name: "INIT",
//   description: "INIT",
//   purchasePrice: 0,
//   sellingPrice: 0,
//   markupMultiplier: 2,
//   stockQuantity: 0,
//   supplier: "INIT",
//   isActive: 0,
//   createdBy: INIT_USER,
// };

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
  partAndLaborId: 0,
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

// export const PdfDataHeaderInit: PdfDataHeader = {
//   garage: zgarageInit,
//   owner: OWNER_INIT,
//   vehicle: vehicleInit,
//   invoiceNumber: "INVOICE-NUMBER-INIT",
//   invoiceDate: dateInit,
// };

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

export const modelInit: Model = {
  id: 0,
  createdAt: dateInit,
  updatedAt: dateInit,
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
  name: "",
  address: "",
  zipcode: "",
  city: "",
  phone: "",
  email: "",
  logoUrl: "",
  taxCode: "",
  taxRate: 0,
  website: "",
  bankName: "",
  bankAccount: "",
  isActive: false,
  createdBy: "Admin",
  id: 0,
  createdAt: dateInit,
  updatedAt: dateInit,
};

export const invoiceInfoInit: InvoiceInfo = {
  ...invoiceInit,
  statusText: "",
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
export const brandInit: Brand = {
  id: 0,
  name: "init",
  createDate: dateInit,
  code: "0",
  countryOfOrigin: "init",
  createdBy: "init",
};

export const vehicleInfoInit: VehicleInfo = {
  vehicle: vehicleInit,
  brand: brandInit,
  model: modelInit,
  owner: ownerInit,
};

export const InvoiceLineInit: InvoiceLine = {
  lineTypeCode: 0,
  partAndLaborId: 0,
  description: "init",
  quantity: 1,
  unitPrice: 0,
  discountRate: 0,
  invoiceId: 0,
  id: 0,
  amount: 0,
  createdAt: dateInit,
};

export const summaryValueInit: SummaryValue = {
  partandLaborList: [],
  totalPartAndLabor: 0,
  discountList: [],
  totalDiscount: 0,
  totalGross: 0,
  netAmount: 0,
  vat: 0,
};

export const lineTypeInit: Correspondance = {
  subjectCode: 0,
  code: 0,
  valueStr: "init",
  valueNum: 0,
  description: "init",
  sortOrder: 0,
  createdBy: "init",
  id: 0,
  createdAt: dateInit,
};
export const partAndLaborInit: PartAndLabor = {
  id: 0,
  typeLineCode: "",
  categoryCode: "",
  subCategoryCode: "",
  brandCode: "",
  duration: 10,
  skillLevel: 1,
  cost: 10000,
  margin: 200,
  code: "",
  name: "",
  description: "",
  createdAt: dateInit,
  lastTimeUsed: dateInit,
  createdBy: "",
};

export const optionValueInit: OptionValue = {
  label: "",
  value: "",
};

export const partAndLaborFilterInit: PartAndLaborFilter = {
  typeLineCode: "",
  categoryCode: "",
  subCategoryCode: "",
  brandCode: "",
};

export const ownerInfoInit: OwnerInfo = {
  firstName: "firstName init",
  lastName: "lastName init",
  phoneNumber: "+33 1234123412",
  address: "C15/25 address init",
  city: "Thành phố Hồ Chí Minh",
};

export const invoiceDisplayInit: InvoiceDisplay = {
  invoice: invoiceInit,
  invoiceLineList: [],
  lineTypeList: [],
  vehicleInfo: vehicleInfoInit,
  garage: garageInit,
};

export const modalIsOpenInit: ModalIsOpen = {
  owner: false,
  vehicule: false,
  invoiceLine: false,
};

export const costInit: Cost = {
  id: 0,
  name: "cost-init",
  monthlyBase: 0,
  dayWork: 0,
  hourWork: 0,
  effectiveDate: dateInit,
  endDate: null,
  createdAt: dateInit,
  updatedAt: dateInit,
  createdBy: "Init",
};

export const modelInfoInit: ModelInfo = {
  model: modelInit,
  brand: brandInit,
};
