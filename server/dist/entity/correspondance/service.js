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
exports.getAllCorrespondances = getAllCorrespondances;
exports.getCorrespondanceById = getCorrespondanceById;
exports.getCorrespondanceBySubjectAndCode = getCorrespondanceBySubjectAndCode;
exports.createCorrespondance = createCorrespondance;
exports.updateCorrespondance = updateCorrespondance;
exports.deleteCorrespondance = deleteCorrespondance;
exports.getBySubject = getBySubject;
const repo = __importStar(require("./repository"));
const constant_1 = require("../../common/constant");
async function getAllCorrespondances(fastify, params = {}) {
    const { data, total } = await repo.findAllCorrespondances(fastify, params);
    return {
        data,
        pagination: {
            page: params.page || constant_1.defaultPageNumber,
            limit: params.limit || constant_1.defaultLimit,
            total,
            pages: Math.ceil(total / (params.limit || 20)),
        },
    };
}
async function getCorrespondanceById(fastify, id) {
    const record = await repo.findCorrespondanceById(fastify, id);
    if (!record)
        throw new Error("Correspondance not found");
    return record;
}
async function getCorrespondanceBySubjectAndCode(fastify, subjectCode, code) {
    const record = await repo.findCorrespondanceBySubjectCodeAndCode(fastify, subjectCode, code);
    if (!record)
        throw new Error("Correspondance not found");
    return record;
}
async function createCorrespondance(fastify, data) {
    const existing = await repo.findCorrespondanceBySubjectCodeAndCode(fastify, data.subjectCode, data.code);
    if (existing)
        throw new Error("Correspondance with same subjectCode+code already exists");
    return await repo.createCorrespondance(fastify, data);
}
async function updateCorrespondance(fastify, id, data) {
    const existing = await repo.findCorrespondanceById(fastify, id);
    if (!existing)
        throw new Error("Correspondance not found");
    const updated = await repo.updateCorrespondance(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function deleteCorrespondance(fastify, id) {
    const existing = await repo.findCorrespondanceById(fastify, id);
    if (!existing)
        throw new Error("Correspondance not found");
    const deleted = await repo.deleteCorrespondance(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete");
    return { message: "Correspondance deleted successfully" };
}
async function getBySubject(fastify, subjectCode) {
    return await repo.findBySubject(fastify, subjectCode);
}
