import fs from "fs";
import path from "path";
import {
  InvoiceHeader,
  InvoiceHeadersData,
  CreateInvoiceHeaderDto,
  UpdateInvoiceHeaderDto,
  GetAllHeadersParams,
  StatsResponse,
} from "./invoiceHeader.types";

const DATA_PATH = path.join(__dirname, "./invoiceHeaders.json");

let cachedData: InvoiceHeadersData | null = null;

/**
 * Load data from JSON file
 */
function loadData(): InvoiceHeadersData {
  try {
    if (cachedData) {
      return cachedData;
    }
    const rawData = fs.readFileSync(DATA_PATH, "utf-8");
    cachedData = JSON.parse(rawData);
    return cachedData as InvoiceHeadersData;
  } catch (error) {
    console.error("Failed to load invoice headers data:", error);
    throw new Error("Failed to load invoice headers data");
  }
}

/**
 * Save data to JSON file
 */
function saveData(data: InvoiceHeadersData): void {
  try {
    data.lastUpdated = new Date().toISOString();
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(DATA_PATH, jsonData, "utf-8");
    cachedData = data;
  } catch (error) {
    console.error("Failed to save invoice headers data:", error);
    throw new Error("Failed to save invoice headers data");
  }
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `header_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Get all invoice headers
 */
export function getAllInvoiceHeaders(params?: GetAllHeadersParams): InvoiceHeader[] {
  const data = loadData();
  let headers = [...data.headers];

  if (params?.isActive !== undefined) {
    headers = headers.filter((h) => h.isActive === params.isActive);
  }

  if (params?.isDefault !== undefined) {
    headers = headers.filter((h) => h.isDefault === params.isDefault);
  }

  return headers;
}

/**
 * Get invoice header by ID
 */
export function getInvoiceHeaderById(id: string): InvoiceHeader | null {
  const data = loadData();
  const header = data.headers.find((h) => h.id === id);
  return header || null;
}

/**
 * Get default invoice header
 */
export function getDefaultInvoiceHeader(): InvoiceHeader | null {
  const data = loadData();
  const defaultHeader = data.headers.find((h) => h.isDefault === true && h.isActive === true);
  return defaultHeader || data.headers[0] || null;
}

/**
 * Create new invoice header
 */
export function createInvoiceHeader(data: CreateInvoiceHeaderDto): InvoiceHeader {
  const currentData = loadData();

  const id = generateId();
  const isDefault = data.isDefault || false;

  // If this is default, unset other defaults
  if (isDefault) {
    currentData.headers.forEach((header) => {
      header.isDefault = false;
    });
  }

  const newHeader: InvoiceHeader = {
    id,
    name: data.name,
    isDefault,
    isActive: data.isActive !== undefined ? data.isActive : true,
    companyName: data.companyName,
    companyLogo: data.companyLogo,
    companyAddress: data.companyAddress,
    companyPhone: data.companyPhone,
    companyEmail: data.companyEmail,
    companyWebsite: data.companyWebsite,
    taxCode: data.taxCode,
    bankName: data.bankName,
    bankAccount: data.bankAccount,
    bankAccountName: data.bankAccountName,
    footerText: data.footerText,
    termsAndConditions: data.termsAndConditions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: data.createdBy,
  };

  currentData.headers.push(newHeader);
  saveData(currentData);

  return newHeader;
}

/**
 * Update invoice header
 */
export function updateInvoiceHeader(
  id: string,
  updates: UpdateInvoiceHeaderDto,
): InvoiceHeader | null {
  const currentData = loadData();
  const index = currentData.headers.findIndex((h) => h.id === id);

  if (index === -1) {
    return null;
  }

  const currentHeader = currentData.headers[index];

  // Handle default flag
  if (updates.isDefault === true && !currentHeader.isDefault) {
    currentData.headers.forEach((header) => {
      header.isDefault = false;
    });
  }

  const updatedHeader: InvoiceHeader = {
    ...currentHeader,
    ...updates,
    isDefault: updates.isDefault !== undefined ? updates.isDefault : currentHeader.isDefault,
    isActive: updates.isActive !== undefined ? updates.isActive : currentHeader.isActive,
    updatedAt: new Date().toISOString(),
  };

  currentData.headers[index] = updatedHeader;
  saveData(currentData);

  return updatedHeader;
}

/**
 * Delete invoice header
 */
export function deleteInvoiceHeader(id: string): boolean {
  const currentData = loadData();
  const index = currentData.headers.findIndex((h) => h.id === id);

  if (index === -1) {
    return false;
  }

  // Check if trying to delete default header
  if (currentData.headers[index].isDefault) {
    throw new Error("Cannot delete the default invoice header");
  }

  currentData.headers.splice(index, 1);
  saveData(currentData);

  return true;
}

/**
 * Set header as default
 */
export function setInvoiceHeaderAsDefault(id: string): InvoiceHeader | null {
  const currentData = loadData();
  const targetIndex = currentData.headers.findIndex((h) => h.id === id);

  if (targetIndex === -1) {
    return null;
  }

  // Unset all defaults
  currentData.headers.forEach((header) => {
    header.isDefault = false;
  });

  // Set new default
  currentData.headers[targetIndex].isDefault = true;
  currentData.headers[targetIndex].updatedAt = new Date().toISOString();

  saveData(currentData);

  return currentData.headers[targetIndex];
}

/**
 * Get invoice header statistics
 */
export function getInvoiceHeaderStats(): StatsResponse {
  const headers = getAllInvoiceHeaders();
  const activeCount = headers.filter((h) => h.isActive).length;
  const inactiveCount = headers.filter((h) => !h.isActive).length;
  const defaultHeader = headers.find((h) => h.isDefault);

  return {
    total: headers.length,
    active: activeCount,
    inactive: inactiveCount,
    defaultHeader: defaultHeader
      ? {
          id: defaultHeader.id,
          name: defaultHeader.name,
          companyName: defaultHeader.companyName,
        }
      : null,
  };
}

/**
 * Reload cache
 */
export function reloadInvoiceHeadersCache(): InvoiceHeadersData {
  cachedData = null;
  return loadData();
}
