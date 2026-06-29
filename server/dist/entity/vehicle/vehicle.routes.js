"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = vehicleRoutes;
const vehicle_controller_1 = require("./vehicle.controller");
const vehicle_repository_1 = require("./vehicle.repository");
async function vehicleRoutes(fastify) {
    fastify.get("/", (request, response) => (0, vehicle_controller_1.getAllVehicles)(fastify, request, response));
    // route GET /api/vehicles/:id/complete
    fastify.get("/plate/:plate", (request, response) => (0, vehicle_controller_1.getVehicleByPlate)(fastify, request, response));
    fastify.get("/:id", (request, response) => (0, vehicle_controller_1.getVehicleById)(fastify, request, response));
    fastify.get("/info", (request, response) => (0, vehicle_controller_1.getAllVehicleInfo)(fastify, request, response));
    fastify.get("/info/:id", (request, response) => (0, vehicle_controller_1.getVehicleInfoById)(fastify, request, response));
    fastify.get("/owner/:ownerId", (request, reply) => (0, vehicle_controller_1.getVehicleInfoByOwnerId)(fastify, request, reply));
    fastify.post("/", (request, response) => (0, vehicle_controller_1.createVehicle)(fastify, request, response));
    fastify.put("/:id", (request, response) => (0, vehicle_controller_1.updateVehicle)(fastify, request, response));
    fastify.delete("/:id", (request, response) => (0, vehicle_controller_1.deleteVehicle)(fastify, request, response));
    // POST /api/vehicles/quick
    fastify.post("/quick", async (request, reply) => {
        const { plateNumber, color, ownerId, createdBy } = request.body;
        // Vérifier si la plaque existe déjà
        const existing = await (0, vehicle_repository_1.findVehicleByPlate)(fastify, plateNumber);
        if (existing)
            return reply.send({ success: true, data: existing });
        // Chercher ou créer la marque et le modèle (simplifié – on suppose que brand et model sont des chaînes)
        // Ici on pourrait appeler un service de création de modèle, mais pour l’exemple on stocke directement dans vehicle
        const newVehicle = await (0, vehicle_repository_1.createVehicle)(fastify, {
            ownerId,
            plateNumber,
            color,
            createdBy,
        });
        return reply.send({ success: true, data: newVehicle });
    });
}
