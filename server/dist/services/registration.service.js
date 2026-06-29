"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistrationService = void 0;
const registration_repository_1 = require("../repositories/registration.repository");
const createRegistrationService = (fastify) => {
    const repository = (0, registration_repository_1.createRegistrationRepository)(fastify);
    /**
     * Get all registrations with filters
     */
    const getAllRegistrations = async (params = {}) => {
        const { data, total } = await repository.findAll(params);
        return {
            data,
            pagination: {
                page: params.page || 1,
                limit: params.limit || 20,
                total,
                pages: Math.ceil(total / (params.limit || 20)),
            },
        };
    };
    /**
     * Get registration by ID
     */
    const getRegistrationById = async (id) => {
        const registration = await repository.findById(id);
        if (!registration) {
            throw new Error("Registration not found");
        }
        return registration;
    };
    /**
     * Get registration by plate number (unique key)
     */
    const getRegistrationByPlate = async (plateNumber) => {
        const registration = await repository.findByPlateNumber(plateNumber);
        if (!registration) {
            throw new Error("Registration not found");
        }
        return registration;
    };
    /**
     * Create new registration
     */
    const createRegistration = async (data) => {
        // Check if plate number already exists (unique constraint)
        const existing = await repository.findByPlateNumber(data.plateNumber);
        if (existing) {
            throw new Error("Plate number already exists");
        }
        return await repository.create(data);
    };
    /**
     * Update registration
     */
    const updateRegistration = async (id, data) => {
        const registration = await repository.findById(id);
        if (!registration) {
            throw new Error("Registration not found");
        }
        // Check plate number uniqueness if changed
        if (data.plateNumber && data.plateNumber !== registration.plateNumber) {
            const existing = await repository.findByPlateNumber(data.plateNumber);
            if (existing) {
                throw new Error("Plate number already exists");
            }
        }
        const updated = await repository.update(id, data);
        if (!updated) {
            throw new Error("No fields to update");
        }
        return updated;
    };
    /**
     * Delete registration
     */
    const deleteRegistration = async (id) => {
        const registration = await repository.findById(id);
        if (!registration) {
            throw new Error("Registration not found");
        }
        const deleted = await repository.delete(id);
        if (!deleted) {
            throw new Error("Failed to delete registration");
        }
        return { message: "Registration deleted successfully" };
    };
    return {
        getAllRegistrations,
        getRegistrationById,
        getRegistrationByPlate,
        createRegistration,
        updateRegistration,
        deleteRegistration,
    };
};
exports.createRegistrationService = createRegistrationService;
