/**
 * Invoice Types
 */

export type InvoiceStatus =
  | "draft"
  | "pending"
  | "paid"
  | "partially_paid"
  | "overdue"
  | "cancelled";

export interface InvoiceLaborItem {
  laborItemId?: number;
  invoiceId: number;
  description: string;
  hours: number;
  ratePerHour: number;
  amount?: number;
  mechanicName?: string;
  notes?: string;
  createdAt?: string;
}

export interface InvoicePartItem {
  partsItemId?: number;
  invoiceId: number;
  partName: string;
  partReference?: string;
  quantity: number;
  unitPrice: number;
  amount?: number;
  supplier?: string;
  warrantyMonths?: number;
  notes?: string;
  createdAt?: string;
}

export interface InvoiceConsumableItem {
  consumableItemId?: number;
  invoiceId: number;
  consumableName: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  amount?: number;
  notes?: string;
  createdAt?: string;
}

export interface InvoicePayment {
  paymentId?: number;
  invoiceId: number;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  notes?: string;
  createdBy?: string;
  createdAt?: string;
}

export interface Invoice {
  invoiceId: number;
  invoiceNumber: string;
  registrationId: number;
  ownerId: number;

  // Dates
  issueDate: string;
  dueDate: string;
  closedDate?: string;

  // Status
  status: InvoiceStatus;

  // Totals
  subtotalLabor: number;
  subtotalParts: number;
  subtotalConsumables: number;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;

  // Payment tracking
  amountPaid: number;
  amountDue: number;

  // Payment details
  paymentMethod?: string;
  paymentReference?: string;
  paymentDate?: string;

  // Notes
  notes?: string;
  internalNotes?: string;

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  // Relations (populated)
  registration?: {
    plateNumber: string;
    brandName: string;
    modelName?: string;
  };
  owner?: {
    firstName: string;
    lastName: string;
    fullName: string;
    phoneNumber: string;
  };

  // Items
  laborItems?: InvoiceLaborItem[];
  partsItems?: InvoicePartItem[];
  consumableItems?: InvoiceConsumableItem[];
  payments?: InvoicePayment[];
}

export interface CreateInvoiceDto {
  registrationId: number;
  ownerId: number;

  issueDate?: string;
  dueDate: string;
  status?: InvoiceStatus;

  taxRate?: number;

  notes?: string;
  internalNotes?: string;

  createdBy: string;

  // Items
  laborItems?: Omit<InvoiceLaborItem, "invoiceId" | "amount">[];
  partsItems?: Omit<InvoicePartItem, "invoiceId" | "amount">[];
  consumableItems?: Omit<InvoiceConsumableItem, "invoiceId" | "amount">[];
}

export interface UpdateInvoiceDto {
  dueDate?: string;
  status?: InvoiceStatus;
  taxRate?: number;
  notes?: string;
  internalNotes?: string;
}

export interface AddLaborItemDto {
  invoiceId: number;
  description: string;
  hours: number;
  ratePerHour: number;
  mechanicName?: string;
  notes?: string;
}

export interface AddPartItemDto {
  invoiceId: number;
  partName: string;
  partReference?: string;
  quantity: number;
  unitPrice: number;
  supplier?: string;
  warrantyMonths?: number;
  notes?: string;
}

export interface AddConsumableItemDto {
  invoiceId: number;
  consumableName: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  notes?: string;
}

export interface AddPaymentDto {
  invoiceId: number;
  amount: number;
  paymentMethod: string;
  reference?: string;
  notes?: string;
  paymentDate?: string;
  createdBy: string;
}

export interface InvoiceQueryParams {
  page?: number;
  limit?: number;
  registrationId?: number;
  ownerId?: number;
  status?: InvoiceStatus;
  fromDate?: string;
  toDate?: string;
  overdue?: boolean;
  search?: string;
}

export interface InvoiceStats {
  totalInvoices: number;
  totalAmount: number;
  totalPaid: number;
  totalDue: number;
  byStatus: Array<{ status: string; count: number; total: number }>;
  overdueCount: number;
  overdueAmount: number;
}
