"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateConfigLoader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class RateConfigLoader {
    constructor(configPath) {
        this.config = null;
        this.configPath = configPath || path_1.default.join(__dirname, "rateConfig.json");
    }
    /**
     * Load configuration from JSON file
     */
    loadConfig() {
        if (this.config) {
            return this.config;
        }
        try {
            const rawData = fs_1.default.readFileSync(this.configPath, "utf-8");
            const parsed = JSON.parse(rawData);
            if (!parsed || typeof parsed !== "object") {
                throw new Error("Invalid configuration format");
            }
            this.config = parsed;
            console.log("✅ Rate configuration loaded successfully");
            return this.config;
        }
        catch (error) {
            console.error("❌ Failed to load rate configuration:", error);
            throw new Error("Rate configuration file not found or invalid");
        }
    }
    /**
     * Get base rate value
     */
    getBaseRate() {
        return this.loadConfig().baseRate.value;
    }
    /**
     * Get multiplier for a specific rate type
     */
    getRateTypeMultiplier(rateType) {
        const config = this.loadConfig();
        const rateTypeConfig = config.rateTypes[rateType];
        return rateTypeConfig ? rateTypeConfig.multiplier : 1.0;
    }
    /**
     * Get multiplier for a specific skill level
     */
    getSkillMultiplier(skillLevel) {
        const config = this.loadConfig();
        const skillConfig = config.skillLevels[skillLevel];
        return skillConfig ? skillConfig.multiplier : 1.0;
    }
    /**
     * Get multiplier for a specific service category
     */
    getServiceCategoryMultiplier(category) {
        const config = this.loadConfig();
        const categoryConfig = config.serviceCategories[category];
        return categoryConfig ? categoryConfig.multiplier : 1.0;
    }
    /**
     * Get multiplier for a specific brand
     */
    getBrandMultiplier(brandName) {
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
    getMinimumCharge(category) {
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
    roundRate(rate) {
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
    roundTime(hours) {
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
    getOvertimeMultiplier(hour, isWeekend, isHoliday) {
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
    calculateRate(params) {
        const baseRate = params.baseRate || this.getBaseRate();
        const rateTypeMultiplier = this.getRateTypeMultiplier(params.rateType);
        const skillMultiplier = params.skillLevel ? this.getSkillMultiplier(params.skillLevel) : 1.0;
        const categoryMultiplier = params.serviceCategory
            ? this.getServiceCategoryMultiplier(params.serviceCategory)
            : 1.0;
        const brandMultiplier = params.brandName ? this.getBrandMultiplier(params.brandName) : 1.0;
        const overtimeMultiplier = this.getOvertimeMultiplier(params.hour || 9, params.isWeekend || false, params.isHoliday || false);
        // Calculate total multiplier
        const totalMultiplier = rateTypeMultiplier *
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
    getSkillLevels() {
        return this.loadConfig().skillLevels;
    }
    /**
     * Get all service categories
     */
    getServiceCategories() {
        return this.loadConfig().serviceCategories;
    }
    /**
     * Get all rate types
     */
    getRateTypes() {
        return this.loadConfig().rateTypes;
    }
    /**
     * Reload configuration from file
     */
    reload() {
        this.config = null;
        this.loadConfig();
    }
}
// Singleton instance
exports.rateConfigLoader = new RateConfigLoader();
exports.default = exports.rateConfigLoader;
