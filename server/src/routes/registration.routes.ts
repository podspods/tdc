import { FastifyInstance } from "fastify";
import { createRegistrationController } from "../controllers/registration.controller";

export default async function registrationRoutes(fastify: FastifyInstance) {
  const controller = createRegistrationController(fastify);

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
