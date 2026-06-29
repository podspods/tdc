"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sparesponsePartRoutes;
const sparePart_controller_1 = require("./sparePart.controller");
async function sparesponsePartRoutes(fastify) {
    fastify.get("/", (response, responsep) => (0, sparePart_controller_1.getAllParts)(fastify, response, responsep));
    fastify.get("/code/:code", (response, responsep) => (0, sparePart_controller_1.getPartByCode)(fastify, response, responsep));
    fastify.get("/:id", (response, responsep) => (0, sparePart_controller_1.getPartById)(fastify, response, responsep));
    fastify.post("/", (response, responsep) => (0, sparePart_controller_1.createPart)(fastify, response, responsep));
    fastify.put("/:id", (response, responsep) => (0, sparePart_controller_1.updatePart)(fastify, response, responsep));
    fastify.delete("/:id", (response, responsep) => (0, sparePart_controller_1.deletePart)(fastify, response, responsep));
}
