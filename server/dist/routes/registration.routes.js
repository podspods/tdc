"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registrationRoutes;
const registration_controller_1 = require("../controllers/registration.controller");
async function registrationRoutes(fastify) {
    const controller = (0, registration_controller_1.createRegistrationController)(fastify);
    // GET /api/registrations - List all registrations with filters
    fastify.get("/", controller.getAllRegistrations);
    // GET /api/registrations/plate/:plate - Get by plate number (unique key)
    fastify.get("/plate/:plate", controller.getRegistrationByPlate);
    // GET /api/registrations/:id - Get by ID
    fastify.get("/:id", controller.getRegistrationById);
    // POST /api/registrations - Create new registration
    fastify.post("/", controller.createRegistration);
    // PUT /api/registrations/:id - Update registration
    fastify.put("/:id", controller.updateRegistration);
    // DELETE /api/registrations/:id - Delete registration
    fastify.delete("/:id", controller.deleteRegistration);
}
