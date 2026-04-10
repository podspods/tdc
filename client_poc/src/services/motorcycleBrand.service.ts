import type { BrandOption } from "../types/motorcycleBrand.types";
import { apiClient } from "./api-client";

export const createMotorcycleBrandService = () => {
  const baseUrl = "/api/motorcycle-brands";

  const getAllOptions = async (): Promise<BrandOption[]> => {
    const response = await apiClient.get(baseUrl);
    return response.data.data.map((brand: any) => ({
      brandId: brand.brandId,
      brandName: brand.brandName,
      countryOfOrigin: brand.countryOfOrigin,
    }));
  };

  return { getAllOptions };
};

export const motorcycleBrandService = createMotorcycleBrandService();
