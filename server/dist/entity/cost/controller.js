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
exports.getAllCosts = getAllCosts;
exports.getCostById = getCostById;
exports.getActiveCostByDate = getActiveCostByDate;
exports.createCost = createCost;
exports.updateCost = updateCost;
exports.deleteCost = deleteCost;
const costService = __importStar(require("./service"));
async function getAllCosts(fastify, request, reply) {
    try {
        const params = {
            page: request.query.page ?? 1,
            limit: request.query.limit ?? 20,
            effectiveDate: request.query.effectiveDate,
        };
        const result = await costService._getAllCosts(fastify, params);
        reply.send({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        reply
            .status(500)
            .send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getCostById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const cost = await costService._getCostById(fastify, id);
        reply.send({ success: true, data: cost });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Cost record not found" ? 404 : 500;
        reply
            .status(status)
            .send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getActiveCostByDate(fastify, request, reply) {
    try {
        const { date } = request.query;
        if (!date) {
            return reply.status(400).send({ success: false, error: "date query parameter is required" });
        }
        const cost = await costService._getActiveCostByDate(fastify, date);
        reply.send({ success: true, data: cost });
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("No active cost") ? 404 : 500;
        reply
            .status(status)
            .send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function createCost(fastify, request, reply) {
    try {
        const cost = await costService._createCost(fastify, request.body);
        reply.status(201).send({ success: true, data: cost, message: "Cost record created" });
    }
    catch (error) {
        reply
            .status(500)
            .send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function updateCost(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const cost = await costService._updateCost(fastify, id, request.body);
        reply.send({ success: true, data: cost, message: "Cost record updated" });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message === "Cost record not found")
            status = 404;
        reply
            .status(status)
            .send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function deleteCost(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const result = await costService._deleteCost(fastify, id);
        reply.send({ success: true, ...result });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message === "Cost record not found")
            status = 404;
        reply
            .status(status)
            .send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
