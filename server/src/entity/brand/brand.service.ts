import { FastifyInstance } from "fastify";
import * as brandRepo from "./brand.repository";
import { CreateBrandDto, UpdateBrandDto, BrandQueryParams } from "./brand.types";

export async function getAllBrands(fastify: FastifyInstance, params: BrandQueryParams = {}) {
  const { data, total } = await brandRepo.findAllBrands(fastify, params);
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

export async function getBrandById(fastify: FastifyInstance, id: number) {
  const brand = await brandRepo.findBrandById(fastify, id);
  if (!brand) throw new Error("Brand not found");
  return brand;
}

export async function getBrandByName(fastify: FastifyInstance, name: string) {
  const brand = await brandRepo.findBrandByName(fastify, name);
  if (!brand) throw new Error("Brand not found");
  return brand;
}

export async function createBrand(fastify: FastifyInstance, data: CreateBrandDto) {
  const existing = await brandRepo.findBrandByName(fastify, data.name);
  if (existing) throw new Error("Brand name already exists");
  return await brandRepo.createBrand(fastify, data);
}

export async function updateBrand(fastify: FastifyInstance, id: number, data: UpdateBrandDto) {
  const existing = await brandRepo.findBrandById(fastify, id);
  if (!existing) throw new Error("Brand not found");
  const updated = await brandRepo.updateBrand(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function deleteBrand(fastify: FastifyInstance, id: number) {
  const existing = await brandRepo.findBrandById(fastify, id);
  if (!existing) throw new Error("Brand not found");
  const deleted = await brandRepo.deleteBrand(fastify, id);
  if (!deleted) throw new Error("Failed to delete brand");
  return { message: "Brand deleted successfully" };
}
