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
exports._getAllVehicles = _getAllVehicles;
exports._getAllVehicleInfo = _getAllVehicleInfo;
exports._findVehicleInfoByOwnerId = _findVehicleInfoByOwnerId;
exports._getVehicleInfoById = _getVehicleInfoById;
exports._getVehicleById = _getVehicleById;
exports._getVehicleByPlate = _getVehicleByPlate;
exports._createVehicle = _createVehicle;
exports._updateVehicle = _updateVehicle;
exports._deleteVehicle = _deleteVehicle;
const vehicleRepo = __importStar(require("./vehicle.repository"));
async function _getAllVehicles(fastify, params = {}) {
    const { data, total } = await vehicleRepo.findAllVehicles(fastify, params);
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
//--------------------------------------------------------------------------------------------------------------------------
async function _getAllVehicleInfo(fastify, params = {}) {
    const { data, total } = await vehicleRepo.findAllVehicleInfo(fastify, params);
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
//--------------------------------------------------------------------------------------------------------------------------
async function _findVehicleInfoByOwnerId(fastify, ownerId, page, limit) {
    // On réutilise findAllVehicleInfo avec le filtre ownerId
    return vehicleRepo.findAllVehicleInfo(fastify, {
        ownerId, // ← restriction sur le propriétaire
        page: page || 1,
        limit: limit || 0, // 0 = pas de pagination (retourne tous les véhicules du propriétaire)
        // search: undefined, // on ne filtre pas par texte
    });
}
//--------------------------------------------------------------------------------------------------------------------------
async function _getVehicleInfoById(fastify, id) {
    const vehicle = await vehicleRepo.findVehicleInfoById(fastify, id);
    if (!vehicle)
        throw new Error("Vehicle not found");
    return vehicle;
}
async function _getVehicleById(fastify, id) {
    const vehicle = await vehicleRepo.findVehicleById(fastify, id);
    if (!vehicle)
        throw new Error("Vehicle not found");
    return vehicle;
}
async function _getVehicleByPlate(fastify, plate) {
    const vehicle = await vehicleRepo.findVehicleByPlate(fastify, plate);
    if (!vehicle)
        throw new Error("Vehicle not found");
    return vehicle;
}
async function _createVehicle(fastify, data) {
    const existing = await vehicleRepo.findVehicleByPlate(fastify, data.plateNumber);
    if (existing)
        throw new Error("Plate number already exists");
    return await vehicleRepo.createVehicle(fastify, data);
}
async function _updateVehicle(fastify, id, data) {
    const vehicle = await vehicleRepo.findVehicleById(fastify, id);
    if (!vehicle)
        throw new Error("Vehicle not found");
    if (data.plateNumber && data.plateNumber !== vehicle.plateNumber) {
        const existing = await vehicleRepo.findVehicleByPlate(fastify, data.plateNumber);
        if (existing)
            throw new Error("Plate number already exists");
    }
    const updated = await vehicleRepo.updateVehicle(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function _deleteVehicle(fastify, id) {
    const vehicle = await vehicleRepo.findVehicleById(fastify, id);
    if (!vehicle)
        throw new Error("Vehicle not found");
    const deleted = await vehicleRepo.deleteVehicle(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete vehicle");
    return { message: "Vehicle deleted successfully" };
}
