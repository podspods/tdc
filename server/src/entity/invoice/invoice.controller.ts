import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  CreateInvoiceLineDto,
  UpdateInvoiceLineDto,
  InvoiceQueryParams,
} from "./invoice.types";
import {
  _addInvoiceLine,
  _createInvoice,
  _deleteInvoice,
  _deleteInvoiceLine,
  _getAllInvoices,
  _getAllInvoicesInfo,
  _getInvoiceById,
  _getInvoiceLines,
  _updateInvoice,
  _updateInvoiceLine,
} from "./invoice.service";

type IdParams = { id: string };
type LineIdParams = { lineId: string };
type GetAllQuery = InvoiceQueryParams;

export async function getAllInvoices(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
) {
  try {
    const params: InvoiceQueryParams = {
      page: request.query.page ?? 1,
      limit: request.query.limit ?? 20,
      garageId: request.query.garageId,
      vehicleId: request.query.vehicleId,
      statusCode: request.query.statusCode,
      fromDate: request.query.fromDate,
      toDate: request.query.toDate,
    };
    const result = await _getAllInvoices(fastify, params);
    reply.send({ success: true, data: result.data, pagination: result.pagination });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getInvoiceById(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const invoice = await _getInvoiceById(fastify, id);
    reply.send({ success: true, data: invoice });
  } catch (error) {
    const status = error instanceof Error && error.message === "Invoice not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
//--------------------------------------------------------------------------------------------------------------------------
// server/src/entity/invoice/invoice.controller.ts
export async function getAllInvoicesInfo(
  fastify: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const list = await _getAllInvoicesInfo(fastify);
    reply.send({ success: true, data: list });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function createInvoice(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: CreateInvoiceDto }>,
  reply: FastifyReply,
) {
  try {
    const invoice = await _createInvoice(fastify, request.body);
    reply
      .status(201)
      .send({ success: true, data: invoice, message: "Invoice created successfully" });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function updateInvoice(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: UpdateInvoiceDto }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const invoice = await _updateInvoice(fastify, id, request.body);
    reply.send({ success: true, data: invoice, message: "Invoice updated successfully" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Invoice not found") status = 404;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deleteInvoice(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const id = parseInt(request.params.id);
    const result = await _deleteInvoice(fastify, id);
    reply.send({ success: true, ...result });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Invoice not found") status = 404;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

// ---- Lines ----
export async function addInvoiceLine(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams; Body: CreateInvoiceLineDto }>,
  reply: FastifyReply,
) {
  try {
    const line = await _addInvoiceLine(fastify, request.body);
    reply.status(201).send({ success: true, data: line, message: "Line added" });
  } catch (error) {
    const status =
      error instanceof Error && error.message === "Parent invoice not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function updateInvoiceLine(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: LineIdParams; Body: UpdateInvoiceLineDto }>,
  reply: FastifyReply,
) {
  try {
    const lineId = parseInt(request.params.lineId);
    const line = await _updateInvoiceLine(fastify, lineId, request.body);
    reply.send({ success: true, data: line, message: "Line updated" });
  } catch (error) {
    let status = 500;
    if (error instanceof Error && error.message === "Line not found") status = 404;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function deleteInvoiceLine(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: LineIdParams }>,
  reply: FastifyReply,
) {
  try {
    const lineId = parseInt(request.params.lineId);
    const result = await _deleteInvoiceLine(fastify, lineId);
    reply.send({ success: true, ...result });
  } catch (error) {
    const status = error instanceof Error && error.message === "Line not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getInvoiceLines(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
) {
  try {
    const invoiceId = parseInt(request.params.id);
    const lines = await _getInvoiceLines(fastify, invoiceId);
    reply.send({ success: true, data: lines });
  } catch (error) {
    const status = error instanceof Error && error.message === "Invoice not found" ? 404 : 500;
    reply.status(status).send({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
