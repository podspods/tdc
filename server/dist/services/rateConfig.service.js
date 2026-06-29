"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateConfigService = exports.createRateConfigService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Rate Configuration Service
 * Handles CRUD operations on the rateConfig.json file
 * Using functional programming approach with closures
 */
// Default configuration
const getDefaultConfig = () => ({
    version: "1.0.0",
    description: "Default configuration - file not found",
    baseRate: {
        value: 500000,
        currency: "VND",
        description: "Base hourly rate in Vietnamese Dong",
    },
    rateTypes: {},
    skillLevels: {},
    serviceCategories: {},
    brandMultipliers: {
        default: { multiplier: 1.0, description: "Default multiplier for all brands" },
        premium: { brands: [], multiplier: 1.3, description: "Premium European brands" },
        luxury: { brands: [], multiplier: 1.5, description: "Luxury American brands" },
        standard: { brands: [], multiplier: 1.0, description: "Standard Japanese brands" },
        budget: { brands: [], multiplier: 0.9, description: "Budget brands" },
        vietnamese: { brands: [], multiplier: 0.95, description: "Vietnamese brands" },
    },
    roundingRules: {
        enabled: true,
        nearest: 1000,
        description: "Round final rate to nearest 1000 VND",
    },
    minimumChargeRules: {
        enabled: true,
        default: 200000,
        per_category: {},
        description: "Minimum charge regardless of time worked",
    },
    maximumChargeRules: {
        enabled: false,
        default: null,
        description: "Maximum charge cap (disabled by default)",
    },
    formula: {
        description: "Rate calculation formula",
        expression: "base_rate * skill_multiplier * category_multiplier * brand_multiplier",
        example: "500000 * 1.2 * 1.5 * 1.3 = 1,170,000 VND",
    },
    timeRoundingRules: {
        enabled: true,
        increment: 0.25,
        description: "Round time to nearest 15 minutes (0.25 hours)",
    },
    overtimeRules: {
        enabled: true,
        multiplier: 1.5,
        after_hours: 18,
        weekend_multiplier: 1.3,
        holiday_multiplier: 2.0,
        description: "Overtime and after-hours rates",
    },
});
/**
 * Create a rate configuration service instance
 */
const createRateConfigService = (configPath) => {
    const serviceConfigPath = configPath || path_1.default.join(__dirname, "../config/rateConfig.json");
    let cachedConfig = null;
    /**
     * Load configuration from file
     */
    const loadConfig = () => {
        try {
            const rawData = fs_1.default.readFileSync(serviceConfigPath, "utf-8");
            const config = JSON.parse(rawData);
            cachedConfig = config;
            return config;
        }
        catch (error) {
            console.error("Failed to load rate configuration:", error);
            const defaultConfig = getDefaultConfig();
            cachedConfig = defaultConfig;
            return defaultConfig;
        }
    };
    /**
     * Save configuration to file
     */
    const saveConfig = (config) => {
        try {
            const data = JSON.stringify(config, null, 2);
            fs_1.default.writeFileSync(serviceConfigPath, data, "utf-8");
            cachedConfig = config;
        }
        catch (error) {
            console.error("Failed to save rate configuration:", error);
            throw new Error("Failed to save rate configuration");
        }
    };
    /**
     * Get configuration (loads if not loaded)
     */
    const getConfigOrLoad = () => {
        if (cachedConfig === null) {
            return loadConfig();
        }
        return cachedConfig;
    };
    // =====================================================
    // Core Configuration Functions
    // =====================================================
    /**
     * Get full configuration
     */
    const getConfig = () => {
        return getConfigOrLoad();
    };
    /**
     * Update configuration
     */
    const updateConfig = (updates) => {
        const config = getConfigOrLoad();
        // Update base rate
        if (updates.baseRate) {
            config.baseRate = { ...config.baseRate, ...updates.baseRate };
        }
        // Update rate types
        if (updates.rateTypes) {
            Object.entries(updates.rateTypes).forEach(([code, updates]) => {
                if (config.rateTypes[code]) {
                    config.rateTypes[code] = { ...config.rateTypes[code], ...updates };
                }
            });
        }
        // Update skill levels
        if (updates.skillLevels) {
            Object.entries(updates.skillLevels).forEach(([code, updates]) => {
                if (config.skillLevels[code]) {
                    config.skillLevels[code] = { ...config.skillLevels[code], ...updates };
                }
            });
        }
        // Update service categories
        if (updates.serviceCategories) {
            Object.entries(updates.serviceCategories).forEach(([code, updates]) => {
                if (config.serviceCategories[code]) {
                    config.serviceCategories[code] = { ...config.serviceCategories[code], ...updates };
                }
            });
        }
        // Update brand multipliers
        if (updates.brandMultipliers) {
            config.brandMultipliers = { ...config.brandMultipliers, ...updates.brandMultipliers };
        }
        // Update rounding rules
        if (updates.roundingRules) {
            config.roundingRules = { ...config.roundingRules, ...updates.roundingRules };
        }
        // Update minimum charge rules
        if (updates.minimumChargeRules) {
            config.minimumChargeRules = { ...config.minimumChargeRules, ...updates.minimumChargeRules };
        }
        // Update maximum charge rules
        if (updates.maximumChargeRules) {
            config.maximumChargeRules = { ...config.maximumChargeRules, ...updates.maximumChargeRules };
        }
        // Update time rounding rules
        if (updates.timeRoundingRules) {
            config.timeRoundingRules = { ...config.timeRoundingRules, ...updates.timeRoundingRules };
        }
        // Update overtime rules
        if (updates.overtimeRules) {
            config.overtimeRules = { ...config.overtimeRules, ...updates.overtimeRules };
        }
        // Update version (increment patch version)
        const versionParts = config.version.split(".");
        versionParts[2] = String(parseInt(versionParts[2]) + 1);
        config.version = versionParts.join(".");
        saveConfig(config);
        return config;
    };
    // =====================================================
    // Base Rate Functions
    // =====================================================
    /**
     * Get base rate
     */
    const getBaseRate = () => {
        return getConfigOrLoad().baseRate;
    };
    /**
     * Update base rate
     */
    const updateBaseRate = (baseRate) => {
        return updateConfig({ baseRate });
    };
    // =====================================================
    // Rate Types Functions
    // =====================================================
    /**
     * Get all rate types
     */
    const getRateTypes = () => {
        return getConfigOrLoad().rateTypes;
    };
    /**
     * Get rate type by code
     */
    const getRateType = (code) => {
        const config = getConfigOrLoad();
        return config.rateTypes[code] || null;
    };
    /**
     * Create new rate type
     */
    const createRateType = (data) => {
        const config = getConfigOrLoad();
        if (config.rateTypes[data.code]) {
            throw new Error(`Rate type with code "${data.code}" already exists`);
        }
        const newRateType = {
            code: data.code,
            name: data.name,
            multiplier: data.multiplier,
            description: data.description,
            priority: data.priority,
        };
        config.rateTypes[data.code] = newRateType;
        saveConfig(config);
        return newRateType;
    };
    /**
     * Update rate type
     */
    const updateRateType = (code, updates) => {
        const config = getConfigOrLoad();
        if (!config.rateTypes[code]) {
            throw new Error(`Rate type with code "${code}" not found`);
        }
        config.rateTypes[code] = { ...config.rateTypes[code], ...updates };
        saveConfig(config);
        return config.rateTypes[code];
    };
    /**
     * Delete rate type
     */
    const deleteRateType = (code) => {
        const config = getConfigOrLoad();
        if (!config.rateTypes[code]) {
            throw new Error(`Rate type with code "${code}" not found`);
        }
        delete config.rateTypes[code];
        saveConfig(config);
        return true;
    };
    // =====================================================
    // Skill Levels Functions
    // =====================================================
    /**
     * Get all skill levels
     */
    const getSkillLevels = () => {
        return getConfigOrLoad().skillLevels;
    };
    /**
     * Get skill level by code
     */
    const getSkillLevel = (code) => {
        const config = getConfigOrLoad();
        return config.skillLevels[code] || null;
    };
    /**
     * Create new skill level
     */
    const createSkillLevel = (data) => {
        const config = getConfigOrLoad();
        if (config.skillLevels[data.code]) {
            throw new Error(`Skill level with code "${data.code}" already exists`);
        }
        const newSkillLevel = {
            code: data.code,
            name: data.name,
            multiplier: data.multiplier,
            description: data.description,
            required_years_experience: data.required_years_experience,
            hourly_rate: data.hourly_rate,
        };
        config.skillLevels[data.code] = newSkillLevel;
        saveConfig(config);
        return newSkillLevel;
    };
    /**
     * Update skill level
     */
    const updateSkillLevel = (code, updates) => {
        const config = getConfigOrLoad();
        if (!config.skillLevels[code]) {
            throw new Error(`Skill level with code "${code}" not found`);
        }
        config.skillLevels[code] = { ...config.skillLevels[code], ...updates };
        saveConfig(config);
        return config.skillLevels[code];
    };
    /**
     * Delete skill level
     */
    const deleteSkillLevel = (code) => {
        const config = getConfigOrLoad();
        if (!config.skillLevels[code]) {
            throw new Error(`Skill level with code "${code}" not found`);
        }
        delete config.skillLevels[code];
        saveConfig(config);
        return true;
    };
    // =====================================================
    // Service Categories Functions
    // =====================================================
    /**
     * Get all service categories
     */
    const getServiceCategories = () => {
        return getConfigOrLoad().serviceCategories;
    };
    /**
     * Get service category by code
     */
    const getServiceCategory = (code) => {
        const config = getConfigOrLoad();
        return config.serviceCategories[code] || null;
    };
    /**
     * Create new service category
     */
    const createServiceCategory = (data) => {
        const config = getConfigOrLoad();
        if (config.serviceCategories[data.code]) {
            throw new Error(`Service category with code "${data.code}" already exists`);
        }
        const newCategory = {
            code: data.code,
            name: data.name,
            multiplier: data.multiplier,
            description: data.description,
            average_duration_hours: data.average_duration_hours,
            examples: data.examples,
        };
        config.serviceCategories[data.code] = newCategory;
        saveConfig(config);
        return newCategory;
    };
    /**
     * Update service category
     */
    const updateServiceCategory = (code, updates) => {
        const config = getConfigOrLoad();
        if (!config.serviceCategories[code]) {
            throw new Error(`Service category with code "${code}" not found`);
        }
        config.serviceCategories[code] = { ...config.serviceCategories[code], ...updates };
        saveConfig(config);
        return config.serviceCategories[code];
    };
    /**
     * Delete service category
     */
    const deleteServiceCategory = (code) => {
        const config = getConfigOrLoad();
        if (!config.serviceCategories[code]) {
            throw new Error(`Service category with code "${code}" not found`);
        }
        delete config.serviceCategories[code];
        saveConfig(config);
        return true;
    };
    // =====================================================
    // Additional Configuration Functions
    // =====================================================
    /**
     * Get brand multipliers
     */
    const getBrandMultipliers = () => {
        return getConfigOrLoad().brandMultipliers;
    };
    /**
     * Update brand multipliers
     */
    const updateBrandMultipliers = (updates) => {
        return updateConfig({ brandMultipliers: updates });
    };
    /**
     * Get rounding rules
     */
    const getRoundingRules = () => {
        return getConfigOrLoad().roundingRules;
    };
    /**
     * Update rounding rules
     */
    const updateRoundingRules = (updates) => {
        return updateConfig({ roundingRules: updates });
    };
    /**
     * Get minimum charge rules
     */
    const getMinimumChargeRules = () => {
        return getConfigOrLoad().minimumChargeRules;
    };
    /**
     * Update minimum charge rules
     */
    const updateMinimumChargeRules = (updates) => {
        return updateConfig({ minimumChargeRules: updates });
    };
    /**
     * Reset configuration to default
     */
    const resetToDefault = (defaultConfig) => {
        saveConfig(defaultConfig);
        return getConfigOrLoad();
    };
    /**
     * Reload configuration from file
     */
    const reload = () => {
        cachedConfig = null;
        return loadConfig();
    };
    return {
        // Core
        getConfig,
        updateConfig,
        reload,
        // Base Rate
        getBaseRate,
        updateBaseRate,
        // Rate Types
        getRateTypes,
        getRateType,
        createRateType,
        updateRateType,
        deleteRateType,
        // Skill Levels
        getSkillLevels,
        getSkillLevel,
        createSkillLevel,
        updateSkillLevel,
        deleteSkillLevel,
        // Service Categories
        getServiceCategories,
        getServiceCategory,
        createServiceCategory,
        updateServiceCategory,
        deleteServiceCategory,
        // Additional
        getBrandMultipliers,
        updateBrandMultipliers,
        getRoundingRules,
        updateRoundingRules,
        getMinimumChargeRules,
        updateMinimumChargeRules,
        resetToDefault,
    };
};
exports.createRateConfigService = createRateConfigService;
// Create singleton instance
exports.rateConfigService = (0, exports.createRateConfigService)();
