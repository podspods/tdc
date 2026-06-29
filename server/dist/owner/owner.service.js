"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getAllOwners = _getAllOwners;
exports._getOwnerById = _getOwnerById;
exports._getOwnerByPhone = _getOwnerByPhone;
exports._getOwnerWithDetails = _getOwnerWithDetails;
exports._getOwnerStats = _getOwnerStats;
exports._createOwner = _createOwner;
exports._updateOwner = _updateOwner;
exports._deleteOwner = _deleteOwner;
exports._refreshOwnerStats = _refreshOwnerStats;
const owner_repository_1 = require("./owner.repository");
/**
 * Get all owners with filters
 */
async function _getAllOwners(fastify, params = {}) {
    console.log("_getAllOwners params", params);
    const { data, total } = await (0, owner_repository_1.findAll)(fastify, params);
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
async function _getOwnerById(fastify, id) {
    const owner = await (0, owner_repository_1.findById)(fastify, id);
    if (!owner) {
        throw new Error("Owner not found");
    }
    return owner;
}
/**
 * Get owner by phone number (unique)
 */
async function _getOwnerByPhone(fastify, phoneNumber) {
    const owner = await (0, owner_repository_1.findByPhone)(fastify, phoneNumber);
    if (!owner) {
        throw new Error("Owner not found");
    }
    return owner;
}
/**
 * Get owner with details (motorcycles and invoices)
 */
async function _getOwnerWithDetails(fastify, id) {
    const owner = await (0, owner_repository_1.findById)(fastify, id);
    if (!owner) {
        throw new Error("Owner not found");
    }
    return owner;
}
/**
 * Get statistics
 */
async function _getOwnerStats(fastify) {
    return await (0, owner_repository_1.getStats)(fastify);
}
/**
 * Create new owner
 */
async function _createOwner(fastify, data) {
    // Check if phone number already exists
    const existingByPhone = await (0, owner_repository_1.findByPhone)(fastify, data.phoneNumber);
    if (existingByPhone) {
        throw new Error("Phone number already exists");
    }
    // Check if email already exists (if provided)
    if (data.email) {
        const existingByEmail = await (0, owner_repository_1.findByEmail)(fastify, data.email);
        if (existingByEmail) {
            throw new Error("Email already exists");
        }
    }
    return await (0, owner_repository_1.create)(fastify, data);
}
/**
 * Update owner
 */
async function _updateOwner(fastify, id, data) {
    const owner = await (0, owner_repository_1.findById)(fastify, id);
    if (!owner) {
        throw new Error("Owner not found");
    }
    // Check phone number uniqueness if changed
    if (data.phoneNumber && data.phoneNumber !== owner.phoneNumber) {
        const existing = await (0, owner_repository_1.findByPhone)(fastify, data.phoneNumber);
        if (existing) {
            throw new Error("Phone number already exists");
        }
    }
    // Check email uniqueness if changed
    if (data.email && data.email !== owner.email) {
        const existing = await (0, owner_repository_1.findByEmail)(fastify, data.email);
        if (existing) {
            throw new Error("Email already exists");
        }
    }
    const updated = await (0, owner_repository_1.update)(fastify, id, data);
    if (!updated) {
        throw new Error("No fields to update");
    }
    return updated;
}
/**
 * Delete owner
 */
async function _deleteOwner(fastify, id) {
    const owner = await (0, owner_repository_1.findById)(fastify, id);
    if (!owner) {
        throw new Error("Owner not found");
    }
    // Check if owner has motorcycles or invoices
    // if (owner.totalMotorcycles > 0 || owner.totalInvoices > 0) {
    //   throw new Error("Cannot delete owner with existing motorcycles or invoices");
    // }
    const deleted = await (0, owner_repository_1._delete)(fastify, id);
    if (!deleted) {
        throw new Error("Failed to delete owner");
    }
    return { message: "Owner deleted successfully" };
}
/**
 * Update owner stats (called after adding motorcycle or invoice)
 */
async function _refreshOwnerStats(fastify, id) {
    await (0, owner_repository_1.updateStats)(fastify, id);
}
