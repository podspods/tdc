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
exports.getAllInvoiceHeaders = getAllInvoiceHeaders;
exports.getDefaultInvoiceHeader = getDefaultInvoiceHeader;
exports.getInvoiceHeaderStats = getInvoiceHeaderStats;
exports.getInvoiceHeaderById = getInvoiceHeaderById;
exports.createInvoiceHeader = createInvoiceHeader;
exports.updateInvoiceHeader = updateInvoiceHeader;
exports.setInvoiceHeaderAsDefault = setInvoiceHeaderAsDefault;
exports.deleteInvoiceHeader = deleteInvoiceHeader;
const invoiceHeaderService = __importStar(require("./invoiceHeader.service"));
/**
 * GET /api/invoice-headers - Get all headers
 */
async function getAllInvoiceHeaders(request, reply) {
    try {
        const params = {
            isActive: request.query.isActive === "true"
                ? true
                : request.query.isActive === "false"
                    ? false
                    : undefined,
            isDefault: request.query.isDefault === "true"
                ? true
                : request.query.isDefault === "false"
                    ? false
                    : undefined,
        };
        const headers = invoiceHeaderService.getAllInvoiceHeaders(params);
        const response = {
            success: true,
            data: headers,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
}
/**
 * GET /api/invoice-headers/default - Get default header
 */
async function getDefaultInvoiceHeader(request, reply) {
    try {
        const header = invoiceHeaderService.getDefaultInvoiceHeader();
        const response = {
            success: true,
            data: header,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
}
/**
 * GET /api/invoice-headers/stats - Get statistics
 */
async function getInvoiceHeaderStats(request, reply) {
    try {
        const stats = invoiceHeaderService.getInvoiceHeaderStats();
        const response = {
            success: true,
            data: stats,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
}
/**
 * GET /api/invoice-headers/:id - Get header by ID
 */
async function getInvoiceHeaderById(request, reply) {
    try {
        const header = invoiceHeaderService.getInvoiceHeaderById(request.params.id);
        if (!header) {
            const response = {
                success: false,
                error: "Invoice header not found",
            };
            reply.status(404).send(response);
            return;
        }
        const response = {
            success: true,
            data: header,
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
}
/**
 * POST /api/invoice-headers - Create new header
 */
async function createInvoiceHeader(request, reply) {
    try {
        const header = invoiceHeaderService.createInvoiceHeader(request.body);
        const response = {
            success: true,
            data: header,
            message: "Invoice header created successfully",
        };
        reply.status(201).send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
}
/**
 * PUT /api/invoice-headers/:id - Update header
 */
async function updateInvoiceHeader(request, reply) {
    try {
        const header = invoiceHeaderService.updateInvoiceHeader(request.params.id, request.body);
        if (!header) {
            const response = {
                success: false,
                error: "Invoice header not found",
            };
            reply.status(404).send(response);
            return;
        }
        const response = {
            success: true,
            data: header,
            message: "Invoice header updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
}
/**
 * POST /api/invoice-headers/:id/set-default - Set header as default
 */
async function setInvoiceHeaderAsDefault(request, reply) {
    try {
        const header = invoiceHeaderService.setInvoiceHeaderAsDefault(request.params.id);
        if (!header) {
            const response = {
                success: false,
                error: "Invoice header not found",
            };
            reply.status(404).send(response);
            return;
        }
        const response = {
            success: true,
            data: header,
            message: "Default header updated successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(500).send(response);
    }
}
/**
 * DELETE /api/invoice-headers/:id - Delete header
 */
async function deleteInvoiceHeader(request, reply) {
    try {
        const deleted = invoiceHeaderService.deleteInvoiceHeader(request.params.id);
        if (!deleted) {
            const response = {
                success: false,
                error: "Invoice header not found",
            };
            reply.status(404).send(response);
            return;
        }
        const response = {
            success: true,
            message: "Invoice header deleted successfully",
        };
        reply.send(response);
    }
    catch (error) {
        const status = error instanceof Error && error.message.includes("default") ? 400 : 500;
        const response = {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
        reply.status(status).send(response);
    }
}
