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
exports._getAllCosts = _getAllCosts;
exports._getCostById = _getCostById;
exports._getActiveCostByDate = _getActiveCostByDate;
exports._createCost = _createCost;
exports._updateCost = _updateCost;
exports._deleteCost = _deleteCost;
const costRepo = __importStar(require("./repository"));
async function _getAllCosts(fastify, params = {}) {
    const { data, total } = await costRepo.findAllCosts(fastify, params);
    return {
        data,
        pagination: {
            page: params.page || 1,
            limit: params.limit || 20,
            total,
            pages: Math.ceil(total / (params.limit || 20)),
        },
    };
}
async function _getCostById(fastify, id) {
    const cost = await costRepo.findCostById(fastify, id);
    if (!cost)
        throw new Error("Cost record not found");
    return cost;
}
async function _getActiveCostByDate(fastify, date) {
    const cost = await costRepo.findActiveCostByDate(fastify, date);
    if (!cost)
        throw new Error(`No active cost for date ${date}`);
    return cost;
}
async function _createCost(fastify, data) {
    // Validate that effective_date is not in the past? Up to business logic.
    return await costRepo.createCost(fastify, data);
}
async function _updateCost(fastify, id, data) {
    const existing = await costRepo.findCostById(fastify, id);
    if (!existing)
        throw new Error("Cost record not found");
    const updated = await costRepo.updateCost(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function _deleteCost(fastify, id) {
    const existing = await costRepo.findCostById(fastify, id);
    if (!existing)
        throw new Error("Cost record not found");
    const deleted = await costRepo.deleteCost(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete cost");
    return { message: "Cost record deleted successfully" };
}
