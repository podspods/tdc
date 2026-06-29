"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInvoices = getAllInvoices;
exports.getInvoiceById = getInvoiceById;
exports.getAllInvoicesInfo = getAllInvoicesInfo;
exports.createInvoice = createInvoice;
exports.updateInvoice = updateInvoice;
exports.deleteInvoice = deleteInvoice;
exports.addInvoiceLine = addInvoiceLine;
exports.updateInvoiceLine = updateInvoiceLine;
exports.deleteInvoiceLine = deleteInvoiceLine;
exports.getInvoiceLines = getInvoiceLines;
const invoice_service_1 = require("./invoice.service");
async function getAllInvoices(fastify, request, reply) {
    try {
        const params = {
            page: request.query.page ?? 1,
            limit: request.query.limit ?? 20,
            garageId: request.query.garageId,
            vehicleId: request.query.vehicleId,
            statusCode: request.query.statusCode,
            fromDate: request.query.fromDate,
            toDate: request.query.toDate,
        };
        const result = await (0, invoice_service_1._getAllInvoices)(fastify, params);
        reply.send({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getInvoiceById(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const invoice = await (0, invoice_service_1._getInvoiceById)(fastify, id);
        reply.send({ success: true, data: invoice });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Invoice not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
// server/src/entity/invoice/invoice.controller.ts
async function getAllInvoicesInfo(fastify, request, reply) {
    try {
        const list = await (0, invoice_service_1._getAllInvoicesInfo)(fastify);
        reply.send({ success: true, data: list });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------
async function createInvoice(fastify, request, reply) {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% createInvoice   body92", request.body);
    console.log("%%%%%%%%%%%%%%%%%%%%----------- createInvoice   body 92 typeof", typeof request.body.dueDate);
    try {
        const invoice = await (0, invoice_service_1._createInvoice)(fastify, request.body);
        reply
            .status(201)
            .send({ success: true, data: invoice, message: "Invoice created successfully" });
    }
    catch (error) {
        reply.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function updateInvoice(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const invoice = await (0, invoice_service_1._updateInvoice)(fastify, id, request.body);
        reply.send({ success: true, data: invoice, message: "Invoice updated successfully" });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message === "Invoice not found")
            status = 404;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function deleteInvoice(fastify, request, reply) {
    try {
        const id = parseInt(request.params.id);
        const result = await (0, invoice_service_1._deleteInvoice)(fastify, id);
        reply.send({ success: true, ...result });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message === "Invoice not found")
            status = 404;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
// ---- Lines ----
async function addInvoiceLine(fastify, request, reply) {
    try {
        const line = await (0, invoice_service_1._addInvoiceLine)(fastify, request.body);
        reply.status(201).send({ success: true, data: line, message: "Line added" });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Parent invoice not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function updateInvoiceLine(fastify, request, reply) {
    try {
        const lineId = parseInt(request.params.lineId);
        const line = await (0, invoice_service_1._updateInvoiceLine)(fastify, lineId, request.body);
        reply.send({ success: true, data: line, message: "Line updated" });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message === "Line not found")
            status = 404;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function deleteInvoiceLine(fastify, request, reply) {
    try {
        const lineId = parseInt(request.params.lineId);
        const result = await (0, invoice_service_1._deleteInvoiceLine)(fastify, lineId);
        reply.send({ success: true, ...result });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Line not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
async function getInvoiceLines(fastify, request, reply) {
    try {
        const invoiceId = parseInt(request.params.id);
        const lines = await (0, invoice_service_1._getInvoiceLines)(fastify, invoiceId);
        reply.send({ success: true, data: lines });
    }
    catch (error) {
        const status = error instanceof Error && error.message === "Invoice not found" ? 404 : 500;
        reply.status(status).send({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
