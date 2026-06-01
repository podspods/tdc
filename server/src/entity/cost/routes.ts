import { FastifyInstance } from "fastify";
import * as controller from "./controller";
import { CostQueryParams, CreateCostDto, UpdateCostDto } from "./types";

export default async function costRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: CostQueryParams }>("/", (req, rep) =>
    controller.getAllCosts(fastify, req, rep),
  );
  fastify.get<{ Querystring: { date: string } }>("/active", (req, rep) =>
    controller.getActiveCostByDate(fastify, req, rep),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (req, rep) =>
    controller.getCostById(fastify, req, rep),
  );
  fastify.post<{ Body: CreateCostDto }>("/", (req, rep) =>
    controller.createCost(fastify, req, rep),
  );
  fastify.put<{ Params: { id: string }; Body: UpdateCostDto }>("/:id", (req, rep) =>
    controller.updateCost(fastify, req, rep),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (req, rep) =>
    controller.deleteCost(fastify, req, rep),
  );
}
