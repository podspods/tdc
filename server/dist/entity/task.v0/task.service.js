"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getAllTasks = _getAllTasks;
exports._getTaskById = _getTaskById;
exports._getTaskByCode = _getTaskByCode;
exports._createTask = _createTask;
exports._updateTask = _updateTask;
exports._deleteTask = _deleteTask;
const task_repository_1 = require("./task.repository");
async function _getAllTasks(fastify, params = {}) {
    const { data, total } = await (0, task_repository_1.findAllTasks)(fastify, params);
    return {
        data,
        pagination: {
            page: params.page || 1,
            limit: params.limit || 20,
            total,
            pages: Math.ceil(total / (params.limit || 20)),
        },
    };
}
async function _getTaskById(fastify, id) {
    const task = await (0, task_repository_1.findTaskById)(fastify, id);
    if (!task)
        throw new Error("Task not found");
    return task;
}
async function _getTaskByCode(fastify, code) {
    const task = await (0, task_repository_1.findTaskByCode)(fastify, code);
    if (!task)
        throw new Error("Task not found");
    return task;
}
async function _createTask(fastify, data) {
    const existing = await (0, task_repository_1.findTaskByCode)(fastify, data.code);
    if (existing)
        throw new Error("Task code already exists");
    return await (0, task_repository_1.createTask)(fastify, data);
}
async function _updateTask(fastify, id, data) {
    const task = await (0, task_repository_1.findTaskById)(fastify, id);
    if (!task)
        throw new Error("Task not found");
    if (data.name === "" || data.code === "")
        throw new Error("Title and code cannot be empty");
    const updated = await (0, task_repository_1.updateTask)(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function _deleteTask(fastify, id) {
    const task = await (0, task_repository_1.findTaskById)(fastify, id);
    if (!task)
        throw new Error("Task not found");
    const deleted = await (0, task_repository_1.deleteTask)(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete task");
    return { message: "Task deleted successfully" };
}
