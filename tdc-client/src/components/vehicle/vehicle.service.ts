import api from "../../api/client";
import type { Vehicle } from "./vehicle.types";

export async function getAllVehicles(): Promise<Vehicle[]> {
  try {
    const response = await api.get("/vehicles");
    if (response.data && response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return [];
  }
}

export async function getVehicleById(id: number): Promise<Vehicle | null> {
  try {
    const response = await api.get(`/vehicles/${id}`);
    if (response.data && response.data.success) {
      return response.data.data || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch vehicle:", error);
    return null;
  }
}

export async function getVehiclesByOwner(ownerId: number): Promise<Vehicle[]> {
  try {
    const response = await api.get(`/vehicles/owner/${ownerId}`);
    if (response.data && response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch vehicles by owner:", error);
    return [];
  }
}
