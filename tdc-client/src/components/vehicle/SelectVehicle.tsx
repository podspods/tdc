import { useTranslation } from "react-i18next";
import { Select } from "../UI/Select";
import type { Vehicle } from "../vehicle/types";

export type SelectVehicleProps = {
  selectedVehicleId: number;
  setSelectedVehicleId: (id: number) => void;
  filteredVehicles: Vehicle[];
};
export default function SelectVehicle({ ...props }: SelectVehicleProps) {
  const { t } = useTranslation(["vehicle"]);

  return (
    <>
      <label>Vehicle</label>
      <Select
        label={t("vehicle")}
        placeholder={t("selectExistingVehicle")}
        value={props.selectedVehicleId}
        onChange={(e) => props.setSelectedVehicleId(Number(e.target.value))}
        options={props.filteredVehicles.map((vehicle) => ({
          value: vehicle.id.toString(),
          label: `${vehicle.plateNumber}`,
        }))}
      />
    </>
  );
}
