import api from "../../api/client";
import type { Invoice } from "./Invoice.types";

const BASE_URL = "/invoices";

export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    const response = await api.get(BASE_URL);
    if (response.data && response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    return [];
  }
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    if (response.data && response.data.success) {
      return response.data.data || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return null;
  }
}

export async function createInvoice(data: any): Promise<Invoice | null> {
  try {
    const response = await api.post(BASE_URL, data);
    if (response.data && response.data.success) {
      return response.data.data || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to create invoice:", error);
    return null;
  }
}

export async function updateInvoice(id: string, data: any): Promise<Invoice | null> {
  try {
    const response = await api.put(`${BASE_URL}/${id}`, data);
    if (response.data && response.data.success) {
      return response.data.data || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to update invoice:", error);
    return null;
  }
}

export async function deleteInvoice(id: string): Promise<boolean> {
  try {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data && response.data.success;
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    return false;
  }
}

export async function addPayment(
  invoiceId: string,
  amount: number,
  method: string,
): Promise<boolean> {
  try {
    const response = await api.post(`${BASE_URL}/${invoiceId}/payments`, { amount, method });
    return response.data && response.data.success;
  } catch (error) {
    console.error("Failed to add payment:", error);
    return false;
  }
}

export async function addLaborItem(invoiceId: string, item: any): Promise<boolean> {
  try {
    const response = await api.post(`${BASE_URL}/${invoiceId}/labor`, item);
    return response.data && response.data.success;
  } catch (error) {
    console.error("Failed to add labor item:", error);
    return false;
  }
}

export async function addPartItem(invoiceId: string, item: any): Promise<boolean> {
  try {
    const response = await api.post(`${BASE_URL}/${invoiceId}/parts`, item);
    return response.data && response.data.success;
  } catch (error) {
    console.error("Failed to add part item:", error);
    return false;
  }
}

export async function addConsumableItem(invoiceId: string, item: any): Promise<boolean> {
  try {
    const response = await api.post(`${BASE_URL}/${invoiceId}/consumables`, item);
    return response.data && response.data.success;
  } catch (error) {
    console.error("Failed to add consumable item:", error);
    return false;
  }
}

export async function removeLaborItem(invoiceId: string, itemId: string): Promise<boolean> {
  try {
    const response = await api.delete(`${BASE_URL}/${invoiceId}/labor/${itemId}`);
    return response.data && response.data.success;
  } catch (error) {
    console.error("Failed to remove labor item:", error);
    return false;
  }
}

export async function removePartItem(invoiceId: string, itemId: string): Promise<boolean> {
  try {
    const response = await api.delete(`${BASE_URL}/${invoiceId}/parts/${itemId}`);
    return response.data && response.data.success;
  } catch (error) {
    console.error("Failed to remove part item:", error);
    return false;
  }
}

export async function removeConsumableItem(invoiceId: string, itemId: string): Promise<boolean> {
  try {
    const response = await api.delete(`${BASE_URL}/${invoiceId}/consumables/${itemId}`);
    return response.data && response.data.success;
  } catch (error) {
    console.error("Failed to remove consumable item:", error);
    return false;
  }
}
