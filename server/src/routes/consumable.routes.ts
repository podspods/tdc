import { FastifyInstance } from "fastify";
import { createConsumableController } from "../controllers/consumable.controller";

/**
 * Consumable Routes
 * Base path: /api/consumables
 */
export default async function consumableRoutes(fastify: FastifyInstance) {
  const controller = createConsumableController(fastify);

  // GET /api/consumables - Get all consumables with filters
  fastify.get("/", controller.getAllConsumables);

  // GET /api/consumables/code/:code - Get consumable by code
  fastify.get("/code/:code", controller.getConsumableByCode);

  // GET /api/consumables/low-stock - Get low stock consumables
  fastify.get("/low-stock", controller.getLowStockConsumables);

  // GET /api/consumables/:id - Get consumable by ID
  fastify.get("/:id", controller.getConsumableById);

  // POST /api/consumables - Create new consumable
  fastify.post("/", controller.createConsumable);

  // POST /api/consumables/:id/stock - Update stock
  fastify.post("/:id/stock", controller.updateStock);

  // PUT /api/consumables/:id - Update consumable
  fastify.put("/:id", controller.updateConsumable);

  // DELETE /api/consumables/:id - Delete consumable
  fastify.delete("/:id", controller.deleteConsumable);
}
