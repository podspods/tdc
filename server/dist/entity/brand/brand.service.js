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
exports.getAllBrands = getAllBrands;
exports.getBrandById = getBrandById;
exports.getBrandByName = getBrandByName;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
exports.deleteBrand = deleteBrand;
const brandRepo = __importStar(require("./brand.repository"));
async function getAllBrands(fastify, params = {}) {
    const { data, total } = await brandRepo.findAllBrands(fastify, params);
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
async function getBrandById(fastify, id) {
    const brand = await brandRepo.findBrandById(fastify, id);
    if (!brand)
        throw new Error("Brand not found");
    return brand;
}
async function getBrandByName(fastify, name) {
    const brand = await brandRepo.findBrandByName(fastify, name);
    if (!brand)
        throw new Error("Brand not found");
    return brand;
}
async function createBrand(fastify, data) {
    const existing = await brandRepo.findBrandByName(fastify, data.name);
    if (existing)
        throw new Error("Brand name already exists");
    return await brandRepo.createBrand(fastify, data);
}
async function updateBrand(fastify, id, data) {
    const existing = await brandRepo.findBrandById(fastify, id);
    if (!existing)
        throw new Error("Brand not found");
    const updated = await brandRepo.updateBrand(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function deleteBrand(fastify, id) {
    const existing = await brandRepo.findBrandById(fastify, id);
    if (!existing)
        throw new Error("Brand not found");
    const deleted = await brandRepo.deleteBrand(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete brand");
    return { message: "Brand deleted successfully" };
}
