import type { CreateOwnerDto, Owner } from "../owner/owner.types";
import type { GarageInfo } from "./invoice.types";

export type PdfRow = {
  id: number;
  name: string;
  price: number;
  discount: number;
};

export type PdfHeader = {
  garage: GarageInfo;
  owner: CreateOwnerDto;
  vehicleInfo: string;
  invoiceId: string;
};
