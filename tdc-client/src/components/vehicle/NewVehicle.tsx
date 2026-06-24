import { useTranslation } from "react-i18next";
import type { CreateVehicleDto } from "./types";
import { useEffect, useState } from "react";
import { _getAllBrands } from "../brand/service";
import { _getAllModels } from "../model/service";
import type { Brand } from "../brand/types";
import type { Model } from "../model/types";
import { Input } from "../UI/Input";
import { Button, Title } from "../../common/common.styled";
import { Select } from "../UI/Select";
import type { OptionValue } from "../../common/commun.types";

export type NewVehicleProps = {
  vehicleForm: CreateVehicleDto;
  setVehicleForm: (createVehicleDto: CreateVehicleDto) => void;

  handleCreate: () => void;
};
export default function NewVehicle({ ...props }: NewVehicleProps) {
  const { t } = useTranslation(["vehicle"]);

  const [brandOptionList, setBrandOptionList] = useState<OptionValue[]>([]);
  const [modelOptionList, setModelOptionList] = useState<OptionValue[]>([]);

  const [modelList, setModelList] = useState<Model[]>([]);
  const [brandList, setBrandList] = useState<Brand[]>([]);

  const [currentBrand, setCurrentBrand] = useState<number>(0);
  const [currentModel, setCurrentModel] = useState<number>(0);

  //--------------------------------------------------------------------------------------------------------------------------

  const mapBrandToSelect = (brandList: Brand[]) => {
    const optionList: OptionValue[] = brandList.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setBrandOptionList(optionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const mapModelToSelect = (idBrand: number) => {
    if (idBrand > 0) {
      const modelBrandList = modelList.filter((model) => model.brandId == idBrand);
      const optionList: OptionValue[] = modelBrandList.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setModelOptionList(optionList);
    } else {
      setModelOptionList([]);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIdBrand: number = Number(event.target.value);
    setCurrentBrand(newIdBrand);
    console.log("currentBrand", currentBrand, newIdBrand);

    mapModelToSelect(newIdBrand);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = Number(event.target.value);
    props.setVehicleForm({ ...props.vehicleForm, modelId: modelId });
    setCurrentModel(modelId);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    // Charger les listes existantes
    _getAllBrands({ limit: 100 }).then(
      (result) => result.success && mapBrandToSelect(result.data || []),
    );

    _getAllModels({ limit: 0 }).then((result) => result.success && setModelList(result.data || []));
  }, []);
  return (
    <>
      <Title>{t("newVehicle")} </Title>
      <div style={{ marginTop: 10, padding: 10, border: "1px solid #ccc, display : flex" }}>
        <Select
          label={t("brand")}
          options={brandOptionList}
          onChange={handleBrandChange}
          width={"30%"}
        />
        <Select
          label={t("Model")}
          options={modelOptionList}
          onChange={handleModelChange}
          width={"30%"}
        />
        <Input
          width="30%"
          label={t("plateNumber")}
          value={props.vehicleForm.plateNumber}
          onChange={(e) =>
            props.setVehicleForm({ ...props.vehicleForm, plateNumber: e.target.value })
          }
        />
        <Input
          width="30%"
          label={t("vintage")}
          type="number"
          value={props.vehicleForm.vintage}
          onChange={(e) =>
            props.setVehicleForm({ ...props.vehicleForm, vintage: Number(e.target.value) })
          }
        />
        <Input
          width="30%"
          label={t("color")}
          value={props.vehicleForm.color}
          onChange={(e) => props.setVehicleForm({ ...props.vehicleForm, color: e.target.value })}
        />
        <Button onClick={props.handleCreate}>{t("createVehicle")}</Button>
      </div>
    </>
  );
}
