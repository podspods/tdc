import { FastifyInstance } from "fastify";
import { createModelController } from "../controllers/motorcycleModel.controller";

export default async function motorcycleModelRoutes(fastify: FastifyInstance) {
  const controller = createModelController(fastify);

  // GET /api/motorcycle-models - List all models with filters
  fastify.get("/", controller.getAllModels);

  // GET /api/motorcycle-models/current - Get current models
  fastify.get("/current", controller.getCurrentModels);

  // GET /api/motorcycle-models/by-brand/:brandId - Get models by brand
  fastify.get("/by-brand/:brandId", controller.getModelsByBrand);

  // GET /api/motorcycle-models/:id - Get model by ID
  fastify.get("/:id", controller.getModelById);

  // POST /api/motorcycle-models - Create new model
  fastify.post("/", controller.createModel);

  // PUT /api/motorcycle-models/:id - Update model
  fastify.put("/:id", controller.updateModel);

  // DELETE /api/motorcycle-models/:id - Delete model
  fastify.delete("/:id", controller.deleteModel);
}
