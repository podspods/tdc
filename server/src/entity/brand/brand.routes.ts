import { FastifyInstance } from "fastify";
import * as brandController from "./brand.controller";
import { BrandQueryParams, CreateBrandDto, UpdateBrandDto } from "./brand.types";

export default async function brandRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: BrandQueryParams }>("/", (request, reply) =>
    brandController.getAllBrands(fastify, request, reply),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (request, reply) =>
    brandController.getBrandById(fastify, request, reply),
  );
  fastify.get<{ Params: { name: string } }>("/name/:name", (request, reply) =>
    brandController.getBrandByName(fastify, request, reply),
  );
  fastify.post<{ Body: CreateBrandDto }>("/", (request, reply) =>
    brandController.createBrand(fastify, request, reply),
  );
  fastify.put<{ Params: { id: string }; Body: UpdateBrandDto }>("/:id", (request, reply) =>
    brandController.updateBrand(fastify, request, reply),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, reply) =>
    brandController.deleteBrand(fastify, request, reply),
  );
}
