import { FastifyInstance } from "fastify";
import { createInvoiceController } from "../controllers/invoice.controller";

export default async function invoiceRoutes(fastify: FastifyInstance) {
  const controller = createInvoiceController(fastify);

  // GET /api/invoices - List all invoices with filters
  fastify.get("/", controller.getAllInvoices);

  // GET /api/invoices/stats - Get invoice statistics
  fastify.get("/stats", controller.getStats);

  // GET /api/invoices/number/:number - Get invoice by number
  fastify.get("/number/:number", controller.getInvoiceByNumber);

  // GET /api/invoices/:id - Get invoice by ID with all items
  fastify.get("/:id", controller.getInvoiceById);

  // POST /api/invoices - Create new invoice
  fastify.post("/", controller.createInvoice);

  // PUT /api/invoices/:id - Update invoice
  fastify.put("/:id", controller.updateInvoice);

  // POST /api/invoices/:id/labor - Add labor item
  fastify.post("/:id/labor", controller.addLaborItem);

  // POST /api/invoices/:id/parts - Add part item
  fastify.post("/:id/parts", controller.addPartItem);

  // POST /api/invoices/:id/consumables - Add consumable item
  fastify.post("/:id/consumables", controller.addConsumableItem);

  // POST /api/invoices/:id/payments - Add payment
  fastify.post("/:id/payments", controller.addPayment);

  // DELETE /api/invoices/labor/:itemId - Delete labor item
  fastify.delete("/labor/:itemId", controller.deleteLaborItem);

  // DELETE /api/invoices/parts/:itemId - Delete part item
  fastify.delete("/parts/:itemId", controller.deletePartItem);

  // DELETE /api/invoices/consumables/:itemId - Delete consumable item
  fastify.delete("/consumables/:itemId", controller.deleteConsumableItem);

  // DELETE /api/invoices/:id - Delete invoice
  fastify.delete("/:id", controller.deleteInvoice);
}
