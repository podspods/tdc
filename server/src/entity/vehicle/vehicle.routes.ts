import { FastifyInstance } from "fastify";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicleInfo,
  getAllVehicles,
  getVehicleById,
  getVehicleByPlate,
  getVehicleInfoById,
  getVehicleInfoByOwnerId,
  updateVehicle,
} from "./vehicle.controller";
import { CreateVehicleDto, VehicleQueryParams } from "./vehicle.types";
import { createVehicle as repCreateVehicle, findVehicleByPlate } from "./vehicle.repository";

export default async function vehicleRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: VehicleQueryParams }>("/", (request, response) =>
    getAllVehicles(fastify, request, response),
  );
  // route GET /api/vehicles/:id/complete

  fastify.get<{ Params: { plate: string } }>("/plate/:plate", (request, response) =>
    getVehicleByPlate(fastify, request, response),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (request, response) =>
    getVehicleById(fastify, request, response),
  );
  fastify.get<{ Querystring: VehicleQueryParams }>("/info", (request, response) =>
    getAllVehicleInfo(fastify, request, response),
  );

  fastify.get<{ Params: { id: string } }>("/info/:id", (request, response) =>
    getVehicleInfoById(fastify, request, response),
  );

  fastify.get<{
    Params: { ownerId: string };
    Querystring: { page?: string; limit?: string };
  }>("/owner/:ownerId", (request, reply) => getVehicleInfoByOwnerId(fastify, request, reply));

  fastify.post<{ Body: CreateVehicleDto }>("/", (request, response) =>
    createVehicle(fastify, request, response),
  );
  fastify.put<{ Params: { id: string }; Body: CreateVehicleDto }>("/:id", (request, response) =>
    updateVehicle(fastify, request, response),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, response) =>
    deleteVehicle(fastify, request, response),
  );

  // POST /api/vehicles/quick
  fastify.post<{
    Body: {
      ownerId: number;
      modelId: number;
      plateNumber: string;
      vintage: number;
      mileage: number;
      color: string;
      createdBy: string;
    };
  }>("/quick", async (request, reply) => {
    const { plateNumber, color, ownerId, createdBy } = request.body;
    // Vérifier si la plaque existe déjà
    const existing = await findVehicleByPlate(fastify, plateNumber);
    if (existing) return reply.send({ success: true, data: existing });
    // Chercher ou créer la marque et le modèle (simplifié – on suppose que brand et model sont des chaînes)
    // Ici on pourrait appeler un service de création de modèle, mais pour l’exemple on stocke directement dans vehicle
    const newVehicle = await repCreateVehicle(fastify, {
      ownerId,
      plateNumber,
      color,
      createdBy,
    });
    return reply.send({ success: true, data: newVehicle });
  });
}
