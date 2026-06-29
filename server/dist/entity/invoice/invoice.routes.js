"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invoiceRoutes;
const invoiceController = __importStar(require("./invoice.controller"));
const invoice_repository_1 = require("./invoice.repository");
const helper_1 = require("../../common/helper");
async function invoiceRoutes(fastify) {
    // Invoice endpoints
    fastify.get("/", (request, response) => invoiceController.getAllInvoices(fastify, request, response));
    fastify.get("/info", (request, response) => invoiceController.getAllInvoicesInfo(fastify, request, response));
    fastify.get("/:id", (request, response) => invoiceController.getInvoiceById(fastify, request, response));
    fastify.post("/", (request, response) => invoiceController.createInvoice(fastify, request, response));
    fastify.put("/:id", (request, response) => invoiceController.updateInvoice(fastify, request, response));
    fastify.delete("/:id", (request, response) => invoiceController.deleteInvoice(fastify, request, response));
    //--------------------------------------------------------------------------------------------------------------------------
    fastify.post("/full", async (request, reply) => {
        const { garageId, vehicleId, invoiceNumber, issueDate, dueDate, statusCode, notes, createdBy, lines, } = request.body;
        // 1. Créer l’en-tête
        const invoice = await (0, invoice_repository_1.createInvoice)(fastify, {
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
            const newInvoiceNumber = (0, helper_1.generateInvoiceNumber)(invoice);
            const invoiceToUpdate = {
                invoiceNumber: newInvoiceNumber,
                garageId: invoice.garageId,
                vehicleId: invoice.vehicleId,
                issueDate: invoice.issueDate,
                dueDate: invoice.dueDate,
                statusCode: invoice.statusCode,
                notes: invoice.notes,
            };
            (0, invoice_repository_1.updateInvoice)(fastify, invoice.id, invoiceToUpdate);
            // 2. Ajouter les lignes
            for (const line of lines) {
                await (0, invoice_repository_1.createInvoiceLine)(fastify, {
                    invoiceId: invoice.id,
                    lineTypeCode: line.lineTypeCode,
                    description: line.description,
                    quantity: line.quantity,
                    unitPrice: line.unitPrice,
                    discountRate: line.discountRate,
                });
            }
            // 3. Recharger la facture avec ses lignes
            const fullInvoice = await (0, invoice_repository_1.findInvoiceById)(fastify, invoice.id);
            return reply.send({ success: true, data: fullInvoice });
        }
        return reply.send({ success: false });
    });
    //--------------------------------------------------------------------------------------------------------------------------
    // Invoice line endpoints (nested)
    fastify.post("/:id/lines", (request, response) => invoiceController.addInvoiceLine(fastify, request, response));
    fastify.put("/lines/:lineId", (request, response) => invoiceController.updateInvoiceLine(fastify, request, response));
    fastify.delete("/lines/:lineId", (request, response) => invoiceController.deleteInvoiceLine(fastify, request, response));
    // Invoice line endpoints (nested)
    fastify.get("/:id/lines", (request, response) => invoiceController.getInvoiceLines(fastify, request, response));
}
