// backend/src/entities/partAndLabor/route.ts
import { FastifyInstance } from "fastify";
import * as controller from "./controller";
import type {
  PartAndLaborQueryParams,
  CreatePartAndLaborDto,
  UpdatePartAndLaborDto,
} from "./types";

export default async function partAndLaborRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: PartAndLaborQueryParams }>("/", (request, reply) =>
    controller.getAllPartAndLabor(fastify, request, reply),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (request, reply) =>
    controller.getPartAndLaborById(fastify, request, reply),
  );
  fastify.post<{ Body: CreatePartAndLaborDto }>("/", (request, reply) =>
    controller.createPartAndLabor(fastify, request, reply),
  );
  fastify.put<{ Params: { id: string }; Body: UpdatePartAndLaborDto }>("/:id", (request, reply) =>
    controller.updatePartAndLabor(fastify, request, reply),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, reply) =>
    controller.deletePartAndLabor(fastify, request, reply),
  );
}
