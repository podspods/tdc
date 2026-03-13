export type LaborCategory = "maintenance" | "repair" | "diagnostic" | "customization";
export type SkillLevel = "basic" | "intermediate" | "advanced" | "expert";

export interface Labor {
  laborId: number;
  laborCode: string;
  laborName: string;
  description?: string;
  category?: LaborCategory;
  defaultRatePerHour: number;
  estimatedHours?: number;
  minCharge?: number;
  requiredSkillLevel?: SkillLevel;
  requiredCertification?: string;
  isActive: boolean;
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

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
