import { useEffect, useState } from "react";
import type { CreateTaskDto, Task } from "./task.types";
import { TASK_DTO_INIT } from "../../common/constant";
import { Button, FormGrid } from "../../common/common.styled";
import FormGroup from "../UI.v0/FormGroup";
import { useTranslation } from "react-i18next";

export type FormProps = {
  initialData?: Task | null;
  onSubmit: (data: CreateTaskDto) => void;
  onCancel: () => void;
  isLoading: boolean;
};
export default function Form({ ...props }: FormProps) {
  const { t } = useTranslation(["task"]);

  const [formData, setFormData] = useState<CreateTaskDto>(TASK_DTO_INIT);

  useEffect(() => {
    if (props.initialData) {
      setFormData(TASK_DTO_INIT);
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

  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup
            label={t("code")} // check if exist  ???????????????????
            name="code"
            value={formData.code || ""}
            onChange={handleChange}
          />

          <FormGroup label={t("name")} name="name" value={formData.name} onChange={handleChange} />
          <FormGroup
            label={t("description")}
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
          />
          <FormGroup
            label={t("durationHours")}
            name="durationHours"
            value={formData.durationHours || 0}
            onChange={handleChange}
          />
          <FormGroup
            label={t("skillLevel")}
            name="skillLevel"
            value={formData.skillLevel || 0}
            onChange={handleChange}
          />
          <FormGroup
            label={t("brandId")}
            name="brandId"
            value={formData.brandId || 0}
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
            {props.isLoading ? t("saving") : props.initialData ? t("updateTask") : t("createTask")}
          </Button>
        </div>
      </form>
    </>
  );
}
