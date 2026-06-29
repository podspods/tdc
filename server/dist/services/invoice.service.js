"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoiceService = void 0;
const invoice_repository_1 = require("../repositories/invoice.repository");
const createInvoiceService = (fastify) => {
    const repository = (0, invoice_repository_1.createInvoiceRepository)(fastify);
    /**
     * Get all invoices with filters
     */
    const getAllInvoices = async (params = {}) => {
        const { data, total } = await repository.findAll(params);
        return {
            data,
            pagination: {
                page: params.page || 1,
                limit: params.limit || 20,
                total,
                pages: Math.ceil(total / (params.limit || 20)),
            },
        };
    };
    /**
     * Get invoice by ID with all items
     */
    const getInvoiceById = async (id) => {
        const invoice = await repository.findById(id);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        return invoice;
    };
    /**
     * Get invoice by number
     */
    const getInvoiceByNumber = async (invoiceNumber) => {
        const invoice = await repository.findByNumber(invoiceNumber);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        return invoice;
    };
    /**
     * Get statistics
     */
    const getStatistics = async () => {
        return await repository.getStats();
    };
    /**
     * Create new invoice
     */
    const createInvoice = async (data) => {
        // Validate registration and owner exist (handled by FK constraints)
        return await repository.create(data);
    };
    /**
     * Update invoice
     */
    const updateInvoice = async (id, data) => {
        const invoice = await repository.findById(id);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        // If status is being changed to 'paid', update payment info
        if (data.status === "paid" && invoice.status !== "paid") {
            data.dueDate = new Date().toISOString().split("T")[0];
        }
        const updated = await repository.update(id, data);
        if (!updated) {
            throw new Error("No fields to update");
        }
        return updated;
    };
    /**
     * Add labor item to invoice
     */
    const addLaborItem = async (data) => {
        const invoice = await repository.findById(data.invoiceId);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        if (invoice.status === "paid" || invoice.status === "cancelled") {
            throw new Error("Cannot modify paid or cancelled invoice");
        }
        return await repository.addLaborItem(data);
    };
    /**
     * Add part item to invoice
     */
    const addPartItem = async (data) => {
        const invoice = await repository.findById(data.invoiceId);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        if (invoice.status === "paid" || invoice.status === "cancelled") {
            throw new Error("Cannot modify paid or cancelled invoice");
        }
        return await repository.addPartItem(data);
    };
    /**
     * Add consumable item to invoice
     */
    const addConsumableItem = async (data) => {
        const invoice = await repository.findById(data.invoiceId);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        if (invoice.status === "paid" || invoice.status === "cancelled") {
            throw new Error("Cannot modify paid or cancelled invoice");
        }
        return await repository.addConsumableItem(data);
    };
    /**
     * Add payment to invoice
     */
    const addPayment = async (data) => {
        const invoice = await repository.findById(data.invoiceId);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        if (invoice.status === "cancelled") {
            throw new Error("Cannot add payment to cancelled invoice");
        }
        if (data.amount <= 0) {
            throw new Error("Payment amount must be positive");
        }
        if (data.amount > invoice.amountDue) {
            throw new Error(`Payment amount exceeds amount due (${invoice.amountDue})`);
        }
        return await repository.addPayment(data);
    };
    /**
     * Remove item from invoice
     */
    const removeLaborItem = async (itemId) => {
        const deleted = await repository.removeLaborItem(itemId);
        if (!deleted) {
            throw new Error("Labor item not found");
        }
        return { message: "Labor item removed successfully" };
    };
    const removePartItem = async (itemId) => {
        const deleted = await repository.removePartItem(itemId);
        if (!deleted) {
            throw new Error("Part item not found");
        }
        return { message: "Part item removed successfully" };
    };
    const removeConsumableItem = async (itemId) => {
        const deleted = await repository.removeConsumableItem(itemId);
        if (!deleted) {
            throw new Error("Consumable item not found");
        }
        return { message: "Consumable item removed successfully" };
    };
    /**
     * Delete invoice
     */
    const deleteInvoice = async (id) => {
        const invoice = await repository.findById(id);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        if (invoice.status === "paid") {
            throw new Error("Cannot delete paid invoice");
        }
        const deleted = await repository.delete(id);
        if (!deleted) {
            throw new Error("Failed to delete invoice");
        }
        return { message: "Invoice deleted successfully" };
    };
    return {
        getAllInvoices,
        getInvoiceById,
        getInvoiceByNumber,
        getStatistics,
        createInvoice,
        updateInvoice,
        addLaborItem,
        addPartItem,
        addConsumableItem,
        addPayment,
        removeLaborItem,
        removePartItem,
        removeConsumableItem,
        deleteInvoice,
    };
};
exports.createInvoiceService = createInvoiceService;
