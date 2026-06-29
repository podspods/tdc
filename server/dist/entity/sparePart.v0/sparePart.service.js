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
exports._getAllParts = _getAllParts;
exports._getPartById = _getPartById;
exports._getPartByCode = _getPartByCode;
exports._createPart = _createPart;
exports._updatePart = _updatePart;
exports._deletePart = _deletePart;
const partRepo = __importStar(require("./sparePart.repository"));
async function _getAllParts(fastify, params = {}) {
    const { data, total } = await partRepo.findAllParts(fastify, params);
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
async function _getPartById(fastify, id) {
    const part = await partRepo.findPartById(fastify, id);
    if (!part)
        throw new Error("Part not found");
    return part;
}
async function _getPartByCode(fastify, code) {
    const part = await partRepo.findPartByCode(fastify, code);
    if (!part)
        throw new Error("Part not found");
    return part;
}
async function _createPart(fastify, data) {
    const existing = await partRepo.findPartByCode(fastify, data.code);
    if (existing)
        throw new Error("Part code already exists");
    return await partRepo.createPart(fastify, data);
}
async function _updatePart(fastify, id, data) {
    const part = await partRepo.findPartById(fastify, id);
    if (!part)
        throw new Error("Part not found");
    const updated = await partRepo.updatePart(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function _deletePart(fastify, id) {
    const part = await partRepo.findPartById(fastify, id);
    if (!part)
        throw new Error("Part not found");
    const deleted = await partRepo.deletePart(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete part");
    return { message: "Part deleted successfully" };
}
