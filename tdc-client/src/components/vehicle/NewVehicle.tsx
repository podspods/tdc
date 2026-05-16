import { useTranslation } from "react-i18next";
import type { CreateVehicleDto } from "./vehicle.types";
import { useEffect, useState } from "react";
import { _getAllBrands } from "../brand/brand.service";
import { _getAllModels } from "../model/model.service";
import type { Brand } from "../brand/brand.types";
import type { ModelQueryParams } from "../model/model.types";
import { Input } from "../UI/Input";
import { Button } from "../../common/common.styled";

export type NewVehicleProps = {
  vehicleForm: CreateVehicleDto;
  setVehicleForm: (createVehicleDto: CreateVehicleDto) => void;

  handleCreate: () => void;
};
export default function NewVehicle({ ...props }: NewVehicleProps) {
  const { t } = useTranslation(["vehicle"]);

  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [modelList, setModelList] = useState<ModelQueryParams[]>([]);
  const [currentBrand, setCurrentBrand] = useState<number>(0);
  const [currentModel, setCurrentModel] = useState<number>(0);

  useEffect(() => {
    // Charger les listes existantes
    _getAllBrands().then((res) => res.success && setBrandList(res.data || []));
    _getAllModels().then((res) => res.success && setModelList(res.data || []));
  }, []);
  return (
    <>
      <h1>NewVehicle</h1>
      <div style={{ marginTop: 10, padding: 10, border: "1px solid #ccc" }}>
        <Input
          label={t("plateNumber")}
          value={props.vehicleForm.plateNumber}
          onChange={(e) =>
            props.setVehicleForm({ ...props.vehicleForm, plateNumber: e.target.value })
          }
        />

        {/* <Input select brand select model
                placeholder="Brand"
                value={props.vehicleForm.brand}
                onChange={(e) => props.setVehicleForm({ ...props.vehicleForm, brand: e.target.value })}
              />
              <Input
                placeholder="Model"
                value={props.vehicleForm.model}
                onChange={(e) => props.setVehicleForm({ ...props.vehicleForm, model: e.target.value })}
              /> */}
        <Input
          label={t("vintage")}
          type="number"
          value={props.vehicleForm.vintage}
          onChange={(e) =>
            props.setVehicleForm({ ...props.vehicleForm, vintage: Number(e.target.value) })
          }
        />
        <Input
          label={t("color")}
          value={props.vehicleForm.color}
          onChange={(e) => props.setVehicleForm({ ...props.vehicleForm, color: e.target.value })}
        />
        <Button onClick={props.handleCreate}>{t("createVehicle")}</Button>
      </div>
    </>
  );
}
