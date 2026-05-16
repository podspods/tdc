import { FastifyInstance } from "fastify";
import * as garageController from "./garage.controller";
import { CreateGarageDto, GarageQueryParams, UpdateGarageDto } from "./garage.types";

export default async function garageRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: GarageQueryParams }>("/", (request, response) =>
    garageController.getAllGarages(fastify, request, response),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (request, response) =>
    garageController.getGarageById(fastify, request, response),
  );
  fastify.post<{ Body: CreateGarageDto }>("/", (request, response) =>
    garageController.createGarage(fastify, request, response),
  );
  fastify.put<{ Params: { id: string }; Body: UpdateGarageDto }>("/:id", (request, response) =>
    garageController.updateGarage(fastify, request, response),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, response) =>
    garageController.deleteGarage(fastify, request, response),
  );
}
