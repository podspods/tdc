"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllParts = getAllParts;
exports.getPartById = getPartById;
exports.getPartByCode = getPartByCode;
exports.createPart = createPart;
exports.updatePart = updatePart;
exports.deletePart = deletePart;
const sparePart_service_1 = require("./sparePart.service");
async function getAllParts(fastify, request, reply) {
    try {
        const params = {
            page: request.query.page ?? 1,
            limit: request.query.limit ?? 20,
            search: request.query.search,
            minPrice: request.query.minPrice,
            maxPrice: request.query.maxPrice,
            lowStock: request.query.lowStock,
            isActive: request.query.isActive,
            supplier: request.query.supplier,
        };
        const result = await (0, sparePart_service_1._getAllParts)(fastify, params);
        reply.send({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getPartById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const part = await (0, sparePart_service_1._getPartById)(fastify, id);
        reply.send({ success: true, data: part });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Part not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getPartByCode(fastify, request, reply) {
    try {
        const part = await (0, sparePart_service_1._getPartByCode)(fastify, request.params.code);
        reply.send({ success: true, data: part });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Part not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function createPart(fastify, request, reply) {
    try {
        const part = await (0, sparePart_service_1._createPart)(fastify, request.body);
        reply.status(201).send({ success: true, data: part, message: "Part created successfully" });
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function updatePart(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const part = await (0, sparePart_service_1._updatePart)(fastify, id, request.body);
        reply.send({ success: true, data: part, message: "Part updated successfully" });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error) {
            if (error.message === "Part not found")
                status = 404;
        }
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function deletePart(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const result = await (0, sparePart_service_1._deletePart)(fastify, id);
        reply.send({ success: true, ...result });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Part not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
