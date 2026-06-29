"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = getAllTasks;
exports.getTaskById = getTaskById;
exports.getTaskByCode = getTaskByCode;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const task_service_1 = require("./task.service");
async function getAllTasks(fastify, request, reply) {
    try {
        const params = {
            page: request.query.page ?? 1,
            limit: request.query.limit ?? 20,
            brandId: request.query.brandId,
            skillLevel: request.query.skillLevel,
            isActive: request.query.isActive,
            search: request.query.search,
        };
        const result = await (0, task_service_1._getAllTasks)(fastify, params);
        reply.send({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getTaskById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const task = await (0, task_service_1._getTaskById)(fastify, id);
        reply.send({ success: true, data: task });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Task not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getTaskByCode(fastify, request, reply) {
    try {
        const task = await (0, task_service_1._getTaskByCode)(fastify, request.params.code);
        reply.send({ success: true, data: task });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Task not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function createTask(fastify, request, reply) {
    try {
        console.log("createTask", 81);
        const task = await (0, task_service_1._createTask)(fastify, request.body);
        const updatTaskDto = {
            code: `${task.code}${String(task.id).padStart(2, "0")}`,
            name: task.name,
            description: task.description,
            durationHours: task.durationHours,
            skillLevel: task.skillLevel,
            brandId: task.brandId,
            isActive: task.isActive,
        };
        const taskUpdate = await (0, task_service_1._updateTask)(fastify, task.id, updatTaskDto);
        reply
            .status(201)
            .send({ success: true, data: taskUpdate, message: "Task created successfully" });
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function updateTask(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const task = await (0, task_service_1._updateTask)(fastify, id, request.body);
        reply.send({ success: true, data: task, message: "Task updated successfully" });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error) {
            if (error.message === "Task not found")
                status = 404;
            if (error.message === "Task code already exists")
                status = 409;
        }
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function deleteTask(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const result = await (0, task_service_1._deleteTask)(fastify, id);
        reply.send({ success: true, ...result });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Task not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
