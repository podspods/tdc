"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invoiceHeaderRoutes;
const invoiceHeader_controller_1 = require("./invoiceHeader.controller");
/**
 * Invoice Header Routes
 */
async function invoiceHeaderRoutes(fastify) {
    // GET /api/invoice-headers - Get all headers
    fastify.get("/", invoiceHeader_controller_1.getAllInvoiceHeaders);
    // GET /api/invoice-headers/default - Get default header
    fastify.get("/default", invoiceHeader_controller_1.getDefaultInvoiceHeader);
    // GET /api/invoice-headers/stats - Get statistics
    fastify.get("/stats", invoiceHeader_controller_1.getInvoiceHeaderStats);
    // GET /api/invoice-headers/:id - Get header by ID
    fastify.get("/:id", invoiceHeader_controller_1.getInvoiceHeaderById);
    // POST /api/invoice-headers - Create new header
    fastify.post("/", invoiceHeader_controller_1.createInvoiceHeader);
    // PUT /api/invoice-headers/:id - Update header
    fastify.put("/:id", invoiceHeader_controller_1.updateInvoiceHeader);
    // POST /api/invoice-headers/:id/set-default - Set as default
    fastify.post("/:id/set-default", invoiceHeader_controller_1.setInvoiceHeaderAsDefault);
    // DELETE /api/invoice-headers/:id - Delete header
    fastify.delete("/:id", invoiceHeader_controller_1.deleteInvoiceHeader);
}
