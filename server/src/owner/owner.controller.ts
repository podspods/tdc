import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateOwnerDto, UpdateOwnerDto, OwnerQueryParams } from "./owner.types";
import {
  _createOwner,
  _deleteOwner,
  _getAllOwners,
  _getOwnerById,
  _getOwnerByPhone,
  _getOwnerStats,
  _getOwnerWithDetails,
  _updateOwner,
} from "./owner.service";

type IdParams = {
  id: string;
};

type PhoneParams = {
  phone: string;
};

type ZGetAllQuery = OwnerQueryParams & {};

//-------------------------------------------------------------------------------------------------
/**fastify: FastifyInstance
 * GET /api/owners
 */
//-------------------------------------------------------------------------------------------------
export async function getAllOwners(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: OwnerQueryParams }>,
  reply: FastifyReply,
) {
  try {
    const pageStr = request.query.page ?? 0;
    const params: OwnerQueryParams = {
      page: request.query.page ?? 0,
      limit: request.query.limit ?? 20,
      search: request.query.search,
      category: request.query.category as any,
      city: request.query.city,
      minSpent: request.query.minSpent ?? 0,
      maxSpent: request.query.maxSpent ?? 0,

      hasOutstandingInvoices: request.query.hasOutstandingInvoices ?? false,
    };

    const result = await _getAllOwners(fastify, params);

    reply.send({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

//-------------------------------------------------------------------------------------------------

/**
 * GET /api/owners/stats
 */
//-------------------------------------------------------------------------------------------------
export async function getOwnerStats(
  fastify: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const stats = await _getOwnerStats(fastify);
    reply.send({
      success: true,
      data: stats,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

//-------------------------------------------------------------------------------------------------
/**
 * GET /api/owners/phone/:phone
 */
//-------------------------------------------------------------------------------------------------
export async function getOwnerByPhone(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: PhoneParams }>,
  reply: FastifyReply,
) {
  try {
    const owner = await _getOwnerByPhone(fastify, request.params.phone);
    reply.send({
      success: true,
      data: owner,
    });
  } catch (error) {
    const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

//-------------------------------------------------------------------------------------------------
/**
 * GET /api/owners/:id
 */
//-------------------------------------------------------------------------------------------------
export async function getOwnerWithDetailsgetOwnerById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const owner = await _getOwnerById(fastify, id);

    reply.send({
      success: true,
      data: owner,
    });
  } catch (error) {
    const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

//-------------------------------------------------------------------------------------------------
/**
 * GET /api/owners/:id/details
 */
//-------------------------------------------------------------------------------------------------
export async function getOwnerWithDetails(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const owner = await _getOwnerWithDetails(fastify, id);

    reply.send({
      success: true,
      data: owner,
    });
  } catch (error) {
    const status = error instanceof Error && error.message === "Owner not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

//-------------------------------------------------------------------------------------------------
/**
 * POST /api/owners
 */
//-------------------------------------------------------------------------------------------------
export async function createOwner(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateOwnerDto }>,
  reply: FastifyReply,
) {
  try {
    const owner = await _createOwner(fastify, request.body);

    reply.status(201).send({
      success: true,
      data: owner,
      message: "Owner created successfully",
    });
  } catch (error) {
    let status = 500;
    if (error instanceof Error) {
      if (error.message.includes("already exists")) status = 409;
    }
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

//-------------------------------------------------------------------------------------------------
/**
 * PUT /api/owners/:id
 */
//-------------------------------------------------------------------------------------------------
export async function updateOwner(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateOwnerDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const owner = await _updateOwner(fastify, id, request.body);

    reply.send({
      success: true,
      data: owner,
      message: "Owner updated successfully",
    });
  } catch (error) {
    let status = 500;
    if (error instanceof Error) {
      if (error.message === "Owner not found") status = 404;
      if (error.message.includes("already exists")) status = 409;
    }
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

//-------------------------------------------------------------------------------------------------
/**
 * DELETE /api/owners/:id
 */
//-------------------------------------------------------------------------------------------------
export async function deleteOwner(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await _deleteOwner(fastify, id);

    reply.send({
      success: true,
      ...result,
    });
  } catch (error) {
    let status = 500;
    if (error instanceof Error) {
      if (error.message === "Owner not found") status = 404;
      if (error.message.includes("Cannot delete")) status = 409;
    }
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
