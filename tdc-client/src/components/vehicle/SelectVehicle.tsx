import { Select } from "../../common/common.styled";
import type { Vehicle } from "../vehicle/vehicle.types";

export type SelectVehicleProps = {
  selectedVehicleId: number;
  setSelectedVehicleId: (id: number) => void;
  filteredVehicles: Vehicle[];
};
export default function SelectVehicle({ ...props }: SelectVehicleProps) {
  return (
    <>
      <label>Vehicle</label>
      <Select
        value={props.selectedVehicleId}
        onChange={(e) => props.setSelectedVehicleId(Number(e.target.value))}
      >
        <option value={0}>-- Select existing vehicle --</option>
        {props.filteredVehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {/* {v.plateNumber} - {v.brand} {v.model} */}
            {vehicle.plateNumber}
          </option>
        ))}
      </Select>
    </>
  );
}
