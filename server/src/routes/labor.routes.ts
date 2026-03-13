import { FastifyInstance } from "fastify";
import { createLaborController } from "../controllers/labor.controller";

export default async function laborRoutes(fastify: FastifyInstance) {
  const controller = createLaborController(fastify);

  fastify.get("/", controller.getAllLabor);
  fastify.get("/code/:code", controller.getLaborByCode);
  fastify.get("/:id", controller.getLaborById);
  fastify.post("/", controller.createLabor);
  fastify.put("/:id", controller.updateLabor);
  fastify.delete("/:id", controller.deleteLabor);
}
