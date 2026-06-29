import { apiRequest } from "../../api/apirequest";
import type { ApiResponse } from "../../common/commun.types";
import type {
  InvoiceLine,
  CreateInvoiceDto,
  UpdateInvoiceDto,
  CreateInvoiceLineDto,
  UpdateInvoiceLineDto,
  Invoice,
  InvoiceInfo,
  InvoiceQueryParams,
  FullInvoicePayload,
} from "./types";

const BASE_URL = "/invoice";

/**
 * Fetch all invoices with pagination and filters.
 */
export async function _getAllInvoices(
  params?: InvoiceQueryParams,
): Promise<ApiResponse<Invoice[]>> {
  const url = BASE_URL;
  return apiRequest<Invoice[]>(url, "get", params, []);
}

//--------------------------------------------------------------------------------------------------------------------------

// client/src/components/invoice/invoice.service.ts
export async function _getInvoicesInfoList(): Promise<ApiResponse<InvoiceInfo[]>> {
  const url = `${BASE_URL}/info`;
  return apiRequest<InvoiceInfo[]>(url, "get", []);
}

//--------------------------------------------------------------------------------------------------------------------------
/**
 * Fetch a single invoice by its ID, including its lines.
 */
export async function _getInvoiceById(id: number): Promise<ApiResponse<Invoice>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Invoice>(url, "get");
}
//--------------------------------------------------------------------------------------------------------------------------
/**
 * Create a new invoice (number is generated server‑side).
 */
export async function _createInvoice(data: CreateInvoiceDto): Promise<ApiResponse<Invoice>> {
  const url = `${BASE_URL}`;
  return apiRequest<Invoice>(url, "post", data);
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _createFullInvoice(
  payload: FullInvoicePayload,
): Promise<ApiResponse<Invoice>> {
  const url = `${BASE_URL}/full`;
  return apiRequest<Invoice>(url, "post", payload);
}
//--------------------------------------------------------------------------------------------------------------------------

/**
 * Update an existing invoice.
 */
export async function _updateInvoice(
  id: number,
  data: UpdateInvoiceDto,
): Promise<ApiResponse<Invoice>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Invoice>(url, "put", data);
}
//--------------------------------------------------------------------------------------------------------------------------

/**
 * Delete an invoice (also deletes its lines).
 */
export async function _deleteInvoice(id: number): Promise<ApiResponse<void>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<void>(url, "delete");
}

// ========== Invoice Lines ==========

/**
 * Add a line to an invoice.
 */

export async function _getInvoiceLine(invoiceId: number): Promise<ApiResponse<InvoiceLine[]>> {
  console.log("_getInvoiceLine", invoiceId);
  const url = `${BASE_URL}/${invoiceId}/lines`;
  console.log("_getInvoiceLine url 89", url);

  return apiRequest<InvoiceLine[]>(url, "get", []);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _addInvoiceLine(
  invoiceId: number,
  data: Omit<CreateInvoiceLineDto, "invoiceId">,
): Promise<ApiResponse<InvoiceLine>> {
  const url = `${BASE_URL}/${invoiceId}/lines`;
  return apiRequest<InvoiceLine>(url, "post", data);
}
//--------------------------------------------------------------------------------------------------------------------------

/**
 * Update an existing invoice line.
 */
export async function _updateInvoiceLine(
  lineId: number,
  data: UpdateInvoiceLineDto,
): Promise<ApiResponse<InvoiceLine>> {
  const url = `${BASE_URL}/lines/${lineId}`;
  return apiRequest<InvoiceLine>(url, "put", data);
}
//--------------------------------------------------------------------------------------------------------------------------

/**
 * Delete an invoice line.
 */
export async function _deleteInvoiceLine(lineId: number): Promise<ApiResponse<void>> {
  const url = `${BASE_URL}/lines/${lineId}`;

  return apiRequest<void>(url, "delete");
}
