"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = modelRoutes;
const model_controller_1 = require("./model.controller");
async function modelRoutes(fastify) {
    fastify.get("/", (request, reply) => (0, model_controller_1.getAllModels)(fastify, request, reply));
    fastify.get("/brand/:brandId", (request, reply) => (0, model_controller_1.getModelsByBrand)(fastify, request, reply));
    fastify.get("/:id", (request, reply) => (0, model_controller_1.getModelById)(fastify, request, reply));
    fastify.post("/", (request, reply) => (0, model_controller_1.createModel)(fastify, request, reply));
    fastify.put("/:id", (request, reply) => (0, model_controller_1.updateModel)(fastify, request, reply));
    fastify.delete("/:id", (request, reply) => (0, model_controller_1.deleteModel)(fastify, request, reply));
    fastify.get("/info", (request, reply) => (0, model_controller_1.getAllModelInfo)(fastify, request, reply));
}
