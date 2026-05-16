import { FastifyInstance } from "fastify";
import { CreateModelDto, ModelQueryParams, UpdateModelDto } from "./model.types";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  getModelsByBrand,
  updateModel,
} from "./model.controller";

export default async function modelRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: ModelQueryParams }>("/", (request, reply) =>
    getAllModels(fastify, request, reply),
  );
  fastify.get<{ Params: { brandId: string } }>("/brand/:brandId", (request, reply) =>
    getModelsByBrand(fastify, request, reply),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (request, reply) =>
    getModelById(fastify, request, reply),
  );
  fastify.post<{ Body: CreateModelDto }>("/", (request, reply) =>
    createModel(fastify, request, reply),
  );
  fastify.put<{ Params: { id: string }; Body: UpdateModelDto }>("/:id", (request, reply) =>
    updateModel(fastify, request, reply),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, reply) =>
    deleteModel(fastify, request, reply),
  );
}
