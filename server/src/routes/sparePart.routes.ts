import { FastifyInstance } from "fastify";
import { createSparePartController } from "../controllers/sparePart.controller";

/**
 * Spare Part Routes
 * Base path: /api/spare-parts
 */
export default async function sparePartRoutes(fastify: FastifyInstance) {
  const controller = createSparePartController(fastify);

  // GET /api/spare-parts - Get all spare parts with filters
  fastify.get("/", controller.getAllSpareParts);

  // GET /api/spare-parts/code/:code - Get part by code
  fastify.get("/code/:code", controller.getSparePartByCode);

  // GET /api/spare-parts/oem/:number - Get part by OEM number
  fastify.get("/oem/:number", controller.getSparePartByOem);

  // GET /api/spare-parts/low-stock - Get low stock parts
  fastify.get("/low-stock", controller.getLowStockParts);

  // GET /api/spare-parts/compatible - Get compatible parts
  fastify.get("/compatible", controller.getCompatibleParts);

  // GET /api/spare-parts/:id - Get part by ID
  fastify.get("/:id", controller.getSparePartById);

  // POST /api/spare-parts - Create new spare part
  fastify.post("/", controller.createSparePart);

  // POST /api/spare-parts/:id/stock - Update stock
  fastify.post("/:id/stock", controller.updateStock);

  // PUT /api/spare-parts/:id - Update spare part
  fastify.put("/:id", controller.updateSparePart);

  // DELETE /api/spare-parts/:id - Delete spare part
  fastify.delete("/:id", controller.deleteSparePart);
}
