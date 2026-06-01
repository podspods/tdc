import { dateInit, INIT_USER, vehicleInit, zgarageInit } from "../../common/constant";
import type { Garage, GarageInfo } from "../Garage/garage.types";
import type { Owner, OwnerInfo } from "../owner/owner.types";
import type { Vehicle } from "../vehicle/vehicle.types";

export type InvoiceItem = {
  id: number;
  name: string;
  price: number;
  discount: number;
};

export type PdfDataHeader = {
  garage: Garage;
  owner: Owner;
  vehicle: Vehicle;
  invoiceNumber: string;
  invoiceDate: Date;
};

export const ownerInfoInit: OwnerInfo = {
  firstName: "firstName init",
  lastName: "lastName init",
  phoneNumber: "+33 1234123412",
  address: "C15/25 address init",
  city: "Thành phố Hồ Chí Minh",
};

export const zownerInit: Owner = {
  ...ownerInfoInit,
  id: 0,
  totalMotorcycles: 0,
  totalInvoices: 0,
  totalSpent: 0,
  lastVisitDate: dateInit,
  createdBy: INIT_USER,
  createdAt: dateInit,
  email: "",
  category: 0,
  status: 0,
  notes: "",
  updatedAt: dateInit,
};

export const garageInfoInit: GarageInfo = {
  name: "TDC Moto Garage",
  logoUrl: "/logo.jpg",
  address: "123 Lê Lợi, Quận 1",
  zipcode: "70000",
  city: "TP. Hồ  Chí Minh",
  phone: "028 1234 5678",
  email: "contact@tdcmoto.com",
  taxCode: "1234567890",
  website: "garage-website.com",
  bankName: "garage-bankName",
  bankAccount: "garage-bankAccount",
  taxRate: 0,
};

export const PdfHeaderInit: PdfDataHeader = {
  garage: zgarageInit,

  owner: zownerInit,
  vehicle: vehicleInit,
  invoiceNumber: "invoiceId-init",
  invoiceDate: new Date(1975, 4, 30),
};
