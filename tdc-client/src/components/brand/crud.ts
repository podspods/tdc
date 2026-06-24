import { brandInit } from "../../common/constant";
import { _getAllBrands, _getBrandById } from "./service";
import type { Brand } from "./types";

export async function getBrandList(): Promise<Brand[]> {
  const reply = await _getAllBrands({ limit: 0 });
  if (reply.success && reply.data) {
    return reply.data;
  }
  return [];
}

export async function getBrandById(id: number): Promise<Brand> {
  const reply = await _getBrandById(id);
  if (reply.success && reply.data) {
    return reply.data;
  }
  return brandInit;
}
