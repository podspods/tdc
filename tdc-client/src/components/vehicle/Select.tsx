import type { VehicleInfo } from "./types";
import { Select as UISelect } from "../UI/Select";
import { useTranslation } from "react-i18next";

export type SelectProps = {
  vehicleInfoList: VehicleInfo[];
  onChange: (id: number) => void;
  vehicleSelected: number;
};
export function Select({ ...props }: SelectProps) {
  const { t } = useTranslation(["vehicle"]);

  return (
    <UISelect
      width="10rem"
      options={props.vehicleInfoList.map((record) => ({
        value: record.vehicle.id.toString(),
        label: ` ${record.brand.name} - ${record.model.name} ${record.vehicle.plateNumber}`,
      }))}
      placeholder={t("selectExistingVehicle")}
      label={t("selectExistingVehicle")}
      value={props.vehicleSelected}
      onChange={(e) => props.onChange(Number(e.target.value))}
    >
      <option value={0}>{t("selectExistingVehicle")}</option>
    </UISelect>
  );
}
