import api from "../../api/client";
import type { Owner } from "./owner.types";

export async function getAllOwners(): Promise<Owner[]> {
  try {
    const response = await api.get("/owners");
    if (response.data && response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch owners:", error);
    return [];
  }
}

export async function getOwnerById(id: number): Promise<Owner | null> {
  try {
    const response = await api.get(`/owners/${id}`);
    if (response.data && response.data.success) {
      return response.data.data || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch owner:", error);
    return null;
  }
}
