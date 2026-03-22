import { FastifyRequest, FastifyReply } from "fastify";
import { rateConfigService } from "../services/rateConfig.service";
import {
  UpdateRateConfigDto,
  CreateRateTypeDto,
  CreateSkillLevelDto,
  CreateServiceCategoryDto,
  ApiResponse,
} from "../types/rateConfig.types";

// Parameter type definitions
interface Params {
  code: string;
}

interface IdParams {
  id: string;
}

interface UpdateBaseRateBody {
  value?: number;
  currency?: string;
  description?: string;
}

interface UpdateBrandMultipliersBody {
  default?: { multiplier: number; description: string };
  premium?: { brands: string[]; multiplier: number; description: string };
  luxury?: { brands: string[]; multiplier: number; description: string };
  standard?: { brands: string[]; multiplier: number; description: string };
  budget?: { brands: string[]; multiplier: number; description: string };
  vietnamese?: { brands: string[]; multiplier: number; description: string };
}

interface UpdateRoundingRulesBody {
  enabled?: boolean;
  nearest?: number;
  description?: string;
}

interface UpdateMinimumChargeRulesBody {
  enabled?: boolean;
  default?: number;
  per_category?: Record<string, number>;
  description?: string;
}

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
export const getConfig = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const config = rateConfigService.getConfig();
    const response: ApiResponse = {
      success: true,
      data: config,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * PUT /api/rate-config - Update full configuration
 */
export const updateConfig = async (
  request: FastifyRequest<{ Body: UpdateRateConfigDto }>,
  reply: FastifyReply,
) => {
  try {
    const config = rateConfigService.updateConfig(request.body);
    const response: ApiResponse = {
      success: true,
      data: config,
      message: "Configuration updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * GET /api/rate-config/base-rate - Get base rate
 */
export const getBaseRate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const baseRate = rateConfigService.getBaseRate();
    const response: ApiResponse = {
      success: true,
      data: baseRate,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * PUT /api/rate-config/base-rate - Update base rate
 */
export const updateBaseRate = async (
  request: FastifyRequest<{ Body: UpdateBaseRateBody }>,
  reply: FastifyReply,
) => {
  try {
    const config = rateConfigService.updateBaseRate(request.body);
    const response: ApiResponse = {
      success: true,
      data: config.baseRate,
      message: "Base rate updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

// =====================================================
// Rate Types CRUD
// =====================================================

/**
 * GET /api/rate-config/rate-types - Get all rate types
 */
export const getRateTypes = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const rateTypes = rateConfigService.getRateTypes();
    const response: ApiResponse = {
      success: true,
      data: rateTypes,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * GET /api/rate-config/rate-types/:code - Get rate type by code
 */
export const getRateType = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) => {
  try {
    const rateType = rateConfigService.getRateType(request.params.code);
    if (!rateType) {
      const response: ApiResponse = {
        success: false,
        error: "Rate type not found",
      };
      return reply.status(404).send(response);
    }
    const response: ApiResponse = {
      success: true,
      data: rateType,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * POST /api/rate-config/rate-types - Create rate type
 */
export const createRateType = async (
  request: FastifyRequest<{ Body: CreateRateTypeDto }>,
  reply: FastifyReply,
) => {
  try {
    const rateType = rateConfigService.createRateType(request.body);
    const response: ApiResponse = {
      success: true,
      data: rateType,
      message: "Rate type created successfully",
    };
    reply.status(201).send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

/**
 * PUT /api/rate-config/rate-types/:code - Update rate type
 */
export const updateRateType = async (
  request: FastifyRequest<{ Params: Params; Body: Partial<CreateRateTypeDto> }>,
  reply: FastifyReply,
) => {
  try {
    const rateType = rateConfigService.updateRateType(request.params.code, request.body);
    const response: ApiResponse = {
      success: true,
      data: rateType,
      message: "Rate type updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

/**
 * DELETE /api/rate-config/rate-types/:code - Delete rate type
 */
export const deleteRateType = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) => {
  try {
    rateConfigService.deleteRateType(request.params.code);
    const response: ApiResponse = {
      success: true,
      message: "Rate type deleted successfully",
    };
    reply.send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

// =====================================================
// Skill Levels CRUD
// =====================================================

/**
 * GET /api/rate-config/skill-levels - Get all skill levels
 */
export const getSkillLevels = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const skillLevels = rateConfigService.getSkillLevels();
    const response: ApiResponse = {
      success: true,
      data: skillLevels,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * GET /api/rate-config/skill-levels/:code - Get skill level by code
 */
export const getSkillLevel = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) => {
  try {
    const skillLevel = rateConfigService.getSkillLevel(request.params.code);
    if (!skillLevel) {
      const response: ApiResponse = {
        success: false,
        error: "Skill level not found",
      };
      return reply.status(404).send(response);
    }
    const response: ApiResponse = {
      success: true,
      data: skillLevel,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * POST /api/rate-config/skill-levels - Create skill level
 */
export const createSkillLevel = async (
  request: FastifyRequest<{ Body: CreateSkillLevelDto }>,
  reply: FastifyReply,
) => {
  try {
    const skillLevel = rateConfigService.createSkillLevel(request.body);
    const response: ApiResponse = {
      success: true,
      data: skillLevel,
      message: "Skill level created successfully",
    };
    reply.status(201).send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

/**
 * PUT /api/rate-config/skill-levels/:code - Update skill level
 */
export const updateSkillLevel = async (
  request: FastifyRequest<{ Params: Params; Body: Partial<CreateSkillLevelDto> }>,
  reply: FastifyReply,
) => {
  try {
    const skillLevel = rateConfigService.updateSkillLevel(request.params.code, request.body);
    const response: ApiResponse = {
      success: true,
      data: skillLevel,
      message: "Skill level updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

/**
 * DELETE /api/rate-config/skill-levels/:code - Delete skill level
 */
export const deleteSkillLevel = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) => {
  try {
    rateConfigService.deleteSkillLevel(request.params.code);
    const response: ApiResponse = {
      success: true,
      message: "Skill level deleted successfully",
    };
    reply.send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

// =====================================================
// Service Categories CRUD
// =====================================================

/**
 * GET /api/rate-config/service-categories - Get all service categories
 */
export const getServiceCategories = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const categories = rateConfigService.getServiceCategories();
    const response: ApiResponse = {
      success: true,
      data: categories,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * GET /api/rate-config/service-categories/:code - Get service category by code
 */
export const getServiceCategory = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) => {
  try {
    const category = rateConfigService.getServiceCategory(request.params.code);
    if (!category) {
      const response: ApiResponse = {
        success: false,
        error: "Service category not found",
      };
      return reply.status(404).send(response);
    }
    const response: ApiResponse = {
      success: true,
      data: category,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * POST /api/rate-config/service-categories - Create service category
 */
export const createServiceCategory = async (
  request: FastifyRequest<{ Body: CreateServiceCategoryDto }>,
  reply: FastifyReply,
) => {
  try {
    const category = rateConfigService.createServiceCategory(request.body);
    const response: ApiResponse = {
      success: true,
      data: category,
      message: "Service category created successfully",
    };
    reply.status(201).send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

/**
 * PUT /api/rate-config/service-categories/:code - Update service category
 */
export const updateServiceCategory = async (
  request: FastifyRequest<{ Params: Params; Body: Partial<CreateServiceCategoryDto> }>,
  reply: FastifyReply,
) => {
  try {
    const category = rateConfigService.updateServiceCategory(request.params.code, request.body);
    const response: ApiResponse = {
      success: true,
      data: category,
      message: "Service category updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

/**
 * DELETE /api/rate-config/service-categories/:code - Delete service category
 */
export const deleteServiceCategory = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) => {
  try {
    rateConfigService.deleteServiceCategory(request.params.code);
    const response: ApiResponse = {
      success: true,
      message: "Service category deleted successfully",
    };
    reply.send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("not found") ? 404 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
};

// =====================================================
// Additional Configuration Endpoints
// =====================================================

/**
 * GET /api/rate-config/brand-multipliers - Get brand multipliers
 */
export const getBrandMultipliers = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const brandMultipliers = rateConfigService.getBrandMultipliers();
    const response: ApiResponse = {
      success: true,
      data: brandMultipliers,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * PUT /api/rate-config/brand-multipliers - Update brand multipliers
 */
export const updateBrandMultipliers = async (
  request: FastifyRequest<{ Body: UpdateBrandMultipliersBody }>,
  reply: FastifyReply,
) => {
  try {
    const config = rateConfigService.updateBrandMultipliers(request.body);
    const response: ApiResponse = {
      success: true,
      data: config.brandMultipliers,
      message: "Brand multipliers updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * GET /api/rate-config/rounding-rules - Get rounding rules
 */
export const getRoundingRules = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const rules = rateConfigService.getRoundingRules();
    const response: ApiResponse = {
      success: true,
      data: rules,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * PUT /api/rate-config/rounding-rules - Update rounding rules
 */
export const updateRoundingRules = async (
  request: FastifyRequest<{ Body: UpdateRoundingRulesBody }>,
  reply: FastifyReply,
) => {
  try {
    const config = rateConfigService.updateRoundingRules(request.body);
    const response: ApiResponse = {
      success: true,
      data: config.roundingRules,
      message: "Rounding rules updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * GET /api/rate-config/minimum-charge - Get minimum charge rules
 */
export const getMinimumChargeRules = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const rules = rateConfigService.getMinimumChargeRules();
    const response: ApiResponse = {
      success: true,
      data: rules,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * PUT /api/rate-config/minimum-charge - Update minimum charge rules
 */
export const updateMinimumChargeRules = async (
  request: FastifyRequest<{ Body: UpdateMinimumChargeRulesBody }>,
  reply: FastifyReply,
) => {
  try {
    const config = rateConfigService.updateMinimumChargeRules(request.body);
    const response: ApiResponse = {
      success: true,
      data: config.minimumChargeRules,
      message: "Minimum charge rules updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};

/**
 * POST /api/rate-config/reload - Reload configuration from file
 */
export const reloadConfig = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const config = rateConfigService.reload();
    const response: ApiResponse = {
      success: true,
      data: config,
      message: "Configuration reloaded successfully",
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
};
