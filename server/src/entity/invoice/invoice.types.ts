export type Correspondance = {
  id: number;
  subjectCode: number;
  code: number;
  value: string;
  description?: string;
  sortOrder?: number;
  createdAt: string;
};

// POST /api/invoices/full
export type CreateFullInvoiceDto = CreateInvoiceDto & {
  lines: UpdateInvoiceLineDto[];
};
export type Invoice = CreateInvoiceDto & {
  id: number;
  invoiceNumber: string;
  createdAt: string;
  updatedAt: string;
};
export type InvoiceInfo = {
  id: number;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  statusCode: number;
  statusText: string;

  ownerFirstName: string;
  ownerLastName: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleColor: string;
  vehicleplateNumber: string;
};

export type CreateInvoiceDto = UpdateInvoiceDto & {
  createdBy: string;
};

export type UpdateInvoiceDto = {
  garageId: number;
  vehicleId: number;
  issueDate: string;
  dueDate: string;
  statusCode: number;
  notes: string;
};

//--------------------------------------------------------------------------------------------------------------------------

export type InvoiceLine = CreateInvoiceLineDto & {
  id: number;
  amount: number;
  createdAt: string;
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
