/**
 * Registration Types - Simplified version
 */

export interface Registration {
  registrationId: number;
  plateNumber: string; // Unique key
  ownerName: string;
  ownerPhone?: string;
  ownerEmail?: string;
  color?: string;

  // Relations
  brandId: number;
  modelId?: number | null;

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  // Joined fields
  brandName?: string;
  modelName?: string;
}

export interface CreateRegistrationDto {
  plateNumber: string; // Unique key
  ownerName: string;
  ownerPhone?: string;
  ownerEmail?: string;
  color?: string;

  brandId: number;
  modelId?: number | null;

  createdBy: string;
}

export interface UpdateRegistrationDto {
  plateNumber?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  color?: string;

  brandId?: number;
  modelId?: number | null;
}

export interface RegistrationQueryParams {
  page?: number;
  limit?: number;
  plateNumber?: string;
  ownerName?: string;
  brandId?: number;
  modelId?: number;
  search?: string;
}
