import { _createOwner, _getAllOwners, _getOwnerById, _updateOwner } from "./service";
import type { Owner } from "./types";
import { ownerInit } from "../../common/constant";
import toast from "react-hot-toast";

export async function getOwnerById(id: number): Promise<Owner> {
  const ownerResponse = await _getOwnerById(id);
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return ownerInit;
}

export async function getOwnerList(): Promise<Owner[]> {
  const ownerResponse = await _getAllOwners();
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return [];
}

export async function createOrUpdate(owner: Owner): Promise<Owner> {
  if (owner.id === ownerInit.id) {
    const response = await _createOwner(owner);
    if (response.success && response.data) {
      toast.success(` Create owner success : ${response.success}`);
      return response.data;
    }
    toast.error(` Create owner error : ${response.success}`);
    return owner;
  } else {
    const response = await _updateOwner(owner.id, owner);
    if (response.success && response.data) {
      toast.success(` Update owner success : ${response.success}`);
      return response.data;
    }
    toast.error(` Update owner error : ${response.success}`);
    return owner;
  }
}
