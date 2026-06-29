import { useEffect, useState } from "react";
import type { Garage } from "../components/garage/garage.types";
import { _getAllGarages } from "../components/garage/garage.service";
import { Select } from "../components/UI/Select";
import type { OptionValue } from "../common/commun.types";
import { garage2Option, saveSelectedGarageId } from "../common/common";
import { Button } from "../common/common.styled";

export default function Setting() {
  const [garageList, setGarageList] = useState<Garage[]>([]);
  const [optionList, setOptionList] = useState<OptionValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [reload, setRload] = useState<number>(42);
  const [currentGarageId, setCurrentGarageId] = useState<number>(42);

  const loadGarages = async () => {
    setLoading(true);
    const response = await _getAllGarages();
    if (response.success) {
      if (response.data?.length) {
        const optionList = garage2Option(response.data);
        setOptionList(optionList);
      }

      setGarageList(response.data || []);
    }
    setLoading(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handlClick = () => {
    setRload((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentGarageId(Number(event.target.value));
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSave = () => {
    saveSelectedGarageId(currentGarageId);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    loadGarages();
  }, [reload]);
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <h1>
        Setting {reload} - {currentGarageId} {garageList.length} {loading}
      </h1>
      <Button onClick={handlClick}>reload</Button>
      <Select label="garage" options={optionList} onChange={handeChange} />
      <Button onClick={handleSave}>Save garage default</Button>
    </>
  );
}
