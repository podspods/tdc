export type InvoiceStatus =
  | "draft"
  | "pending"
  | "paid"
  | "partially_paid"
  | "overdue"
  | "cancelled";

export type LaborItem = {
  id: string;
  description: string;
  hours: number;
  ratePerHour: number;
  amount: number;
};

export type PartItem = {
  id: string;
  name: string;
  reference: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export type ConsumableItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
};

export type Payment = {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference: string;
};

export type Owner = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type Vehicle = {
  registrationId: number;
  plateNumber: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  ownerId: number;
  mileage: number;
};

export type GarageInfo = {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxCode: string;
  licenseNumber: string;
};

export type Invoice = {
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  owner: Owner;
  vehicle: Vehicle;
  laborItems: LaborItem[];
  partItems: PartItem[];
  consumableItems: ConsumableItem[];
  payments: Payment[];
  subtotalLabor: number;
  subtotalParts: number;
  subtotalConsumables: number;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  garageInfo: GarageInfo;
  notes: string;
  terms: string;
};

export type InvoiceFormData = {
  ownerId: number;
  registrationId: number;
  issueDate: string;
  dueDate: string;
  taxRate: number;
  notes: string;
  terms: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
