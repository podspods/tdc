"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandController = void 0;
const motorcycleBrand_service_1 = require("../services/motorcycleBrand.service");
/**
 * Controller functions for handling HTTP requests
 */
const createBrandController = (fastify) => {
    const brandService = (0, motorcycleBrand_service_1.createBrandService)(fastify);
    /**
     * GET /api/motorcycle-brands
     * Get all brands with pagination
     */
    const getAllBrands = async (request, reply) => {
        try {
            const page = parseInt(request.query.page || "1");
            const limit = parseInt(request.query.limit || "20");
            const result = await brandService.getAllBrands(page, limit);
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
     * GET /api/motorcycle-brands/:id
     * Get brand by ID
     */
    const getBrandById = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const brand = await brandService.getBrandById(id);
            reply.send({
                success: true,
                data: brand,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Brand not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/motorcycle-brands/by-country
     * Get brands by country
     */
    const getBrandsByCountry = async (request, reply) => {
        try {
            const { country } = request.query;
            if (!country) {
                return reply.status(400).send({
                    success: false,
                    error: "Country parameter is required",
                });
            }
            const brands = await brandService.getBrandsByCountry(country);
            reply.send({
                success: true,
                data: brands,
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
     * GET /api/motorcycle-brands/search
     * Search brands by name
     */
    const searchBrands = async (request, reply) => {
        try {
            const { q } = request.query;
            if (!q) {
                return reply.status(400).send({
                    success: false,
                    error: "Search query is required",
                });
            }
            const brands = await brandService.searchBrands(q);
            reply.send({
                success: true,
                data: brands,
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
     * POST /api/motorcycle-brands
     * Create new brand
     */
    const createBrand = async (request, reply) => {
        try {
            const brand = await brandService.createBrand(request.body);
            reply.status(201).send({
                success: true,
                data: brand,
                message: "Brand created successfully",
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Brand already exists" ? 409 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * PUT /api/motorcycle-brands/:id
     * Update brand
     */
    const updateBrand = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const brand = await brandService.updateBrand(id, request.body);
            reply.send({
                success: true,
                data: brand,
                message: "Brand updated successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Brand not found")
                    status = 404;
                if (error.message === "Brand name already exists")
                    status = 409;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/motorcycle-brands/:id
     * Delete brand
     */
    const deleteBrand = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const result = await brandService.deleteBrand(id);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Brand not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
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
exports.createBrandController = createBrandController;
