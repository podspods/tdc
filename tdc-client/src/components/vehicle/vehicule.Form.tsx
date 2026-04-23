import { useEffect, useState } from "react";
import type { CreateVehicleDto, Vehicle } from "./vehicle.types";
import { VEHICLE_DTO_INIT } from "../../common/constant";
import { Button, FormGrid } from "../../common/common.styled";
import FormGroup from "../UI/FormGroup";
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
    props.onSubmit(formData);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup
            label={t("registrationId")}
            name="registrationId"
            value={formData.registrationId.toString()}
            onChange={handleChange}
          />
          <FormGroup
            label={t("plateNumber")}
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
          />
          <FormGroup
            label={t("brand")}
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          <FormGroup
            label={t("model")}
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          <FormGroup
            label={t("year")}
            name="year"
            value={formData.year.toString()}
            onChange={handleChange}
          />
          <FormGroup
            label={t("color")}
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <FormGroup
            label={t("ownerId")}
            name="ownerId"
            value={formData.ownerId.toString()}
            onChange={handleChange}
          />
          <FormGroup
            label={t("mileage")}
            name="mileage"
            value={formData.mileage.toString()}
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
