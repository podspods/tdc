import { invoiceInit } from "../../common/constant";
import { _getInvoiceById, _getInvoiceLine, _getInvoicesInfoList } from "./invoice.service";
import type { Invoice, InvoiceInfo, InvoiceLine } from "./invoice.types";

export async function getInvoiceById(id: number): Promise<Invoice> {
  const response = await _getInvoiceById(id);
  if (response.success && response.data) {
    return response.data;
  }
  return invoiceInit;
}

export async function getInvoiceLineById(id: number): Promise<InvoiceLine[]> {
  const response = await _getInvoiceLine(id);
  if (response.success && response.data) {
    return response.data;
  }
  return [];
}

export async function getInvoicesInfoList(): Promise<InvoiceInfo[]> {
  const response = await _getInvoicesInfoList();
  if (response.success && response.data) {
    return response.data;
  }
  return [];
}
