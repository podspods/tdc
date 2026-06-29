"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoiceController = void 0;
const invoice_service_1 = require("../services/invoice.service");
const createInvoiceController = (fastify) => {
    const invoiceService = (0, invoice_service_1.createInvoiceService)(fastify);
    /**
     * GET /api/invoices
     */
    const getAllInvoices = async (request, reply) => {
        try {
            const params = {
                page: request.query.page ? parseInt(request.query.page) : 1,
                limit: request.query.limit ? parseInt(request.query.limit) : 20,
                registrationId: request.query.registrationId
                    ? parseInt(request.query.registrationId)
                    : undefined,
                ownerId: request.query.ownerId ? parseInt(request.query.ownerId) : undefined,
                status: request.query.status,
                fromDate: request.query.fromDate,
                toDate: request.query.toDate,
                // overdue: request.query.overdue === "true",
                search: request.query.search,
            };
            const result = await invoiceService.getAllInvoices(params);
            reply.send({
                success: true,
                data: result.data,
                pagination: result.pagination,
            });
        }
        catch (error) {
            reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/invoices/stats
     */
    const getStats = async (request, reply) => {
        try {
            const stats = await invoiceService.getStatistics();
            reply.send({
                success: true,
                data: stats,
            });
        }
        catch (error) {
            reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/invoices/number/:number
     */
    const getInvoiceByNumber = async (request, reply) => {
        try {
            const invoice = await invoiceService.getInvoiceByNumber(request.params.number);
            reply.send({
                success: true,
                data: invoice,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Invoice not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * GET /api/invoices/:id
     */
    const getInvoiceById = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const invoice = await invoiceService.getInvoiceById(id);
            reply.send({
                success: true,
                data: invoice,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Invoice not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/invoices
     */
    const createInvoice = async (request, reply) => {
        try {
            const invoice = await invoiceService.createInvoice(request.body);
            reply.status(201).send({
                success: true,
                data: invoice,
                message: "Invoice created successfully",
            });
        }
        catch (error) {
            reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * PUT /api/invoices/:id
     */
    const updateInvoice = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const invoice = await invoiceService.updateInvoice(id, request.body);
            reply.send({
                success: true,
                data: invoice,
                message: "Invoice updated successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Invoice not found")
                    status = 404;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/invoices/:id/labor
     */
    const addLaborItem = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const item = await invoiceService.addLaborItem({
                invoiceId: id,
                ...request.body,
            });
            reply.status(201).send({
                success: true,
                data: item,
                message: "Labor item added successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Invoice not found")
                    status = 404;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/invoices/:id/parts
     */
    const addPartItem = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const item = await invoiceService.addPartItem({
                invoiceId: id,
                ...request.body,
            });
            reply.status(201).send({
                success: true,
                data: item,
                message: "Part item added successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Invoice not found")
                    status = 404;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/invoices/:id/consumables
     */
    const addConsumableItem = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const item = await invoiceService.addConsumableItem({
                invoiceId: id,
                ...request.body,
            });
            reply.status(201).send({
                success: true,
                data: item,
                message: "Consumable item added successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Invoice not found")
                    status = 404;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * POST /api/invoices/:id/payments
     */
    const addPayment = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const payment = await invoiceService.addPayment({
                invoiceId: id,
                ...request.body,
                createdBy: request.user?.id || "system",
            });
            reply.status(201).send({
                success: true,
                data: payment,
                message: "Payment added successfully",
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Invoice not found")
                    status = 404;
                if (error.message.includes("exceeds amount due"))
                    status = 400;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/invoices/labor/:itemId
     */
    const deleteLaborItem = async (request, reply) => {
        try {
            const itemId = parseInt(request.params.itemId);
            const result = await invoiceService.removeLaborItem(itemId);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Labor item not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/invoices/parts/:itemId
     */
    const deletePartItem = async (request, reply) => {
        try {
            const itemId = parseInt(request.params.itemId);
            const result = await invoiceService.removePartItem(itemId);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Part item not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/invoices/consumables/:itemId
     */
    const deleteConsumableItem = async (request, reply) => {
        try {
            const itemId = parseInt(request.params.itemId);
            const result = await invoiceService.removeConsumableItem(itemId);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            const status = error instanceof Error && error.message === "Consumable item not found" ? 404 : 500;
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    /**
     * DELETE /api/invoices/:id
     */
    const deleteInvoice = async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            const result = await invoiceService.deleteInvoice(id);
            reply.send({
                success: true,
                ...result,
            });
        }
        catch (error) {
            let status = 500;
            if (error instanceof Error) {
                if (error.message === "Invoice not found")
                    status = 404;
                if (error.message.includes("Cannot delete paid"))
                    status = 409;
            }
            reply.status(status).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    return {
        getAllInvoices,
        getStats,
        getInvoiceByNumber,
        getInvoiceById,
        createInvoice,
        updateInvoice,
        addLaborItem,
        addPartItem,
        addConsumableItem,
        addPayment,
        deleteLaborItem,
        deletePartItem,
        deleteConsumableItem,
        deleteInvoice,
    };
};
exports.createInvoiceController = createInvoiceController;
