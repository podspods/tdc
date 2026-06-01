import { useEffect, useState } from "react";
import type { CreateVehicleDto, Vehicle } from "./vehicle.types";
import { VEHICLE_DTO_INIT } from "../../common/constant";
import { Button, FormGrid } from "../../common/common.styled";
import FormGroup from "../UI.v0/FormGroup";
import { useTranslation } from "react-i18next";

export type FormProps = {
  initialData?: Vehicle | null;
  onSubmit: (data: CreateVehicleDto) => void;
  onCancel: () => void;
  isLoading: boolean;
};
export default function Form({ ...props }: FormProps) {
  const { t } = useTranslation(["vehicle"]);

  const [formData, setFormData] = useState<CreateVehicleDto>(VEHICLE_DTO_INIT);

  useEffect(() => {
    if (props.initialData) {
      setFormData(VEHICLE_DTO_INIT);
    }
  }, [props.initialData]);
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log("handleSubmit vehicule.form", formData);
    props.onSubmit(formData);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    console.log("handleChange =>", e.target);
    console.log("handleChange name=>", e.target.name);
    console.log("handleChange value=>", e.target.value);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("formData", formData);
  }

  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup
            label={t("plateNumber")} // check if exist  ???????????????????
            name="plateNumber"
            value={formData.plateNumber || ""}
            onChange={handleChange}
          />

          <FormGroup
            label={t("modelId")}
            name="modelId"
            value={formData.modelId?.toString() || ""}
            onChange={handleChange}
          />
          <FormGroup
            label={t("vintage")}
            name="vintage"
            value={formData.vintage || ""}
            onChange={handleChange}
          />
          <FormGroup
            label={t("color")}
            name="color"
            value={formData.color || ""}
            onChange={handleChange}
          />
          <FormGroup
            label={t("ownerId")}
            name="ownerId"
            value={formData.ownerId || ""}
            onChange={handleChange}
          />
          <FormGroup
            label={t("mileage")}
            name="mileage"
            value={formData.mileage || ""}
            onChange={handleChange}
          />
        </FormGrid>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}
        >
          <Button type="button" variant="secondary" onClick={props.onCancel}>
            {t("cancel")}
          </Button>
          <Button type="submit" variant="primary" disabled={props.isLoading}>
            {props.isLoading
              ? t("saving")
              : props.initialData
                ? t("updateVehicle")
                : t("createVehicle")}
          </Button>
        </div>
      </form>
    </>
  );
}
