import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as brandService from "./brand.service";
import { CreateBrandDto, UpdateBrandDto, BrandQueryParams } from "./brand.types";

type IdParams = { id: string };
type GetAllQuery = BrandQueryParams;

export async function getAllBrands(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
) {
  try {
    const params: BrandQueryParams = {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 20,
      search: request.query.search,
    };
    const result = await brandService.getAllBrands(fastify, params);
    reply.send({ success: true, data: result.data, pagination: result.pagination });
  } catch (error) {
    reply
      .status(500)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function getBrandById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const brand = await brandService.getBrandById(fastify, id);
    reply.send({ success: true, data: brand });
  } catch (error) {
    const status = error instanceof Error && error.message === "Brand not found" ? 404 : 500;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function getBrandByName(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: { name: string } }>,
  reply: FastifyReply,
) {
  try {
    const brand = await brandService.getBrandByName(fastify, request.params.name);
    reply.send({ success: true, data: brand });
  } catch (error) {
    const status = error instanceof Error && error.message === "Brand not found" ? 404 : 500;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function createBrand(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateBrandDto }>,
  reply: FastifyReply,
) {
  try {
    const brand = await brandService.createBrand(fastify, request.body);
    reply.status(201).send({ success: true, data: brand, message: "Brand created successfully" });
  } catch (error) {
    const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function updateBrand(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateBrandDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const brand = await brandService.updateBrand(fastify, id, request.body);
    reply.send({ success: true, data: brand, message: "Brand updated successfully" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Brand not found") status = 404;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}

export async function deleteBrand(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await brandService.deleteBrand(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Brand not found") status = 404;
    reply
      .status(status)
      .send({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
  }
}
