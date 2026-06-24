import { useTranslation } from "react-i18next";
import { Select } from "../../common/common.styled";
import type { Brand } from "./types";

export type SelectBrandProps = {
  selectedBrandId: number;
  setSelectedBrandId: (id: number) => void;
  brandList: Brand[];
};
export default function SelectBrand({ ...props }: SelectBrandProps) {
  const { t } = useTranslation(["brand"]);

  return (
    <>
      <Select
        value={props.selectedBrandId}
        onChange={(e) => props.setSelectedBrandId(Number(e.target.value))}
      >
        <option value={0}> {t("selectExistingBrand")}</option>
        {props.brandList.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {/* {v.plateNumber} - {v.brand} {v.model} */}
            {brand.name}
          </option>
        ))}
      </Select>
    </>
  );
}
