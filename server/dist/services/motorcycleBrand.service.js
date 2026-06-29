"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandService = void 0;
const motorcycleBrand_repository_1 = require("../repositories/motorcycleBrand.repository");
/**
 * Service functions for motorcycle brands business logic
 */
const createBrandService = (fastify) => {
    const repository = (0, motorcycleBrand_repository_1.createBrandRepository)(fastify);
    /**
     * Get all brands with pagination
     */
    const getAllBrands = async (page = 1, limit = 20) => {
        const { data, total } = await repository.findAll(page, limit);
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    };
    /**
     * Get brand by ID
     */
    const getBrandById = async (id) => {
        const brand = await repository.findById(id);
        if (!brand) {
            throw new Error("Brand not found");
        }
        return brand;
    };
    /**
     * Get brands by country
     */
    const getBrandsByCountry = async (country) => {
        return await repository.findByCountry(country);
    };
    /**
     * Search brands
     */
    const searchBrands = async (searchTerm) => {
        if (!searchTerm || searchTerm.length < 2) {
            return [];
        }
        return await repository.search(searchTerm);
    };
    /**
     * Create new brand
     */
    const createBrand = async (data) => {
        // Check if brand already exists
        const existing = await repository.findByBrandName(data.brandName);
        if (existing) {
            throw new Error("Brand already exists");
        }
        return await repository.create(data);
    };
    /**
     * Update existing brand
     */
    const updateBrand = async (id, data) => {
        const brand = await repository.findById(id);
        if (!brand) {
            throw new Error("Brand not found");
        }
        // Check if new brand name already exists (if updating name)
        if (data.brandName && data.brandName !== brand.brandName) {
            const existing = await repository.findByBrandName(data.brandName);
            if (existing) {
                throw new Error("Brand name already exists");
            }
        }
        const updated = await repository.update(id, data);
        if (!updated) {
            throw new Error("No fields to update");
        }
        return updated;
    };
    /**
     * Delete brand
     */
    const deleteBrand = async (id) => {
        const brand = await repository.findById(id);
        if (!brand) {
            throw new Error("Brand not found");
        }
        const deleted = await repository.delete(id);
        if (!deleted) {
            throw new Error("Failed to delete brand");
        }
        return { message: "Brand deleted successfully" };
    };
    return {
        getAllBrands,
        getBrandById,
        getBrandsByCountry,
        searchBrands,
        createBrand,
        updateBrand,
        deleteBrand,
    };
};
exports.createBrandService = createBrandService;
