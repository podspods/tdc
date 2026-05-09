import { FastifyInstance } from "fastify";
import { CreateTaskDto, TaskQueryParams, UpdateTaskDto } from "./task.types";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskByCode,
  getTaskById,
  updateTask,
} from "./task.controller";

export default async function taskRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: TaskQueryParams }>("/", (request, response) =>
    getAllTasks(fastify, request, response),
  );
  fastify.get<{ Params: { code: string } }>("/code/:code", (request, response) =>
    getTaskByCode(fastify, request, response),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (request, response) =>
    getTaskById(fastify, request, response),
  );
  fastify.post<{ Body: CreateTaskDto }>("/", (request, response) =>
    createTask(fastify, request, response),
  );
  fastify.put<{ Params: { id: string }; Body: UpdateTaskDto }>("/:id", (request, response) =>
    updateTask(fastify, request, response),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, response) =>
    deleteTask(fastify, request, response),
  );
}
