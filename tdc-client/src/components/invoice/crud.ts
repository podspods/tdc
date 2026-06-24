export async function getInvoiceLine(invoiceId: number): Promise<InvoiceLine[]> {
  const linesRes = await _getInvoiceLine(invoiceId);
  return linesRes.success && linesRes.data ? linesRes.data : [];
}

import { invoiceInit, InvoiceLineInit } from "../../common/constant";
import { _updatePartAndLabor } from "../partAndLabor/service";
import {
  _addInvoiceLine,
  _createInvoice,
  _deleteInvoiceLine,
  _getInvoiceById,
  _getInvoiceLine,
  _getInvoicesInfoList,
  _updateInvoice,
  _updateInvoiceLine,
} from "./service";
import type {
  CreateInvoiceLineDto,
  Invoice,
  InvoiceInfo,
  InvoiceLine,
  UpdateInvoiceLineDto,
} from "./types";

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

export async function updateInvoice(invoice: Invoice): Promise<Invoice> {
  const response = await _updateInvoice(invoice.id, invoice);
  if (response.success && response.data) {
    return response.data;
  }
  return invoice;
}

export async function createInvoice(invoice: Invoice): Promise<Invoice> {
  console.log("createInvoice 54", invoice);
  const response = await _createInvoice(invoice);
  if (response.success && response.data) {
    return response.data;
  }
  return invoice;
}

export async function saveInvoiceLine(
  id: number,
  invoiceLine: UpdateInvoiceLineDto,
): Promise<InvoiceLine> {
  const response = await _updateInvoiceLine(id, invoiceLine);
  if (response.success && response.data) {
    return response.data;
  }
  return InvoiceLineInit;
}

export async function deleteInvoiceLine(id: number): Promise<void> {
  const response = await _deleteInvoiceLine(id);
  if (response.success && response.data) {
    return response.data;
  }
}

export async function addInvoiceLine(line: CreateInvoiceLineDto): Promise<InvoiceLine> {
  const response = await _addInvoiceLine(line.invoiceId, line);
  if (response.success && response.data) {
    await _updatePartAndLabor(line.partAndLaborId, { lastTimeUsed: new Date() });
    return response.data;
  }
  return InvoiceLineInit;
}
