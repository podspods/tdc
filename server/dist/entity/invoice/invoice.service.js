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
exports._getAllInvoices = _getAllInvoices;
exports._getInvoiceById = _getInvoiceById;
exports._getAllInvoicesInfo = _getAllInvoicesInfo;
exports._createInvoice = _createInvoice;
exports._updateInvoice = _updateInvoice;
exports._deleteInvoice = _deleteInvoice;
exports._addInvoiceLine = _addInvoiceLine;
exports._updateInvoiceLine = _updateInvoiceLine;
exports._deleteInvoiceLine = _deleteInvoiceLine;
exports._getInvoiceLines = _getInvoiceLines;
const invoiceRepo = __importStar(require("./invoice.repository"));
const invoice_types_1 = require("./invoice.types");
const helper_1 = require("../../common/helper");
async function _getAllInvoices(fastify, params = {}) {
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
async function _getInvoiceById(fastify, id) {
    const invoice = await invoiceRepo.findInvoiceById(fastify, id);
    if (!invoice)
        throw new Error("Invoice not found");
    const lines = await invoiceRepo.findInvoiceLineByInvoiceId(fastify, id);
    return { ...invoice, lines };
}
//--------------------------------------------------------------------------------------------------------------------------
// server/src/entity/invoice/invoice.service.ts
async function _getAllInvoicesInfo(fastify) {
    return await invoiceRepo.getInvoicesInfoList(fastify);
}
//--------------------------------------------------------------------------------------------------------------------------
async function _createInvoice(fastify, data) {
    console.log("%%%%%%%%%%%%%%%%%%%%%% service _createInvoice newInvoiceNumber 46 data typof ", typeof data.dueDate);
    const result = await invoiceRepo.createInvoice(fastify, data);
    console.log("%%%%%%%%%%%%%%%%%%%%%% service _createInvoice result 47", result);
    if (result) {
        console.log("%%%%%%%%%%%%%%%%%%%%%% service _createInvoice newInvoiceNumber", result);
        console.log("%%%%%%%%%%%%%%%%%%%%%% service _createInvoice newInvoiceNumber 50 typof ", typeof result.dueDate);
        const newInvoiceNumber = (0, helper_1.generateInvoiceNumber)(result);
        console.log("%%%%%%%%%%%%%%%%%%%%%% service _createInvoice newInvoiceNumber", newInvoiceNumber);
        const newInvoice = { ...result, invoiceNumber: newInvoiceNumber };
        const returnValue = await invoiceRepo.updateInvoice(fastify, newInvoice.id, newInvoice);
        console.log("%%%%%%%%%%%%%%%%%%%%%% service _createInvoice newInvoice", newInvoice);
        console.log("%%%%%%%%%%%%%%%%%%%%%% service _createInvoice returnValue", returnValue);
        return returnValue || newInvoice;
    }
    return { ...invoice_types_1.invoiceInit, ...data };
}
async function _updateInvoice(fastify, id, data) {
    const existing = await invoiceRepo.findInvoiceById(fastify, id);
    if (!existing)
        throw new Error("Invoice not found");
    const updated = await invoiceRepo.updateInvoice(fastify, id, data);
    if (!updated)
        throw new Error("No fields to update");
    return updated;
}
async function _deleteInvoice(fastify, id) {
    const existing = await invoiceRepo.findInvoiceById(fastify, id);
    if (!existing)
        throw new Error("Invoice not found");
    const deleted = await invoiceRepo.deleteInvoice(fastify, id);
    if (!deleted)
        throw new Error("Failed to delete invoice");
    return { message: "Invoice deleted successfully" };
}
// Lines
async function _addInvoiceLine(fastify, data) {
    const invoice = await invoiceRepo.findInvoiceById(fastify, data.invoiceId);
    if (!invoice)
        throw new Error("Parent invoice not found");
    return await invoiceRepo.createInvoiceLine(fastify, data);
}
async function _updateInvoiceLine(fastify, lineId, data) {
    const line = await invoiceRepo.updateInvoiceLine(fastify, lineId, data);
    if (!line)
        throw new Error("Line not found or no fields to update");
    return line;
}
async function _deleteInvoiceLine(fastify, lineId) {
    const deleted = await invoiceRepo.deleteInvoiceLine(fastify, lineId);
    if (!deleted)
        throw new Error("Line not found");
    return { message: "Line deleted successfully" };
}
async function _getInvoiceLines(fastify, invoiceId) {
    const invoice = await invoiceRepo.findInvoiceLineByInvoiceId(fastify, invoiceId);
    if (!invoice)
        throw new Error("Invoice not found");
    return await invoiceRepo.findInvoiceLineByInvoiceId(fastify, invoiceId);
}
