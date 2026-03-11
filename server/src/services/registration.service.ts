import { FastifyInstance } from "fastify";
import { createRegistrationRepository } from "../repositories/registration.repository";
import {
  CreateRegistrationDto,
  UpdateRegistrationDto,
  RegistrationQueryParams,
} from "../types/registration.types";

export const createRegistrationService = (fastify: FastifyInstance) => {
  const repository = createRegistrationRepository(fastify);

  /**
   * Get all registrations with filters
   */
  const getAllRegistrations = async (params: RegistrationQueryParams = {}) => {
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
  const getRegistrationById = async (id: number) => {
    const registration = await repository.findById(id);
    if (!registration) {
      throw new Error("Registration not found");
    }
    return registration;
  };

  /**
   * Get registration by plate number (unique key)
   */
  const getRegistrationByPlate = async (plateNumber: string) => {
    const registration = await repository.findByPlateNumber(plateNumber);
    if (!registration) {
      throw new Error("Registration not found");
    }
    return registration;
  };

  /**
   * Create new registration
   */
  const createRegistration = async (data: CreateRegistrationDto) => {
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
  const updateRegistration = async (id: number, data: UpdateRegistrationDto) => {
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
  const deleteRegistration = async (id: number) => {
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

export type RegistrationService = ReturnType<typeof createRegistrationService>;
