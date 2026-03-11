import { FastifyInstance } from "fastify";
import { createBrandRepository } from "../repositories/motorcycleBrand.repository";
import { CreateBrandDTO, UpdateBrandDTO } from "../types/motorcycleBrand.types";

/**
 * Service functions for motorcycle brands business logic
 */
export const createBrandService = (fastify: FastifyInstance) => {
  const repository = createBrandRepository(fastify);

  /**
   * Get all brands with pagination
   */
  const getAllBrands = async (page: number = 1, limit: number = 20) => {
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
  const getBrandById = async (id: number) => {
    const brand = await repository.findById(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    return brand;
  };

  /**
   * Get brands by country
   */
  const getBrandsByCountry = async (country: string) => {
    return await repository.findByCountry(country);
  };

  /**
   * Search brands
   */
  const searchBrands = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }
    return await repository.search(searchTerm);
  };

  /**
   * Create new brand
   */
  const createBrand = async (data: CreateBrandDTO) => {
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
  const updateBrand = async (id: number, data: UpdateBrandDTO) => {
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
  const deleteBrand = async (id: number) => {
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

export type BrandService = ReturnType<typeof createBrandService>;
