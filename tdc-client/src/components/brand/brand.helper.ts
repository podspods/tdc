import type { OptionValue } from "../../common/commun.types";
import type { Brand } from "./brand.types";

/**
 * Converts an array of Brand objects into an array of OptionValue.
 * @param brands - Array of brands to convert
 * @returns Array of options with value = brand.id as string, label = brand.brandName
 */
export function brandsToSelectOptions(brands: Brand[]): OptionValue[] {
  return brands.map((brand) => ({
    value: String(brand.id),
    label: brand.name,
  }));
}
