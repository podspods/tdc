import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { createBrandService } from "../services/motorcycleBrand.service";
import { CreateBrandDTO, UpdateBrandDTO } from "../types/motorcycleBrand.types";
import { PaginationQuery } from "../types/common.types";

/**
 * Controller functions for handling HTTP requests
 */
export const createBrandController = (fastify: FastifyInstance) => {
  const brandService = createBrandService(fastify);

  /**
   * GET /api/motorcycle-brands
   * Get all brands with pagination
   */
  const getAllBrands = async (
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply,
  ) => {
    try {
      const page = parseInt(request.query.page || "1");
      const limit = parseInt(request.query.limit || "20");

      const result = await brandService.getAllBrands(page, limit);

      reply.send({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
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
  const getBrandById = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const brand = await brandService.getBrandById(id);

      reply.send({
        success: true,
        data: brand,
      });
    } catch (error) {
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
  const getBrandsByCountry = async (
    request: FastifyRequest<{ Querystring: { country: string } }>,
    reply: FastifyReply,
  ) => {
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
    } catch (error) {
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
  const searchBrands = async (
    request: FastifyRequest<{ Querystring: { q: string } }>,
    reply: FastifyReply,
  ) => {
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
    } catch (error) {
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
  const createBrand = async (
    request: FastifyRequest<{ Body: CreateBrandDTO }>,
    reply: FastifyReply,
  ) => {
    try {
      const brand = await brandService.createBrand(request.body);

      reply.status(201).send({
        success: true,
        data: brand,
        message: "Brand created successfully",
      });
    } catch (error) {
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
  const updateBrand = async (
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateBrandDTO }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const brand = await brandService.updateBrand(id, request.body);

      reply.send({
        success: true,
        data: brand,
        message: "Brand updated successfully",
      });
    } catch (error) {
      let status = 500;
      if (error instanceof Error) {
        if (error.message === "Brand not found") status = 404;
        if (error.message === "Brand name already exists") status = 409;
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
  const deleteBrand = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const id = parseInt(request.params.id);
      const result = await brandService.deleteBrand(id);

      reply.send({
        success: true,
        ...result,
      });
    } catch (error) {
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
