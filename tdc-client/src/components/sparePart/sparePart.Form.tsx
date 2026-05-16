import { useEffect, useState } from "react";
import type { CreateSparePartDto, SparePart } from "./sparePart.types";
import { SPARE_PART_DTO_INIT } from "../../common/constant";
import { Button, FormGrid } from "../../common/common.styled";
import FormGroup from "../UI.v0/FormGroup";
import { useTranslation } from "react-i18next";

export type FormProps = {
  initialData?: SparePart | null;
  onSubmit: (data: CreateSparePartDto) => void;
  onCancel: () => void;
  isLoading: boolean;
};
export default function Form({ ...props }: FormProps) {
  const { t } = useTranslation(["sparePart"]);

  const [formData, setFormData] = useState<CreateSparePartDto>(SPARE_PART_DTO_INIT);

  useEffect(() => {
    if (props.initialData) {
      setFormData(props.initialData);
    } else setFormData(SPARE_PART_DTO_INIT);
  }, [props.initialData]);
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    props.onSubmit(formData);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    console.log("handleChange", e);
    console.log("handleChange target", e.target);
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
            label={t("purchasePrice")}
            name="purchasePrice"
            value={formData.purchasePrice || 0}
            onChange={handleChange}
          />
          <FormGroup
            label={t("sellingPrice")}
            name="sellingPrice"
            value={formData.sellingPrice || 0}
            onChange={handleChange}
          />
          <FormGroup
            label={t("markupMultiplier")}
            name="markupMultiplier"
            value={formData.markupMultiplier || 0}
            onChange={handleChange}
          />
          <FormGroup
            label={t("stockQuantity")}
            name="stockQuantity"
            value={formData.stockQuantity || 0}
            onChange={handleChange}
          />{" "}
          <FormGroup
            label={t("supplier")}
            name="supplier"
            value={formData.supplier || 0}
            onChange={handleChange}
          />
          <FormGroup
            label={t("isActive")}
            name="isActive"
            value={formData.isActive || 0}
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
                ? t("updateSparePart")
                : t("createSparePart")}
          </Button>
        </div>
      </form>
    </>
  );
}
