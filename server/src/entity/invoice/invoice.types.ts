import { dateInit } from "../../common/constant";

export type Correspondance = {
  id: number;
  subjectCode: number;
  code: number;
  value: string;
  description?: string;
  sortOrder?: number;
  createdAt: Date;
};

// POST /api/invoices/full
export type CreateFullInvoiceDto = CreateInvoiceDto & {
  lines: UpdateInvoiceLineDto[];
};
export type Invoice = CreateInvoiceDto & {
  id: number;

  createdAt: Date;
  updatedAt: Date;
};
export type InvoiceInfo = Invoice & {
  statusText: string;
  vehicleId: number;
  ownerId: number;
  vehicleModelId: number;
  vehicleBrandId: number;
  ownerFirstName: string;
  ownerLastName: string;
  ownerAddress: string;
  ownerCity: string;
  ownerPhone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleColor: string;
  vehiclePlateNumber: string;
};

export type CreateInvoiceDto = UpdateInvoiceDto & {
  createdBy: string;
};

export type UpdateInvoiceDto = {
  invoiceNumber: string;
  garageId: number;
  vehicleId: number;
  issueDate: Date;
  dueDate: Date;
  statusCode: number;
  notes: string;
};

//--------------------------------------------------------------------------------------------------------------------------

export type InvoiceLine = CreateInvoiceLineDto & {
  id: number;
  createdAt: Date;
  amount: number;
};

export type CreateInvoiceLineDto = UpdateInvoiceLineDto & {
  invoiceId: number;
};

export type UpdateInvoiceLineDto = {
  lineTypeCode: number;
  description: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
};

export type InvoiceQueryParams = {
  page?: number;
  limit?: number;
  garageId?: number;
  vehicleId?: number;
  statusCode?: number;
  fromDate?: string;
  toDate?: string;
};
export type IdParams = { id: string };
export type LineIdParams = { lineId: string };
export const invoiceInit: Invoice = {
  id: 0,
  garageId: 0,
  vehicleId: 0,
  invoiceNumber: "invoiceNumber-init",
  issueDate: dateInit,
  dueDate: dateInit,
  statusCode: 0,
  createdBy: "Init",
  createdAt: dateInit,
  updatedAt: dateInit,
  notes: "note-init",
};
