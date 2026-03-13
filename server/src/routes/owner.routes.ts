import { FastifyInstance } from "fastify";
import { createOwnerController } from "../controllers/owner.controller";

export default async function ownerRoutes(fastify: FastifyInstance) {
  const controller = createOwnerController(fastify);

  // GET /api/owners - List all owners with filters
  fastify.get("/", controller.getAllOwners);

  // GET /api/owners/stats - Get owner statistics
  fastify.get("/stats", controller.getStats);

  // GET /api/owners/phone/:phone - Get owner by phone
  fastify.get("/phone/:phone", controller.getOwnerByPhone);

  // GET /api/owners/:id/details - Get owner with details (motorcycles & invoices)
  fastify.get("/:id/details", controller.getOwnerWithDetails);

  // GET /api/owners/:id - Get owner by ID
  fastify.get("/:id", controller.getOwnerById);

  // POST /api/owners - Create new owner
  fastify.post("/", controller.createOwner);

  // PUT /api/owners/:id - Update owner
  fastify.put("/:id", controller.updateOwner);

  // DELETE /api/owners/:id - Delete owner
  fastify.delete("/:id", controller.deleteOwner);
}
