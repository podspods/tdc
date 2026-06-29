"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadConfig = exports.updateMinimumChargeRules = exports.getMinimumChargeRules = exports.updateRoundingRules = exports.getRoundingRules = exports.updateBrandMultipliers = exports.getBrandMultipliers = exports.deleteServiceCategory = exports.updateServiceCategory = exports.createServiceCategory = exports.getServiceCategory = exports.getServiceCategories = exports.deleteSkillLevel = exports.updateSkillLevel = exports.createSkillLevel = exports.getSkillLevel = exports.getSkillLevels = exports.deleteRateType = exports.updateRateType = exports.createRateType = exports.getRateType = exports.getRateTypes = exports.updateBaseRate = exports.getBaseRate = exports.updateConfig = exports.getConfig = void 0;
const rateConfig_service_1 = require("../services/rateConfig.service");
/**
 * Rate Configuration Controller
 * Functional approach - no classes
 */
// =====================================================
// Main Configuration Endpoints
// =====================================================
/**
 * GET /api/rate-config - Get full configuration
 */
const getConfig = async (request, reply) => {
    try {
        const config = rateConfig_service_1.rateConfigService.getConfig();
        const response = {
            success: true,
            data: config,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getConfig = getConfig;
/**
 * PUT /api/rate-config - Update full configuration
 */
const updateConfig = async (request, reply) => {
    try {
        const config = rateConfig_service_1.rateConfigService.updateConfig(request.body);
        const response = {
            success: true,
            data: config,
            message: "Configuration updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.updateConfig = updateConfig;
/**
 * GET /api/rate-config/base-rate - Get base rate
 */
const getBaseRate = async (request, reply) => {
    try {
        const baseRate = rateConfig_service_1.rateConfigService.getBaseRate();
        const response = {
            success: true,
            data: baseRate,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getBaseRate = getBaseRate;
/**
 * PUT /api/rate-config/base-rate - Update base rate
 */
const updateBaseRate = async (request, reply) => {
    try {
        const config = rateConfig_service_1.rateConfigService.updateBaseRate(request.body);
        const response = {
            success: true,
            data: config.baseRate,
            message: "Base rate updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.updateBaseRate = updateBaseRate;
// =====================================================
// Rate Types CRUD
// =====================================================
/**
 * GET /api/rate-config/rate-types - Get all rate types
 */
const getRateTypes = async (request, reply) => {
    try {
        const rateTypes = rateConfig_service_1.rateConfigService.getRateTypes();
        const response = {
            success: true,
            data: rateTypes,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getRateTypes = getRateTypes;
/**
 * GET /api/rate-config/rate-types/:code - Get rate type by code
 */
const getRateType = async (request, reply) => {
    try {
        const rateType = rateConfig_service_1.rateConfigService.getRateType(request.params.code);
        if (!rateType) {
            const response = {
                success: false,
                error: "Rate type not found",
            };
            return reply.status(404).send(response);
        }
        const response = {
            success: true,
            data: rateType,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getRateType = getRateType;
/**
 * POST /api/rate-config/rate-types - Create rate type
 */
const createRateType = async (request, reply) => {
    try {
        const rateType = rateConfig_service_1.rateConfigService.createRateType(request.body);
        const response = {
            success: true,
            data: rateType,
            message: "Rate type created successfully",
        };
        reply.status(201).send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.createRateType = createRateType;
/**
 * PUT /api/rate-config/rate-types/:code - Update rate type
 */
const updateRateType = async (request, reply) => {
    try {
        const rateType = rateConfig_service_1.rateConfigService.updateRateType(request.params.code, request.body);
        const response = {
            success: true,
            data: rateType,
            message: "Rate type updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.updateRateType = updateRateType;
/**
 * DELETE /api/rate-config/rate-types/:code - Delete rate type
 */
const deleteRateType = async (request, reply) => {
    try {
        rateConfig_service_1.rateConfigService.deleteRateType(request.params.code);
        const response = {
            success: true,
            message: "Rate type deleted successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.deleteRateType = deleteRateType;
// =====================================================
// Skill Levels CRUD
// =====================================================
/**
 * GET /api/rate-config/skill-levels - Get all skill levels
 */
const getSkillLevels = async (request, reply) => {
    try {
        const skillLevels = rateConfig_service_1.rateConfigService.getSkillLevels();
        const response = {
            success: true,
            data: skillLevels,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getSkillLevels = getSkillLevels;
/**
 * GET /api/rate-config/skill-levels/:code - Get skill level by code
 */
const getSkillLevel = async (request, reply) => {
    try {
        const skillLevel = rateConfig_service_1.rateConfigService.getSkillLevel(request.params.code);
        if (!skillLevel) {
            const response = {
                success: false,
                error: "Skill level not found",
            };
            return reply.status(404).send(response);
        }
        const response = {
            success: true,
            data: skillLevel,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getSkillLevel = getSkillLevel;
/**
 * POST /api/rate-config/skill-levels - Create skill level
 */
const createSkillLevel = async (request, reply) => {
    try {
        const skillLevel = rateConfig_service_1.rateConfigService.createSkillLevel(request.body);
        const response = {
            success: true,
            data: skillLevel,
            message: "Skill level created successfully",
        };
        reply.status(201).send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.createSkillLevel = createSkillLevel;
/**
 * PUT /api/rate-config/skill-levels/:code - Update skill level
 */
const updateSkillLevel = async (request, reply) => {
    try {
        const skillLevel = rateConfig_service_1.rateConfigService.updateSkillLevel(request.params.code, request.body);
        const response = {
            success: true,
            data: skillLevel,
            message: "Skill level updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.updateSkillLevel = updateSkillLevel;
/**
 * DELETE /api/rate-config/skill-levels/:code - Delete skill level
 */
const deleteSkillLevel = async (request, reply) => {
    try {
        rateConfig_service_1.rateConfigService.deleteSkillLevel(request.params.code);
        const response = {
            success: true,
            message: "Skill level deleted successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.deleteSkillLevel = deleteSkillLevel;
// =====================================================
// Service Categories CRUD
// =====================================================
/**
 * GET /api/rate-config/service-categories - Get all service categories
 */
const getServiceCategories = async (request, reply) => {
    try {
        const categories = rateConfig_service_1.rateConfigService.getServiceCategories();
        const response = {
            success: true,
            data: categories,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getServiceCategories = getServiceCategories;
/**
 * GET /api/rate-config/service-categories/:code - Get service category by code
 */
const getServiceCategory = async (request, reply) => {
    try {
        const category = rateConfig_service_1.rateConfigService.getServiceCategory(request.params.code);
        if (!category) {
            const response = {
                success: false,
                error: "Service category not found",
            };
            return reply.status(404).send(response);
        }
        const response = {
            success: true,
            data: category,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getServiceCategory = getServiceCategory;
/**
 * POST /api/rate-config/service-categories - Create service category
 */
const createServiceCategory = async (request, reply) => {
    try {
        const category = rateConfig_service_1.rateConfigService.createServiceCategory(request.body);
        const response = {
            success: true,
            data: category,
            message: "Service category created successfully",
        };
        reply.status(201).send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.createServiceCategory = createServiceCategory;
/**
 * PUT /api/rate-config/service-categories/:code - Update service category
 */
const updateServiceCategory = async (request, reply) => {
    try {
        const category = rateConfig_service_1.rateConfigService.updateServiceCategory(request.params.code, request.body);
        const response = {
            success: true,
            data: category,
            message: "Service category updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.updateServiceCategory = updateServiceCategory;
/**
 * DELETE /api/rate-config/service-categories/:code - Delete service category
 */
const deleteServiceCategory = async (request, reply) => {
    try {
        rateConfig_service_1.rateConfigService.deleteServiceCategory(request.params.code);
        const response = {
            success: true,
            message: "Service category deleted successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
};
exports.deleteServiceCategory = deleteServiceCategory;
// =====================================================
// Additional Configuration Endpoints
// =====================================================
/**
 * GET /api/rate-config/brand-multipliers - Get brand multipliers
 */
const getBrandMultipliers = async (request, reply) => {
    try {
        const brandMultipliers = rateConfig_service_1.rateConfigService.getBrandMultipliers();
        const response = {
            success: true,
            data: brandMultipliers,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getBrandMultipliers = getBrandMultipliers;
/**
 * PUT /api/rate-config/brand-multipliers - Update brand multipliers
 */
const updateBrandMultipliers = async (request, reply) => {
    try {
        const config = rateConfig_service_1.rateConfigService.updateBrandMultipliers(request.body);
        const response = {
            success: true,
            data: config.brandMultipliers,
            message: "Brand multipliers updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.updateBrandMultipliers = updateBrandMultipliers;
/**
 * GET /api/rate-config/rounding-rules - Get rounding rules
 */
const getRoundingRules = async (request, reply) => {
    try {
        const rules = rateConfig_service_1.rateConfigService.getRoundingRules();
        const response = {
            success: true,
            data: rules,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getRoundingRules = getRoundingRules;
/**
 * PUT /api/rate-config/rounding-rules - Update rounding rules
 */
const updateRoundingRules = async (request, reply) => {
    try {
        const config = rateConfig_service_1.rateConfigService.updateRoundingRules(request.body);
        const response = {
            success: true,
            data: config.roundingRules,
            message: "Rounding rules updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.updateRoundingRules = updateRoundingRules;
/**
 * GET /api/rate-config/minimum-charge - Get minimum charge rules
 */
const getMinimumChargeRules = async (request, reply) => {
    try {
        const rules = rateConfig_service_1.rateConfigService.getMinimumChargeRules();
        const response = {
            success: true,
            data: rules,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.getMinimumChargeRules = getMinimumChargeRules;
/**
 * PUT /api/rate-config/minimum-charge - Update minimum charge rules
 */
const updateMinimumChargeRules = async (request, reply) => {
    try {
        const config = rateConfig_service_1.rateConfigService.updateMinimumChargeRules(request.body);
        const response = {
            success: true,
            data: config.minimumChargeRules,
            message: "Minimum charge rules updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.updateMinimumChargeRules = updateMinimumChargeRules;
/**
 * POST /api/rate-config/reload - Reload configuration from file
 */
const reloadConfig = async (request, reply) => {
    try {
        const config = rateConfig_service_1.rateConfigService.reload();
        const response = {
            success: true,
            data: config,
            message: "Configuration reloaded successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
};
exports.reloadConfig = reloadConfig;
