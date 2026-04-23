import { FastifyInstance } from "fastify";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleById,
  getVehicleByPlate,
  updateVehicle,
} from "./vehicle.controller";
import { CreateVehicleDto, VehicleQueryParams } from "./vehicle.types";

export default async function vehicleRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: VehicleQueryParams }>("/", (request, response) =>
    getAllVehicles(fastify, request, response),
  );
  fastify.get<{ Params: { plate: string } }>("/plate/:plate", (request, response) =>
    getVehicleByPlate(fastify, request, response),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (request, response) =>
    getVehicleById(fastify, request, response),
  );
  fastify.post<{ Body: CreateVehicleDto }>("/", (request, response) =>
    createVehicle(fastify, request, response),
  );
  fastify.put<{ Params: { id: string }; Body: CreateVehicleDto }>("/:id", (request, response) =>
    updateVehicle(fastify, request, response),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, response) =>
    deleteVehicle(fastify, request, response),
  );
}
