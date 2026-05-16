import { FastifyRequest, FastifyReply } from "fastify";
import {
  ApiResponse,
  CreateInvoiceHeaderDto,
  GetAllHeadersParams,
  UpdateInvoiceHeaderDto,
} from "./invoiceHeader.types";
import * as invoiceHeaderService from "./invoiceHeader.service";

type IdParams = {
  id: string;
};

type GetAllQuery = {
  isActive?: string;
  isDefault?: string;
};

/**
 * GET /api/invoice-headers - Get all headers
 */
export async function getAllInvoiceHeaders(
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const params: GetAllHeadersParams = {
      isActive:
        request.query.isActive === "true"
          ? true
          : request.query.isActive === "false"
            ? false
            : undefined,
      isDefault:
        request.query.isDefault === "true"
          ? true
          : request.query.isDefault === "false"
            ? false
            : undefined,
    };

    const headers = invoiceHeaderService.getAllInvoiceHeaders(params);

    const response: ApiResponse = {
      success: true,
      data: headers,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
}

/**
 * GET /api/invoice-headers/default - Get default header
 */
export async function getDefaultInvoiceHeader(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const header = invoiceHeaderService.getDefaultInvoiceHeader();

    const response: ApiResponse = {
      success: true,
      data: header,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
}

/**
 * GET /api/invoice-headers/stats - Get statistics
 */
export async function getInvoiceHeaderStats(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const stats = invoiceHeaderService.getInvoiceHeaderStats();

    const response: ApiResponse = {
      success: true,
      data: stats,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
}

/**
 * GET /api/invoice-headers/:id - Get header by ID
 */
export async function getInvoiceHeaderById(
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const header = invoiceHeaderService.getInvoiceHeaderById(request.params.id);

    if (!header) {
      const response: ApiResponse = {
        success: false,
        error: "Invoice header not found",
      };
      reply.status(404).send(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: header,
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
}

/**
 * POST /api/invoice-headers - Create new header
 */
export async function createInvoiceHeader(
  request: FastifyRequest<{ Body: CreateInvoiceHeaderDto }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const header = invoiceHeaderService.createInvoiceHeader(request.body);

    const response: ApiResponse = {
      success: true,
      data: header,
      message: "Invoice header created successfully",
    };
    reply.status(201).send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
}

/**
 * PUT /api/invoice-headers/:id - Update header
 */
export async function updateInvoiceHeader(
  request: FastifyRequest<{ Params: IdParams; Body: UpdateInvoiceHeaderDto }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const header = invoiceHeaderService.updateInvoiceHeader(request.params.id, request.body);

    if (!header) {
      const response: ApiResponse = {
        success: false,
        error: "Invoice header not found",
      };
      reply.status(404).send(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: header,
      message: "Invoice header updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
}

/**
 * POST /api/invoice-headers/:id/set-default - Set header as default
 */
export async function setInvoiceHeaderAsDefault(
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const header = invoiceHeaderService.setInvoiceHeaderAsDefault(request.params.id);

    if (!header) {
      const response: ApiResponse = {
        success: false,
        error: "Invoice header not found",
      };
      reply.status(404).send(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: header,
      message: "Default header updated successfully",
    };
    reply.send(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(500).send(response);
  }
}

/**
 * DELETE /api/invoice-headers/:id - Delete header
 */
export async function deleteInvoiceHeader(
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const deleted = invoiceHeaderService.deleteInvoiceHeader(request.params.id);

    if (!deleted) {
      const response: ApiResponse = {
        success: false,
        error: "Invoice header not found",
      };
      reply.status(404).send(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: "Invoice header deleted successfully",
    };
    reply.send(response);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("default") ? 400 : 500;
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
    reply.status(status).send(response);
  }
}
