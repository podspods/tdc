import { zownerInit } from "../Invoice/Pdf.types";
import { _getOwnerById } from "./service";
import type { Owner } from "./owner.types";

export async function getOwnerById(id: number): Promise<Owner> {
  const ownerResponse = await _getOwnerById(id);
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return zownerInit;
}
