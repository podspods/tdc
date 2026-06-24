import type { Garage } from "./garage.types";
import { Select as UISelect } from "../UI/Select";
import { useTranslation } from "react-i18next";

export type SelectProps = {
  garageList: Garage[];
  onChange: (id: number) => void;
  garageSelected: number;
};
export default function Select({ ...props }: SelectProps) {
  const { t } = useTranslation(["garage"]);

  return (
    <UISelect
      width="10rem"
      options={props.garageList.map((garage) => ({
        value: garage.id.toString(),
        label: garage.name,
      }))}
      placeholder={t("selectExistingGarage")}
      label={t("selectExistingGarage")}
      value={props.garageSelected}
      onChange={(e) => props.onChange(Number(e.target.value))}
    >
      <option value={0}>{t("selectExistingGarage")}</option>
    </UISelect>
  );
}
