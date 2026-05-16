import { FastifyInstance } from "fastify";
import * as invoiceRepo from "./invoice.repository";
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  CreateInvoiceLineDto,
  UpdateInvoiceLineDto,
  InvoiceQueryParams,
  InvoiceInfo,
} from "./invoice.types";

export async function _getAllInvoices(fastify: FastifyInstance, params: InvoiceQueryParams = {}) {
  const { data, total } = await invoiceRepo.findAllInvoices(fastify, params);
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

export async function _getInvoiceById(fastify: FastifyInstance, id: number) {
  const invoice = await invoiceRepo.findInvoiceById(fastify, id);
  if (!invoice) throw new Error("Invoice not found");
  const lines = await invoiceRepo.findLinesByInvoiceId(fastify, id);
  return { ...invoice, lines };
}

//--------------------------------------------------------------------------------------------------------------------------
// server/src/entity/invoice/invoice.service.ts
export async function _getAllInvoicesInfo(fastify: FastifyInstance): Promise<InvoiceInfo[]> {
  return await invoiceRepo.getInvoicesInfoList(fastify);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _createInvoice(fastify: FastifyInstance, data: CreateInvoiceDto) {
  return await invoiceRepo.createInvoice(fastify, data);
}

export async function _updateInvoice(fastify: FastifyInstance, id: number, data: UpdateInvoiceDto) {
  const existing = await invoiceRepo.findInvoiceById(fastify, id);
  if (!existing) throw new Error("Invoice not found");
  const updated = await invoiceRepo.updateInvoice(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function _deleteInvoice(fastify: FastifyInstance, id: number) {
  const existing = await invoiceRepo.findInvoiceById(fastify, id);
  if (!existing) throw new Error("Invoice not found");
  const deleted = await invoiceRepo.deleteInvoice(fastify, id);
  if (!deleted) throw new Error("Failed to delete invoice");
  return { message: "Invoice deleted successfully" };
}

// Lines
export async function _addInvoiceLine(fastify: FastifyInstance, data: CreateInvoiceLineDto) {
  const invoice = await invoiceRepo.findInvoiceById(fastify, data.invoiceId);
  if (!invoice) throw new Error("Parent invoice not found");
  return await invoiceRepo.createInvoiceLine(fastify, data);
}

export async function _updateInvoiceLine(
  fastify: FastifyInstance,
  lineId: number,
  data: UpdateInvoiceLineDto,
) {
  const line = await invoiceRepo.updateInvoiceLine(fastify, lineId, data);
  if (!line) throw new Error("Line not found or no fields to update");
  return line;
}

export async function _deleteInvoiceLine(fastify: FastifyInstance, lineId: number) {
  const deleted = await invoiceRepo.deleteInvoiceLine(fastify, lineId);
  if (!deleted) throw new Error("Line not found");
  return { message: "Line deleted successfully" };
}

export async function _getInvoiceLines(fastify: FastifyInstance, invoiceId: number) {
  const invoice = await invoiceRepo.findInvoiceById(fastify, invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  return await invoiceRepo.findLinesByInvoiceId(fastify, invoiceId);
}
