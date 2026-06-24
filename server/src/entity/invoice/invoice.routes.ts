import { FastifyInstance } from "fastify";
import * as invoiceController from "./invoice.controller";
import {
  CreateFullInvoiceDto,
  CreateInvoiceDto,
  CreateInvoiceLineDto,
  IdParams,
  InvoiceQueryParams,
  LineIdParams,
  UpdateInvoiceDto,
  UpdateInvoiceLineDto,
} from "./invoice.types";
import {
  createInvoice,
  createInvoiceLine,
  findInvoiceById,
  updateInvoice,
} from "./invoice.repository";
import { generateInvoiceNumber } from "../../common/helper";

export default async function invoiceRoutes(fastify: FastifyInstance) {
  // Invoice endpoints
  fastify.get<{ Querystring: InvoiceQueryParams }>("/", (request, response) =>
    invoiceController.getAllInvoices(fastify, request, response),
  );

  fastify.get("/info", (request, response) =>
    invoiceController.getAllInvoicesInfo(fastify, request, response),
  );

  fastify.get<{ Params: { id: string } }>("/:id", (request, response) =>
    invoiceController.getInvoiceById(fastify, request, response),
  );

  fastify.post<{ Body: CreateInvoiceDto }>("/", (request, response) =>
    invoiceController.createInvoice(fastify, request, response),
  );
  fastify.put<{ Params: { id: string }; Body: UpdateInvoiceDto }>("/:id", (request, response) =>
    invoiceController.updateInvoice(fastify, request, response),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, response) =>
    invoiceController.deleteInvoice(fastify, request, response),
  );

  //--------------------------------------------------------------------------------------------------------------------------

  fastify.post<{ Body: CreateFullInvoiceDto }>("/full", async (request, reply) => {
    const {
      garageId,
      vehicleId,
      invoiceNumber,
      issueDate,
      dueDate,
      statusCode,
      notes,
      createdBy,
      lines,
    } = request.body;
    // 1. Créer l’en-tête
    const invoice = await createInvoice(fastify, {
      garageId,
      vehicleId,
      invoiceNumber,
      issueDate,
      dueDate,
      statusCode,
      notes,
      createdBy,
    });

    if (invoice) {
      const newInvoiceNumber = generateInvoiceNumber(invoice);

      const invoiceToUpdate: UpdateInvoiceDto = {
        invoiceNumber: newInvoiceNumber,
        garageId: invoice.garageId,
        vehicleId: invoice.vehicleId,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        statusCode: invoice.statusCode,
        notes: invoice.notes,
      };
      updateInvoice(fastify, invoice.id, invoiceToUpdate);
      // 2. Ajouter les lignes
      for (const line of lines) {
        await createInvoiceLine(fastify, {
          invoiceId: invoice.id,
          lineTypeCode: line.lineTypeCode,
          description: line.description,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
          discountRate: line.discountRate,
        });
      }

      // 3. Recharger la facture avec ses lignes
      const fullInvoice = await findInvoiceById(fastify, invoice.id);
      return reply.send({ success: true, data: fullInvoice });
    }
    return reply.send({ success: false });
  });
  //--------------------------------------------------------------------------------------------------------------------------

  // Invoice line endpoints (nested)
  fastify.post<{ Params: IdParams; Body: CreateInvoiceLineDto }>(
    "/:id/lines",
    (request, response) => invoiceController.addInvoiceLine(fastify, request, response),
  );
  fastify.put<{ Params: LineIdParams; Body: UpdateInvoiceLineDto }>(
    "/lines/:lineId",
    (request, response) => invoiceController.updateInvoiceLine(fastify, request, response),
  );
  fastify.delete<{ Params: LineIdParams }>("/lines/:lineId", (request, response) =>
    invoiceController.deleteInvoiceLine(fastify, request, response),
  );
  // Invoice line endpoints (nested)
  fastify.get<{ Params: IdParams }>("/:id/lines", (request, response) =>
    invoiceController.getInvoiceLines(fastify, request, response),
  );
}
