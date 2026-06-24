import { useEffect, useState } from "react";
import { getSelectedGarageId } from "../../common/common";
import { _getGarageById } from "./garage.service";
import type { Garage } from "./garage.types";
import { garageInit } from "../../common/constant";
import { getGarageList } from "./crud";
import Badge from "./Badge";

export type DisplayProps = {
  value: Garage;
  editMode?: boolean;
  onChange?: (garageId: number) => void;
};
export default function Display({ ...props }: DisplayProps) {
  const [currentGarage, setCurrentGarage] = useState<Garage>(props.value);
  const [garageList, setGarageList] = useState<Garage[]>([]);

  useEffect(() => {
    const loadGarageList = async () => {
      const garageList = await getGarageList();
      setGarageList(garageList);
    };
    loadGarageList();
  }, [props.value]);

  useEffect(() => {
    const loadGarage = async () => {
      const garageId = props.value.id ? props.value.id : getSelectedGarageId();
      if (!garageId) return;

      const currentGarage = garageList.find((garage) => garage.id === garageId);
      setCurrentGarage(currentGarage || garageInit);
      props.onChange?.(currentGarage?.id ? currentGarage.id : garageInit.id);
    };

    loadGarage();
  }, [garageList]);
  //--------------------------------------------------------------------------------------------------------------------------

  const handleChange = (id: number) => {
    if (id) {
      const currentGarage = garageList.find((garage) => garage.id === id);
      setCurrentGarage(currentGarage || garageInit);
      props.onChange?.(currentGarage?.id ? currentGarage.id : garageInit.id);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <Badge
      value={currentGarage}
      editMode={props.editMode}
      onChange={handleChange}
      garageList={garageList}
    />
  );
}
