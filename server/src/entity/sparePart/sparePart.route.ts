import { FastifyInstance } from "fastify";
import {
  createPart,
  deletePart,
  getAllParts,
  getPartByCode,
  getPartById,
  updatePart,
} from "./sparePart.controller";
import { CreateSparePartDto, SparePartQueryParams, UpdateSparePartDto } from "./sparePart.types";

export default async function sparesponsePartRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: SparePartQueryParams }>("/", (response, responsep) =>
    getAllParts(fastify, response, responsep),
  );
  fastify.get<{ Params: { code: string } }>("/code/:code", (response, responsep) =>
    getPartByCode(fastify, response, responsep),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (response, responsep) =>
    getPartById(fastify, response, responsep),
  );
  fastify.post<{ Body: CreateSparePartDto }>("/", (response, responsep) =>
    createPart(fastify, response, responsep),
  );
  fastify.put<{ Params: { id: string }; Body: UpdateSparePartDto }>("/:id", (response, responsep) =>
    updatePart(fastify, response, responsep),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (response, responsep) =>
    deletePart(fastify, response, responsep),
  );
}
