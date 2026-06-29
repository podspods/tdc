import fs from "fs";
import path from "path";

/**
 * Rate Configuration Loader
 * Loads rate configuration from JSON files
 */

export interface RateConfig {
  version: string;
  description: string;
  baseRate: {
    value: number;
    currency: string;
    description: string;
  };
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

export interface BrandMultipliersConfig {
  default: {
    multiplier: number;
    description: string;
  };
  premium: {
    brands: string[];
    multiplier: number;
    description: string;
  };
  luxury: {
    brands: string[];
    multiplier: number;
    description: string;
  };
  standard: {
    brands: string[];
    multiplier: number;
    description: string;
  };
  budget: {
    brands: string[];
    multiplier: number;
    description: string;
  };
  vietnamese: {
    brands: string[];
    multiplier: number;
    description: string;
  };
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

class RateConfigLoader {
  private config: RateConfig | null = null;
  private configPath: string;

  constructor(configPath?: string) {
    this.configPath = configPath || path.join(__dirname, "rateConfig.json");
  }

  /**
   * Load configuration from JSON file
   */
  loadConfig(): RateConfig {
    if (this.config) {
      return this.config;
    }

    try {
      const rawData = fs.readFileSync(this.configPath, "utf-8");
      const parsed = JSON.parse(rawData);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid configuration format");
      }
      this.config = parsed as RateConfig;
      console.log("✅ Rate configuration loaded successfully");
      return this.config;
    } catch (error) {
      console.error("❌ Failed to load rate configuration:", error);
      throw new Error("Rate configuration file not found or invalid");
    }
  }

  /**
   * Get base rate value
   */
  getBaseRate(): number {
    return this.loadConfig().baseRate.value;
  }

  /**
   * Get multiplier for a specific rate type
   */
  getRateTypeMultiplier(rateType: string): number {
    const config = this.loadConfig();
    const rateTypeConfig = config.rateTypes[rateType];
    return rateTypeConfig ? rateTypeConfig.multiplier : 1.0;
  }

  /**
   * Get multiplier for a specific skill level
   */
  getSkillMultiplier(skillLevel: string): number {
    const config = this.loadConfig();
    const skillConfig = config.skillLevels[skillLevel];
    return skillConfig ? skillConfig.multiplier : 1.0;
  }

  /**
   * Get multiplier for a specific service category
   */
  getServiceCategoryMultiplier(category: string): number {
    const config = this.loadConfig();
    const categoryConfig = config.serviceCategories[category];
    return categoryConfig ? categoryConfig.multiplier : 1.0;
  }

  /**
   * Get multiplier for a specific brand
   */
  getBrandMultiplier(brandName: string): number {
    const config = this.loadConfig();

    // Check premium brands
    if (config.brandMultipliers.premium.brands.includes(brandName)) {
      return config.brandMultipliers.premium.multiplier;
    }

    // Check luxury brands
    if (config.brandMultipliers.luxury.brands.includes(brandName)) {
      return config.brandMultipliers.luxury.multiplier;
    }

    // Check standard brands
    if (config.brandMultipliers.standard.brands.includes(brandName)) {
      return config.brandMultipliers.standard.multiplier;
    }

    // Check budget brands
    if (config.brandMultipliers.budget.brands.includes(brandName)) {
      return config.brandMultipliers.budget.multiplier;
    }

    // Check Vietnamese brands
    if (config.brandMultipliers.vietnamese.brands.includes(brandName)) {
      return config.brandMultipliers.vietnamese.multiplier;
    }

    return config.brandMultipliers.default.multiplier;
  }

  /**
   * Get minimum charge for a service category
   */
  getMinimumCharge(category?: string): number {
    const config = this.loadConfig();

    if (!config.minimumChargeRules.enabled) {
      return 0;
    }

    if (category && config.minimumChargeRules.per_category[category]) {
      return config.minimumChargeRules.per_category[category];
    }

    return config.minimumChargeRules.default;
  }

  /**
   * Round a rate according to rounding rules
   */
  roundRate(rate: number): number {
    const config = this.loadConfig();

    if (!config.roundingRules.enabled) {
      return rate;
    }

    const nearest = config.roundingRules.nearest;
    return Math.round(rate / nearest) * nearest;
  }

  /**
   * Round time according to time rounding rules
   */
  roundTime(hours: number): number {
    const config = this.loadConfig();

    if (!config.timeRoundingRules.enabled) {
      return hours;
    }

    const increment = config.timeRoundingRules.increment;
    return Math.ceil(hours / increment) * increment;
  }

  /**
   * Get overtime multiplier based on hour and day
   */
  getOvertimeMultiplier(hour: number, isWeekend: boolean, isHoliday: boolean): number {
    const config = this.loadConfig();

    if (!config.overtimeRules.enabled) {
      return 1.0;
    }

    if (isHoliday) {
      return config.overtimeRules.holiday_multiplier;
    }

    if (isWeekend) {
      return config.overtimeRules.weekend_multiplier;
    }

    if (hour >= config.overtimeRules.after_hours) {
      return config.overtimeRules.multiplier;
    }

    return 1.0;
  }

  /**
   * Calculate final rate based on all factors
   */
  calculateRate(params: {
    baseRate?: number;
    rateType: string;
    skillLevel?: string;
    serviceCategory?: string;
    brandName?: string;
    hours?: number;
    hour?: number;
    isWeekend?: boolean;
    isHoliday?: boolean;
  }): {
    baseRate: number;
    rateTypeMultiplier: number;
    skillMultiplier: number;
    categoryMultiplier: number;
    brandMultiplier: number;
    overtimeMultiplier: number;
    totalMultiplier: number;
    calculatedRate: number;
    minCharge: number;
    finalRate: number;
  } {
    const baseRate = params.baseRate || this.getBaseRate();
    const rateTypeMultiplier = this.getRateTypeMultiplier(params.rateType);
    const skillMultiplier = params.skillLevel ? this.getSkillMultiplier(params.skillLevel) : 1.0;
    const categoryMultiplier = params.serviceCategory
      ? this.getServiceCategoryMultiplier(params.serviceCategory)
      : 1.0;
    const brandMultiplier = params.brandName ? this.getBrandMultiplier(params.brandName) : 1.0;
    const overtimeMultiplier = this.getOvertimeMultiplier(
      params.hour || 9,
      params.isWeekend || false,
      params.isHoliday || false,
    );

    // Calculate total multiplier
    const totalMultiplier =
      rateTypeMultiplier *
      skillMultiplier *
      categoryMultiplier *
      brandMultiplier *
      overtimeMultiplier;

    // Calculate rate
    let calculatedRate = baseRate * totalMultiplier;

    // Apply time if provided
    if (params.hours) {
      const roundedHours = this.roundTime(params.hours);
      calculatedRate = calculatedRate * roundedHours;
    }

    // Apply minimum charge
    const minCharge = this.getMinimumCharge(params.serviceCategory);
    let finalRate = Math.max(calculatedRate, minCharge);

    // Round final rate
    finalRate = this.roundRate(finalRate);

    return {
      baseRate,
      rateTypeMultiplier,
      skillMultiplier,
      categoryMultiplier,
      brandMultiplier,
      overtimeMultiplier,
      totalMultiplier,
      calculatedRate,
      minCharge,
      finalRate,
    };
  }

  /**
   * Get all skill levels
   */
  getSkillLevels(): Record<string, SkillLevelConfig> {
    return this.loadConfig().skillLevels;
  }

  /**
   * Get all service categories
   */
  getServiceCategories(): Record<string, ServiceCategoryConfig> {
    return this.loadConfig().serviceCategories;
  }

  /**
   * Get all rate types
   */
  getRateTypes(): Record<string, RateTypeConfig> {
    return this.loadConfig().rateTypes;
  }

  /**
   * Reload configuration from file
   */
  reload(): void {
    this.config = null;
    this.loadConfig();
  }
}

// Singleton instance
export const rateConfigLoader = new RateConfigLoader();

export default rateConfigLoader;
