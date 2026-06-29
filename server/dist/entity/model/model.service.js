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
exports._getAllModels = _getAllModels;
exports._getModelById = _getModelById;
exports._getModelsByBrand = _getModelsByBrand;
exports._createModel = _createModel;
exports._updateModel = _updateModel;
exports._deleteModel = _deleteModel;
exports._getAllModelInfo = _getAllModelInfo;
const modelRepo = __importStar(require("./model.repository"));
async function _getAllModels(fastify, params = {}) {
    const { data, total } = await modelRepo.findAllModels(fastify, params);
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
async function _getModelById(fastify, id) {
    const model = await modelRepo.findModelById(fastify, id);
    if (!model)
        throw new Error("Model not found");
    return model;
}
async function _getModelsByBrand(fastify, brandId) {
    return await modelRepo.findModelsByBrand(fastify, brandId);
}
async function _createModel(fastify, data) {
    // Optionally check for duplicate (brand_id + model_name + year_start) before inserting
    // The unique constraint will catch it, but we can add a friendly check.
    return await modelRepo.createModel(fastify, data);
}
async function _updateModel(fastify, id, data) {
    const existing = await modelRepo.findModelById(fastify, id);
    if (!existing)
        throw new Error("Model not found");
    const updated = await modelRepo.updateModel(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function _deleteModel(fastify, id) {
    const existing = await modelRepo.findModelById(fastify, id);
    if (!existing)
        throw new Error("Model not found");
    const deleted = await modelRepo.deleteModel(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete model");
    return { message: "Model deleted successfully" };
}
async function _getAllModelInfo(fastify, params) {
    return await modelRepo.findAllModelInfo(fastify, params);
}
