import { _getAllOwners, _getOwnerById } from "./service";
import type { Owner } from "./types";
import { ownerInit } from "../../common/constant";

export async function getOwnerById(id: number): Promise<Owner> {
  const ownerResponse = await _getOwnerById(id);
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return ownerInit;
}

export async function getAllOwner(): Promise<Owner[]> {
  const ownerResponse = await _getAllOwners();
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return [];
}
