"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = taskRoutes;
const task_controller_1 = require("./task.controller");
async function taskRoutes(fastify) {
    fastify.get("/", (request, response) => (0, task_controller_1.getAllTasks)(fastify, request, response));
    fastify.get("/code/:code", (request, response) => (0, task_controller_1.getTaskByCode)(fastify, request, response));
    fastify.get("/:id", (request, response) => (0, task_controller_1.getTaskById)(fastify, request, response));
    fastify.post("/", (request, response) => {
        (0, task_controller_1.createTask)(fastify, request, response);
    });
    fastify.put("/:id", (request, response) => (0, task_controller_1.updateTask)(fastify, request, response));
    fastify.delete("/:id", (request, response) => (0, task_controller_1.deleteTask)(fastify, request, response));
}
