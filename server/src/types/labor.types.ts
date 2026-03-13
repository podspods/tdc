/**
 * Labor (Main d'œuvre) Types
 */

export type LaborCategory = "maintenance" | "repair" | "diagnostic" | "customization";
export type SkillLevel = "basic" | "intermediate" | "advanced" | "expert";

export interface Labor {
  laborId: number;
  laborCode: string;
  laborName: string;
  description?: string;
  category?: LaborCategory;

  // Pricing
  defaultRatePerHour: number;
  estimatedHours?: number;
  minCharge?: number;

  // Skills
  requiredSkillLevel?: SkillLevel;
  requiredCertification?: string;

  // Status
  isActive: boolean;

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLaborDto {
  laborCode: string;
  laborName: string;
  description?: string;
  category?: LaborCategory;
  defaultRatePerHour: number;
  estimatedHours?: number;
  minCharge?: number;
  requiredSkillLevel?: SkillLevel;
  requiredCertification?: string;
  createdBy: string;
}

export interface UpdateLaborDto {
  laborName?: string;
  description?: string;
  category?: LaborCategory;
  defaultRatePerHour?: number;
  estimatedHours?: number;
  minCharge?: number;
  requiredSkillLevel?: SkillLevel;
  requiredCertification?: string;
  isActive?: boolean;
}

export interface LaborQueryParams {
  page?: number;
  limit?: number;
  category?: LaborCategory;
  isActive?: boolean;
  search?: string;
  minRate?: number;
  maxRate?: number;
}
