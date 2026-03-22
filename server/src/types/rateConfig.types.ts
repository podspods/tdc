/**
 * Rate Configuration Types
 */

export interface BaseRate {
  value: number;
  currency: string;
  description: string;
}

export interface RateTypeConfig {
  code: string;
  name: string;
  multiplier: number;
  description: string;
  priority: number;
}

export interface SkillLevelConfig {
  code: string;
  name: string;
  multiplier: number;
  description: string;
  required_years_experience: number;
  hourly_rate: number;
}

export interface ServiceCategoryConfig {
  code: string;
  name: string;
  multiplier: number;
  description: string;
  average_duration_hours: number;
  examples: string[];
}

export interface BrandGroupConfig {
  brands: string[];
  multiplier: number;
  description: string;
}

export interface BrandMultipliersConfig {
  default: {
    multiplier: number;
    description: string;
  };
  premium: BrandGroupConfig;
  luxury: BrandGroupConfig;
  standard: BrandGroupConfig;
  budget: BrandGroupConfig;
  vietnamese: BrandGroupConfig;
}

export interface RoundingRules {
  enabled: boolean;
  nearest: number;
  description: string;
}

export interface MinimumChargeRules {
  enabled: boolean;
  default: number;
  per_category: Record<string, number>;
  description: string;
}

export interface MaximumChargeRules {
  enabled: boolean;
  default: number | null;
  description: string;
}

export interface FormulaConfig {
  description: string;
  expression: string;
  example: string;
}

export interface TimeRoundingRules {
  enabled: boolean;
  increment: number;
  description: string;
}

export interface OvertimeRules {
  enabled: boolean;
  multiplier: number;
  after_hours: number;
  weekend_multiplier: number;
  holiday_multiplier: number;
  description: string;
}

export interface RateConfig {
  version: string;
  description: string;
  baseRate: BaseRate;
  rateTypes: Record<string, RateTypeConfig>;
  skillLevels: Record<string, SkillLevelConfig>;
  serviceCategories: Record<string, ServiceCategoryConfig>;
  brandMultipliers: BrandMultipliersConfig;
  roundingRules: RoundingRules;
  minimumChargeRules: MinimumChargeRules;
  maximumChargeRules: MaximumChargeRules;
  formula: FormulaConfig;
  timeRoundingRules: TimeRoundingRules;
  overtimeRules: OvertimeRules;
}

export interface UpdateRateConfigDto {
  baseRate?: Partial<BaseRate>;
  rateTypes?: Record<string, Partial<RateTypeConfig>>;
  skillLevels?: Record<string, Partial<SkillLevelConfig>>;
  serviceCategories?: Record<string, Partial<ServiceCategoryConfig>>;
  brandMultipliers?: Partial<BrandMultipliersConfig>;
  roundingRules?: Partial<RoundingRules>;
  minimumChargeRules?: Partial<MinimumChargeRules>;
  maximumChargeRules?: Partial<MaximumChargeRules>;
  timeRoundingRules?: Partial<TimeRoundingRules>;
  overtimeRules?: Partial<OvertimeRules>;
}

export interface CreateRateTypeDto {
  code: string;
  name: string;
  multiplier: number;
  description: string;
  priority: number;
}

export interface CreateSkillLevelDto {
  code: string;
  name: string;
  multiplier: number;
  description: string;
  required_years_experience: number;
  hourly_rate: number;
}

export interface CreateServiceCategoryDto {
  code: string;
  name: string;
  multiplier: number;
  description: string;
  average_duration_hours: number;
  examples: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
