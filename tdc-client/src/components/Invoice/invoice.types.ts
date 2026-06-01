export type Invoice = CreateInvoiceDto & {
  id: number;
  invoiceNumber: string;
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
  updatedAt: Date;
  createdBy: string;
};

export type UpdateInvoiceDto = {
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
  amount: number;
  createdAt: Date;
};

export type CreateInvoiceLineDto = UpdateInvoiceLineDto & {
  invoiceId: number;
};

export type CreateInvoiceFormLine = UpdateInvoiceLineDto;

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
  fromDate?: Date;
  toDate?: Date;
};

export type IdParams = { id: string };
export type LineIdParams = { lineId: string };

export type InvoiceFormLine = CreateInvoiceFormLine & {
  tempId: number;
  amount: number;
};

export type FullInvoicePayload = UpdateInvoiceDto & {
  invoiceNumber: string;

  createdBy: string;
  lines: CreateInvoiceFormLine[];
};

export const InvoiceState = {
  InitState: 0,
  View: 1,
  Edit: 2,
  Create: 3,
  ToPdf: 4,
} as const;
export type InvoiceState = (typeof InvoiceState)[keyof typeof InvoiceState];
