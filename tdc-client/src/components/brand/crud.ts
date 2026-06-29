import toast from "react-hot-toast";
import { brandInit } from "../../common/constant";
import { _createBrand, _getAllBrands, _getBrandById, _updateBrand } from "./service";
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

export async function createOrUpdate(brand: Brand): Promise<Brand> {
  if (brand.id === brandInit.id) {
    const response = await _createBrand(brand);
    if (response.success && response.data) {
      toast.success(`Create : ${response.success}`);
      return response.data;
    }
    toast.error(`Create : ${response.success}`);

    return brand;
  } else {
    const response = await _updateBrand(brand.id, brand);
    if (response.success && response.data) {
      toast.success(`Update : ${response.success}`);
      return response.data;
    }
    toast.error(`Update : ${response.success}`);
    return brand;
  }
}
