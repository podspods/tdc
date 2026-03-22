import { FastifyInstance } from "fastify";
import * as rateConfigController from "../controllers/rateConfig.controller";

/**
 * Rate Configuration Routes
 * Base path: /api/rate-config
 */
export default async function rateConfigRoutes(fastify: FastifyInstance) {
  // =====================================================
  // Main Configuration Endpoints
  // =====================================================
  fastify.get("/", rateConfigController.getConfig);
  fastify.put("/", rateConfigController.updateConfig);
  fastify.get("/base-rate", rateConfigController.getBaseRate);
  fastify.put("/base-rate", rateConfigController.updateBaseRate);

  // =====================================================
  // Rate Types CRUD
  // =====================================================
  fastify.get("/rate-types", rateConfigController.getRateTypes);
  fastify.get("/rate-types/:code", rateConfigController.getRateType);
  fastify.post("/rate-types", rateConfigController.createRateType);
  fastify.put("/rate-types/:code", rateConfigController.updateRateType);
  fastify.delete("/rate-types/:code", rateConfigController.deleteRateType);

  // =====================================================
  // Skill Levels CRUD
  // =====================================================
  fastify.get("/skill-levels", rateConfigController.getSkillLevels);
  fastify.get("/skill-levels/:code", rateConfigController.getSkillLevel);
  fastify.post("/skill-levels", rateConfigController.createSkillLevel);
  fastify.put("/skill-levels/:code", rateConfigController.updateSkillLevel);
  fastify.delete("/skill-levels/:code", rateConfigController.deleteSkillLevel);

  // =====================================================
  // Service Categories CRUD
  // =====================================================
  fastify.get("/service-categories", rateConfigController.getServiceCategories);
  fastify.get("/service-categories/:code", rateConfigController.getServiceCategory);
  fastify.post("/service-categories", rateConfigController.createServiceCategory);
  fastify.put("/service-categories/:code", rateConfigController.updateServiceCategory);
  fastify.delete("/service-categories/:code", rateConfigController.deleteServiceCategory);

  // =====================================================
  // Additional Configuration Endpoints
  // =====================================================
  fastify.get("/brand-multipliers", rateConfigController.getBrandMultipliers);
  fastify.put("/brand-multipliers", rateConfigController.updateBrandMultipliers);
  fastify.get("/rounding-rules", rateConfigController.getRoundingRules);
  fastify.put("/rounding-rules", rateConfigController.updateRoundingRules);
  fastify.get("/minimum-charge", rateConfigController.getMinimumChargeRules);
  fastify.put("/minimum-charge", rateConfigController.updateMinimumChargeRules);
  fastify.post("/reload", rateConfigController.reloadConfig);
}
