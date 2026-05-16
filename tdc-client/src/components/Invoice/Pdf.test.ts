import type { OwnerInfo } from "../owner/owner.types";
import type { GarageInfo, Invoice } from "./invoice.types";
import type { InvoiceItem, PdfDataHeader } from "./Pdf.types";

export const dateTest = new Date(2000, 31, 12);

export const garageTest: GarageInfo = {
  name: "TDC Moto Garage",
  logoUrl: "/logo.jpg",
  address: "123 Lê Lợi, Quận 1",
  city: "TP. Hồ  Chí Minh",
  phone: "028 1234 5678",
  email: "contact@tdcmoto.com",
  taxCode: "1234567890",
  website: "garage-website.com",
  bankName: "garage-bankName",
  bankAccount: "garage-bankAccount",
  taxRate: 0.1,
};

export const ownerTest: OwnerInfo = {
  firstName: "Pierre",
  lastName: "Durand",
  phoneNumber: "+33 1234123412",
  address: "C15/25 đường Phạm Hùng nối dà",
  city: "Thành phố Hồ Chí Minh",
};

export const vehicleInfoTest: string = "Honda Winner bleu/blanc/rouge 59A1-378.06 40000km";
export const invoiceNulberText: string = "2026-INV1";

export const headerTest: PdfDataHeader = {
  garage: garageTest,
  owner: ownerTest,
  vehicleInfo: vehicleInfoTest,
  invoiceNumber: invoiceNulberText,
  invoiceDate: dateTest,
};

export const taskListsTest: InvoiceItem[] = [
  { id: 1, name: "un", price: 1000, discount: 0 },

  { id: 2, name: "deux", price: 21000, discount: 0.25 },
  { id: 3, name: "trois", price: 31000, discount: 0.5 },
  { id: 4, name: "quatre", price: 41000, discount: 0.75 },
  { id: 5, name: "cinq", price: 51000, discount: 0.1 },
  { id: 6, name: "six", price: 61000, discount: 0.2 },
];

export const sparePartListTest: InvoiceItem[] = [
  { id: 1, name: "spare part un", price: 500000, discount: 0.1 },
  { id: 2, name: "spare part DEUX", price: 600000, discount: 0.2 },
  { id: 3, name: "spare part trois", price: 700000, discount: 0.3 },
  { id: 4, name: "spare part quatre", price: 800000, discount: 0.4 },
  { id: 5, name: "spare part cinq", price: 900000, discount: 0.5 },
  { id: 6, name: "spare part six", price: 1000000, discount: 1 },
];
export const consumablelistTest: InvoiceItem[] = [
  { id: 1, name: "consumable part un", price: 510000, discount: 0.6 },
  { id: 2, name: "consumable part DEUX", price: 610000, discount: 0.7 },
  { id: 3, name: "consumable part trois", price: 710000, discount: 0.75 },
  { id: 4, name: "consumable part quatre", price: 810000, discount: 0.25 },
  { id: 5, name: "consumable part cinq", price: 910000, discount: 0.5 },
  { id: 6, name: "consumable part six", price: 1100000, discount: 0 },
];

export const invoiceTest: Invoice = {
  invoiceId: 0,
  garageId: 0,
  vehicleId: 0,
  invoiceNumber: "0",
  issueDate: new Date(),
  dueDate: new Date(),
  statusCode: 0,
  createdBy: "0",
  createdAt: new Date(),
  updatedAt: new Date(),
};
