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
exports.getAllPartAndLabor = getAllPartAndLabor;
exports.getPartAndLaborById = getPartAndLaborById;
exports.createPartAndLabor = createPartAndLabor;
exports.updatePartAndLabor = updatePartAndLabor;
exports.deletePartAndLabor = deletePartAndLabor;
const service = __importStar(require("./service"));
async function getAllPartAndLabor(fastify, request, reply) {
    try {
        const result = await service.getAllPartAndLabor(fastify, request.query);
        reply.send({ success: true, data: result.data, total: result.total });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getPartAndLaborById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id, 10);
        const result = await service.getPartAndLaborById(fastify, id);
        if (!result) {
            reply.status(404).send({ success: false, error: "PartAndLabor not found" });
            return;
        }
        reply.send({ success: true, data: result });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function createPartAndLabor(fastify, request, reply) {
    try {
        const result = await service.createPartAndLabor(fastify, request.body);
        reply.status(201).send({ success: true, data: result });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function updatePartAndLabor(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id, 10);
        const result = await service.updatePartAndLabor(fastify, id, request.body);
        if (!result) {
            reply.status(404).send({ success: false, error: "PartAndLabor not found" });
            return;
        }
        reply.send({ success: true, data: result });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function deletePartAndLabor(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id, 10);
        const result = await service.deletePartAndLabor(fastify, id);
        if (!result) {
            reply.status(404).send({ success: false, error: "PartAndLabor not found" });
            return;
        }
        reply.status(204).send();
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
