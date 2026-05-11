// types/garage.types.ts
export type GarageInfo = {
  name: string; // Garage name (e.g., "TDC Moto Garage")
  logoUrl: string; // Path or URL to the logo image (e.g., "/images/logo.png")
  address: string; // Full address
  city: string; // Full address
  phone: string; // Contact phone number
  email?: string; // Optional email
  website?: string; // Optional website
  taxCode?: string; // Optional tax identification number
  bankName?: string; // Optional bank name
  bankAccount?: string; // Optional bank account number
};

export type InvoiceData = {
  invoiceNumber: string;
  date: string;
  clientName: string;
  total: number;
};
