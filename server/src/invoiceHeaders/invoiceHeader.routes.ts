import { FastifyInstance } from "fastify";
import {
  createInvoiceHeader,
  deleteInvoiceHeader,
  getAllInvoiceHeaders,
  getDefaultInvoiceHeader,
  getInvoiceHeaderById,
  getInvoiceHeaderStats,
  setInvoiceHeaderAsDefault,
  updateInvoiceHeader,
} from "./invoiceHeader.controller";

/**
 * Invoice Header Routes
 */
export default async function invoiceHeaderRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /api/invoice-headers - Get all headers
  fastify.get("/", getAllInvoiceHeaders);

  // GET /api/invoice-headers/default - Get default header
  fastify.get("/default", getDefaultInvoiceHeader);

  // GET /api/invoice-headers/stats - Get statistics
  fastify.get("/stats", getInvoiceHeaderStats);

  // GET /api/invoice-headers/:id - Get header by ID
  fastify.get("/:id", getInvoiceHeaderById);

  // POST /api/invoice-headers - Create new header
  fastify.post("/", createInvoiceHeader);

  // PUT /api/invoice-headers/:id - Update header
  fastify.put("/:id", updateInvoiceHeader);

  // POST /api/invoice-headers/:id/set-default - Set as default
  fastify.post("/:id/set-default", setInvoiceHeaderAsDefault);

  // DELETE /api/invoice-headers/:id - Delete header
  fastify.delete("/:id", deleteInvoiceHeader);
}
