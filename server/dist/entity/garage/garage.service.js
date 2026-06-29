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
exports.getAllGarages = getAllGarages;
exports.getGarageById = getGarageById;
exports.createGarage = createGarage;
exports.updateGarage = updateGarage;
exports.deleteGarage = deleteGarage;
const garageRepo = __importStar(require("./garage.repository"));
async function getAllGarages(fastify, params = {}) {
    const { data, total } = await garageRepo.findAllGarages(fastify, params);
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
async function getGarageById(fastify, id) {
    const garage = await garageRepo.findGarageById(fastify, id);
    if (!garage)
        throw new Error("Garage not found");
    return garage;
}
async function createGarage(fastify, data) {
    return await garageRepo.createGarage(fastify, data);
}
async function updateGarage(fastify, id, data) {
    const existing = await garageRepo.findGarageById(fastify, id);
    if (!existing)
        throw new Error("Garage not found");
    const updated = await garageRepo.updateGarage(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function deleteGarage(fastify, id) {
    const existing = await garageRepo.findGarageById(fastify, id);
    if (!existing)
        throw new Error("Garage not found");
    const deleted = await garageRepo.deleteGarage(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete garage");
    return { message: "Garage deleted successfully" };
}
