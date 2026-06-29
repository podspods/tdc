"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllModels = getAllModels;
exports.getModelById = getModelById;
exports.getModelsByBrand = getModelsByBrand;
exports.createModel = createModel;
exports.updateModel = updateModel;
exports.deleteModel = deleteModel;
exports.getAllModelInfo = getAllModelInfo;
const model_service_1 = require("./model.service");
async function getAllModels(fastify, request, reply) {
    try {
        const params = {
            page: request.query.page ?? 1,
            limit: request.query.limit ?? 20,
            brandId: request.query.brandId,
            isCurrent: request.query.isCurrent,
            search: request.query.search,
            minYear: request.query.minYear,
            maxYear: request.query.maxYear,
        };
        const result = await (0, model_service_1._getAllModels)(fastify, params);
        reply.send({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getModelById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const model = await (0, model_service_1._getModelById)(fastify, id);
        reply.send({ success: true, data: model });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Model not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getModelsByBrand(fastify, request, reply) {
    try {
        const brandId = parseInt(request.params.brandId);
        const models = await (0, model_service_1._getModelsByBrand)(fastify, brandId);
        reply.send({ success: true, data: models });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function createModel(fastify, request, reply) {
    try {
        const model = await (0, model_service_1._createModel)(fastify, request.body);
        reply.status(201).send({ success: true, data: model, message: "Model created successfully" });
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("duplicate") ? 409 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function updateModel(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const model = await (0, model_service_1._updateModel)(fastify, id, request.body);
        reply.send({ success: true, data: model, message: "Model updated successfully" });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message === "Model not found")
            status = 404;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function deleteModel(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const result = await (0, model_service_1._deleteModel)(fastify, id);
        reply.send({ success: true, ...result });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message === "Model not found")
            status = 404;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getAllModelInfo(fastify, request, reply) {
    try {
        const result = await (0, model_service_1._getAllModelInfo)(fastify, request.query);
        reply.send({
            success: true,
            data: result.data,
            total: result.total,
        });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
