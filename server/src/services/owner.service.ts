import { FastifyInstance } from "fastify";
import { createOwnerRepository } from "../repositories/owner.repository";
import { CreateOwnerDto, UpdateOwnerDto, OwnerQueryParams } from "../types/owner.types";

export const createOwnerService = (fastify: FastifyInstance) => {
  const repository = createOwnerRepository(fastify);

  /**
   * Get all owners with filters
   */
  const getAllOwners = async (params: OwnerQueryParams = {}) => {
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
   * Get owner by ID
   */
  const getOwnerById = async (id: number) => {
    const owner = await repository.findById(id);
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  };

  /**
   * Get owner by phone number (unique)
   */
  const getOwnerByPhone = async (phoneNumber: string) => {
    const owner = await repository.findByPhone(phoneNumber);
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  };

  /**
   * Get owner with details (motorcycles and invoices)
   */
  const getOwnerWithDetails = async (id: number) => {
    const owner = await repository.findWithDetails(id);
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  };

  /**
   * Get statistics
   */
  const getStatistics = async () => {
    return await repository.getStats();
  };

  /**
   * Create new owner
   */
  const createOwner = async (data: CreateOwnerDto) => {
    // Check if phone number already exists
    const existingByPhone = await repository.findByPhone(data.phoneNumber);
    if (existingByPhone) {
      throw new Error("Phone number already exists");
    }

    // Check if email already exists (if provided)
    if (data.email) {
      const existingByEmail = await repository.findByEmail(data.email);
      if (existingByEmail) {
        throw new Error("Email already exists");
      }
    }

    return await repository.create(data);
  };

  /**
   * Update owner
   */
  const updateOwner = async (id: number, data: UpdateOwnerDto) => {
    const owner = await repository.findById(id);
    if (!owner) {
      throw new Error("Owner not found");
    }

    // Check phone number uniqueness if changed
    if (data.phoneNumber && data.phoneNumber !== owner.phoneNumber) {
      const existing = await repository.findByPhone(data.phoneNumber);
      if (existing) {
        throw new Error("Phone number already exists");
      }
    }

    // Check email uniqueness if changed
    if (data.email && data.email !== owner.email) {
      const existing = await repository.findByEmail(data.email);
      if (existing) {
        throw new Error("Email already exists");
      }
    }

    const updated = await repository.update(id, data);
    if (!updated) {
      throw new Error("No fields to update");
    }

    return updated;
  };

  /**
   * Delete owner
   */
  const deleteOwner = async (id: number) => {
    const owner = await repository.findById(id);
    if (!owner) {
      throw new Error("Owner not found");
    }

    // Check if owner has motorcycles or invoices
    if (owner.totalMotorcycles > 0 || owner.totalInvoices > 0) {
      throw new Error("Cannot delete owner with existing motorcycles or invoices");
    }

    const deleted = await repository.delete(id);
    if (!deleted) {
      throw new Error("Failed to delete owner");
    }

    return { message: "Owner deleted successfully" };
  };

  /**
   * Update owner stats (called after adding motorcycle or invoice)
   */
  const refreshStats = async (id: number) => {
    await repository.updateStats(id);
  };

  return {
    getAllOwners,
    getOwnerById,
    getOwnerByPhone,
    getOwnerWithDetails,
    getStatistics,
    createOwner,
    updateOwner,
    deleteOwner,
    refreshStats,
  };
};

export type OwnerService = ReturnType<typeof createOwnerService>;
