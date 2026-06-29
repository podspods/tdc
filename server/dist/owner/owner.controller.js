"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOwners = getAllOwners;
exports.getOwnerStats = getOwnerStats;
exports.getOwnerByPhone = getOwnerByPhone;
exports.getOwnerWithDetailsgetOwnerById = getOwnerWithDetailsgetOwnerById;
exports.getOwnerWithDetails = getOwnerWithDetails;
exports.createOwner = createOwner;
exports.updateOwner = updateOwner;
exports.deleteOwner = deleteOwner;
const owner_service_1 = require("./owner.service");
//-------------------------------------------------------------------------------------------------
/**fastify: FastifyInstance
 * GET /api/owners
 */
//-------------------------------------------------------------------------------------------------
async function getAllOwners(fastify, request, reply) {
    try {
        const pageStr = request.query.page ?? 0;
        const params = {
            page: request.query.page ?? 1,
            limit: request.query.limit ?? 20,
            search: request.query.search,
            category: request.query.category,
            city: request.query.city,
            minSpent: request.query.minSpent ?? undefined,
            maxSpent: request.query.maxSpent ?? undefined,
        };
        const result = await (0, owner_service_1._getAllOwners)(fastify, params);
        reply.send({
            success: true,
            data: result.data,
            pagination: result.pagination,
        });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//-------------------------------------------------------------------------------------------------
/**
 * GET /api/owners/stats
 */
//-------------------------------------------------------------------------------------------------
async function getOwnerStats(fastify, request, reply) {
    try {
        const stats = await (0, owner_service_1._getOwnerStats)(fastify);
        reply.send({
            success: true,
            data: stats,
        });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//-------------------------------------------------------------------------------------------------
/**
 * GET /api/owners/phone/:phone
 */
//-------------------------------------------------------------------------------------------------
async function getOwnerByPhone(fastify, request, reply) {
    try {
        const owner = await (0, owner_service_1._getOwnerByPhone)(fastify, request.params.phone);
        reply.send({
            success: true,
            data: owner,
        });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//-------------------------------------------------------------------------------------------------
/**
 * GET /api/owners/:id
 */
//-------------------------------------------------------------------------------------------------
async function getOwnerWithDetailsgetOwnerById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const owner = await (0, owner_service_1._getOwnerById)(fastify, id);
        reply.send({
            success: true,
            data: owner,
        });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//-------------------------------------------------------------------------------------------------
/**
 * GET /api/owners/:id/details
 */
//-------------------------------------------------------------------------------------------------
async function getOwnerWithDetails(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const owner = await (0, owner_service_1._getOwnerWithDetails)(fastify, id);
        reply.send({
            success: true,
            data: owner,
        });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//-------------------------------------------------------------------------------------------------
/**
 * POST /api/owners
 */
//-------------------------------------------------------------------------------------------------
async function createOwner(fastify, request, reply) {
    try {
        const owner = await (0, owner_service_1._createOwner)(fastify, request.body);
        reply.status(201).send({
            success: true,
            data: owner,
            message: "Owner created successfully",
        });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error) {
            if (error.message.includes("already exists"))
                status = 409;
        }
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//-------------------------------------------------------------------------------------------------
/**
 * PUT /api/owners/:id
 */
//-------------------------------------------------------------------------------------------------
async function updateOwner(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const owner = await (0, owner_service_1._updateOwner)(fastify, id, request.body);
        reply.send({
            success: true,
            data: owner,
            message: "Owner updated successfully",
        });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error) {
            if (error.message === "Owner not found")
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
//-------------------------------------------------------------------------------------------------
/**
 * DELETE /api/owners/:id
 */
//-------------------------------------------------------------------------------------------------
async function deleteOwner(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const result = await (0, owner_service_1._deleteOwner)(fastify, id);
        reply.send({
            success: true,
            ...result,
        });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error) {
            if (error.message === "Owner not found")
                status = 404;
            if (error.message.includes("Cannot delete"))
                status = 409;
        }
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
