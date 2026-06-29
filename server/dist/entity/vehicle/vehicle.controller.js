"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVehicles = getAllVehicles;
exports.getAllVehicleInfo = getAllVehicleInfo;
exports.getVehicleInfoById = getVehicleInfoById;
exports.getVehicleInfoByOwnerId = getVehicleInfoByOwnerId;
exports.getVehicleById = getVehicleById;
exports.getVehicleByPlate = getVehicleByPlate;
exports.createVehicle = createVehicle;
exports.updateVehicle = updateVehicle;
exports.deleteVehicle = deleteVehicle;
const vehicle_service_1 = require("./vehicle.service");
//--------------------------------------------------------------------------------------------------------------------------
async function getAllVehicles(fastify, request, reply) {
    try {
        const params = {
            page: request.query.page ?? 1,
            limit: request.query.limit ?? 20,
            ownerId: request.query.ownerId,
            modelId: request.query.modelId,
            search: request.query.search,
        };
        const result = await (0, vehicle_service_1._getAllVehicles)(fastify, params);
        reply.send({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function getAllVehicleInfo(fastify, request, reply) {
    try {
        const params = {
            page: request.query.page ?? 1,
            limit: request.query.limit ?? 20,
            ownerId: request.query.ownerId,
            modelId: request.query.modelId,
            search: request.query.search,
        };
        const result = await (0, vehicle_service_1._getAllVehicleInfo)(fastify, params);
        reply.send({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function getVehicleInfoById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const vehicle = await (0, vehicle_service_1._getVehicleInfoById)(fastify, id);
        reply.send({ success: true, data: vehicle });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Vehicle not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
// vehicle.controller.ts
async function getVehicleInfoByOwnerId(fastify, request, reply) {
    try {
        const ownerId = parseInt(request.params.ownerId, 10);
        if (isNaN(ownerId)) {
            return reply.status(400).send({ success: false, error: "Invalid ownerId" });
        }
        // Récupérer les paramètres de pagination optionnels depuis la query string
        const page = request.query.page ? parseInt(request.query.page, 10) : 1;
        const limit = request.query.limit ? parseInt(request.query.limit, 10) : 0;
        const result = await (0, vehicle_service_1._findVehicleInfoByOwnerId)(fastify, ownerId, page, limit);
        reply.send({ success: true, data: result.data, total: result.total });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function getVehicleById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const vehicle = await (0, vehicle_service_1._getVehicleById)(fastify, id);
        reply.send({ success: true, data: vehicle });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Vehicle not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function getVehicleByPlate(fastify, request, reply) {
    try {
        const vehicle = await (0, vehicle_service_1._getVehicleByPlate)(fastify, request.params.plate);
        reply.send({ success: true, data: vehicle });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Vehicle not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function createVehicle(fastify, request, reply) {
    try {
        const vehicle = await (0, vehicle_service_1._createVehicle)(fastify, request.body);
        reply
            .status(201)
            .send({ success: true, data: vehicle, message: "Vehicle created successfully" });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message.includes("already exists"))
            status = 409;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function updateVehicle(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const vehicle = await (0, vehicle_service_1._updateVehicle)(fastify, id, request.body);
        reply.send({ success: true, data: vehicle, message: "Vehicle updated successfully" });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error) {
            if (error.message === "Vehicle not found")
                status = 404;
            if (error.message.includes("already exists"))
                status = 409;
        }
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function deleteVehicle(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const result = await (0, vehicle_service_1._deleteVehicle)(fastify, id);
        reply.send({ success: true, ...result });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Vehicle not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
