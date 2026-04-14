import { FastifyInstance } from "fastify";
import { CreateOwnerDto, UpdateOwnerDto, OwnerQueryParams } from "./owner.types";
import {
  _delete,
  create,
  findAll,
  findByEmail,
  findById,
  findByPhone,
  getStats,
  update,
  updateStats,
} from "./owner.repository";

/**
 * Get all owners with filters
 */
export async function _getAllOwners(fastify: FastifyInstance, params: OwnerQueryParams = {}) {
  const { data, total } = await findAll(fastify, params);

  return {
    data,
    pagination: {
      page: params.page || 1,
      limit: params.limit || 20,
      total,
      pages: Math.ceil(total / (params.limit || 20)),
    },
  };
}

/**
 * Get owner by ID
 */
export async function _getOwnerById(fastify: FastifyInstance, id: number) {
  const owner = await findById(fastify, id);

  if (!owner) {
    throw new Error("Owner not found");
  }
  return owner;
}

/**
 * Get owner by phone number (unique)
 */
export async function _getOwnerByPhone(fastify: FastifyInstance, phoneNumber: string) {
  const owner = await findByPhone(fastify, phoneNumber);

  if (!owner) {
    throw new Error("Owner not found");
  }
  return owner;
}

/**
 * Get owner with details (motorcycles and invoices)
 */
export async function _getOwnerWithDetails(fastify: FastifyInstance, id: number) {
  const owner = await findById(fastify, id);

  if (!owner) {
    throw new Error("Owner not found");
  }
  return owner;
}

/**
 * Get statistics
 */
export async function _getOwnerStats(fastify: FastifyInstance) {
  return await getStats(fastify);
}

/**
 * Create new owner
 */
export async function _createOwner(fastify: FastifyInstance, data: CreateOwnerDto) {
  // Check if phone number already exists
  const existingByPhone = await findByPhone(fastify, data.phoneNumber);
  if (existingByPhone) {
    throw new Error("Phone number already exists");
  }

  // Check if email already exists (if provided)
  if (data.email) {
    const existingByEmail = await findByEmail(fastify, data.email);
    if (existingByEmail) {
      throw new Error("Email already exists");
    }
  }

  return await create(fastify, data);
}

/**
 * Update owner
 */
export async function _updateOwner(fastify: FastifyInstance, id: number, data: UpdateOwnerDto) {
  const owner = await findById(fastify, id);

  if (!owner) {
    throw new Error("Owner not found");
  }

  // Check phone number uniqueness if changed
  if (data.phoneNumber && data.phoneNumber !== owner.phoneNumber) {
    const existing = await findByPhone(fastify, data.phoneNumber);
    if (existing) {
      throw new Error("Phone number already exists");
    }
  }

  // Check email uniqueness if changed
  if (data.email && data.email !== owner.email) {
    const existing = await findByEmail(fastify, data.email);
    if (existing) {
      throw new Error("Email already exists");
    }
  }

  const updated = await update(fastify, id, data);
  if (!updated) {
    throw new Error("No fields to update");
  }

  return updated;
}

/**
 * Delete owner
 */
export async function _deleteOwner(fastify: FastifyInstance, id: number) {
  const owner = await findById(fastify, id);

  if (!owner) {
    throw new Error("Owner not found");
  }

  // Check if owner has motorcycles or invoices
  if (owner.totalMotorcycles > 0 || owner.totalInvoices > 0) {
    throw new Error("Cannot delete owner with existing motorcycles or invoices");
  }

  const deleted = await _delete(fastify, id);
  if (!deleted) {
    throw new Error("Failed to delete owner");
  }

  return { message: "Owner deleted successfully" };
}

/**
 * Update owner stats (called after adding motorcycle or invoice)
 */
export async function _refreshOwnerStats(fastify: FastifyInstance, id: number) {
  await updateStats(fastify, id);
}
