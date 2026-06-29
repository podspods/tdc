"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rateConfigRoutes;
const rateConfigController = __importStar(require("../controllers/rateConfig.controller"));
/**
 * Rate Configuration Routes
 * Base path: /api/rate-config
 */
async function rateConfigRoutes(fastify) {
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
