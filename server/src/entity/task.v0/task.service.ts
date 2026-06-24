import { FastifyInstance } from "fastify";
import { CreateTaskDto, UpdateTaskDto, TaskQueryParams } from "./task.types";
import {
  createTask,
  deleteTask,
  findTaskByCode,
  findTaskById,
  findAllTasks,
  updateTask,
} from "./task.repository";

export async function _getAllTasks(fastify: FastifyInstance, params: TaskQueryParams = {}) {
  const { data, total } = await findAllTasks(fastify, params);
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

export async function _getTaskById(fastify: FastifyInstance, id: number) {
  const task = await findTaskById(fastify, id);
  if (!task) throw new Error("Task not found");
  return task;
}

export async function _getTaskByCode(fastify: FastifyInstance, code: string) {
  const task = await findTaskByCode(fastify, code);
  if (!task) throw new Error("Task not found");
  return task;
}

export async function _createTask(fastify: FastifyInstance, data: CreateTaskDto) {
  const existing = await findTaskByCode(fastify, data.code);
  if (existing) throw new Error("Task code already exists");
  return await createTask(fastify, data);
}

export async function _updateTask(fastify: FastifyInstance, id: number, data: UpdateTaskDto) {
  const task = await findTaskById(fastify, id);
  if (!task) throw new Error("Task not found");

  if (data.name === "" || data.code === "") throw new Error("Title and code cannot be empty");
  const updated = await updateTask(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function _deleteTask(fastify: FastifyInstance, id: number) {
  const task = await findTaskById(fastify, id);
  if (!task) throw new Error("Task not found");
  const deleted = await deleteTask(fastify, id);
  if (!deleted) throw new Error("Failed to delete task");
  return { message: "Task deleted successfully" };
}
