"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = laborRoutes;
const labor_controller_1 = require("../controllers/labor.controller");
async function laborRoutes(fastify) {
    const controller = (0, labor_controller_1.createLaborController)(fastify);
    fastify.get("/", controller.getAllLabor);
    fastify.get("/code/:code", controller.getLaborByCode);
    fastify.get("/:id", controller.getLaborById);
    fastify.post("/", controller.createLabor);
    fastify.put("/:id", controller.updateLabor);
    fastify.delete("/:id", controller.deleteLabor);
}
