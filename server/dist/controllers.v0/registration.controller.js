"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistrationController = void 0;
const registration_service_1 = require("../services/registration.service");
const createRegistrationController = (fastify) => {
    const registrationService = (0, registration_service_1.createRegistrationService)(fastify);
    /**
     * GET /api/registrations
     */
    const getAllRegistrations = async (request, reply) => {
        try {
            const params = {
                page: request.query.page ? parseInt(request.query.page) : 1,
                limit: request.query.limit ? parseInt(request.query.limit) : 20,
                plateNumber: request.query.plateNumber,
                ownerName: request.query.ownerName,
                brandId: request.query.brandId ? parseInt(request.query.brandId) : undefined,
                modelId: request.query.modelId ? parseInt(request.query.modelId) : undefined,
                search: request.query.search,
            };
            const result = await registrationService.getAllRegistrations(params);
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
    };
    /**
     * GET /api/registrations/plate/:plate
     */
    const getRegistrationByPlate = async (request, reply) => {
        try {
            const registration = await registrationService.getRegistrationByPlate(request.params.plate);
            reply.send({
                success: true,
                data: registration,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Registration not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/registrations/:id
     */
    const getRegistrationById = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const registration = await registrationService.getRegistrationById(id);
            reply.send({
                success: true,
                data: registration,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Registration not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/registrations
     */
    const createRegistration = async (request, reply) => {
        try {
            const registration = await registrationService.createRegistration(request.body);
            reply.status(201).send({
                success: true,
                data: registration,
                message: "Registration created successfully",
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
    };
    /**
     * PUT /api/registrations/:id
     */
    const updateRegistration = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const registration = await registrationService.updateRegistration(id, request.body);
            reply.send({
                success: true,
                data: registration,
                message: "Registration updated successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Registration not found")
                    status = 404;
                if (error.message.includes("already exists"))
                    status = 409;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/registrations/:id
     */
    const deleteRegistration = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const result = await registrationService.deleteRegistration(id);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Registration not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    return {
        getAllRegistrations,
        getRegistrationByPlate,
        getRegistrationById,
        createRegistration,
        updateRegistration,
        deleteRegistration,
    };
};
exports.createRegistrationController = createRegistrationController;
