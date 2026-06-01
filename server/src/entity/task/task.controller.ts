import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateTaskDto, UpdateTaskDto, TaskQueryParams, Task } from "./task.types";
import {
  _createTask,
  _deleteTask,
  _getAllTasks,
  _getTaskByCode,
  _getTaskById,
  _updateTask,
} from "./task.service";

type IdParams = { id: string };
type CodeParams = { code: string };
type GetAllQuery = TaskQueryParams;

export async function getAllTasks(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
) {
  try {
    const params: TaskQueryParams = {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 20,
      brandId: request.query.brandId,
      skillLevel: request.query.skillLevel,
      isActive: request.query.isActive,
      search: request.query.search,
    };
    const result = await _getAllTasks(fastify, params);
    reply.send({ success: true, data: result.data, pagination: result.pagination });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getTaskById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const task = await _getTaskById(fastify, id);
    reply.send({ success: true, data: task });
  } catch (error) {
    const status = error instanceof Error && error.message === "Task not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getTaskByCode(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: CodeParams }>,
  reply: FastifyReply,
) {
  try {
    const task = await _getTaskByCode(fastify, request.params.code);
    reply.send({ success: true, data: task });
  } catch (error) {
    const status = error instanceof Error && error.message === "Task not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function createTask(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateTaskDto }>,
  reply: FastifyReply,
) {
  try {
    console.log("createTask", 81);
    const task: Task = await _createTask(fastify, request.body);
    const updatTaskDto: UpdateTaskDto = {
      code: `${task.code}${String(task.id).padStart(2, "0")}`,
      name: task.name,
      description: task.description,
      durationHours: task.durationHours,
      skillLevel: task.skillLevel,
      brandId: task.brandId,
      isActive: task.isActive,
    };
    const taskUpdate: Task = await _updateTask(fastify, task.id, updatTaskDto);
    reply
      .status(201)
      .send({ success: true, data: taskUpdate, message: "Task created successfully" });
  } catch (error) {
    const status = error instanceof Error && error.message.includes("already exists") ? 409 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function updateTask(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateTaskDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const task = await _updateTask(fastify, id, request.body);
    reply.send({ success: true, data: task, message: "Task updated successfully" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error) {
      if (error.message === "Task not found") status = 404;
      if (error.message === "Task code already exists") status = 409;
    }
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deleteTask(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await _deleteTask(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    const status = error instanceof Error && error.message === "Task not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
