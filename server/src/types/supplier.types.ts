/**
 * Supplier Types
 */

export interface Supplier {
  supplierId: number;
  supplierCode: string;
  supplierName: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  taxCode?: string;
  paymentTerms?: string;
  deliveryTerms?: string;
  minimumOrder?: number;
  leadTimeDays?: number;
  rating?: number;
  notes?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierDto {
  supplierCode: string;
  supplierName: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  taxCode?: string;
  paymentTerms?: string;
  deliveryTerms?: string;
  minimumOrder?: number;
  leadTimeDays?: number;
  rating?: number;
  notes?: string;
  createdBy: string;
}

export interface UpdateSupplierDto {
  supplierName?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  taxCode?: string;
  paymentTerms?: string;
  deliveryTerms?: string;
  minimumOrder?: number;
  leadTimeDays?: number;
  rating?: number;
  notes?: string;
  isActive?: boolean;
}
