import React, { useState, useEffect } from "react";
import type { Owner, CreateOwnerDto } from "./owner.types";
import { useTranslation } from "react-i18next";
import { OWNER_DTO_INIT } from "../../common/constant";
import {
  Button,
  FormGrid,
  FormGroup,
  Input,
  Label,
  Select,
  Textarea,
} from "../../common/common.styled";

type OwnersFormProps = {
  initialData?: Owner | null;
  onSubmit: (data: CreateOwnerDto) => void;
  onCancel: () => void;
  isLoading: boolean;
};

export function OwnersForm({ ...props }: OwnersFormProps) {
  const { t } = useTranslation(["owner"]);

  const [formData, setFormData] = useState<CreateOwnerDto>(OWNER_DTO_INIT);

  useEffect(() => {
    if (props.initialData) {
      setFormData(OWNER_DTO_INIT);
    }
  }, [props.initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit", formData);
    props.onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid>
        <FormGroup>
          <Label>{t("firsname")}</Label>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>{t("lastName")}</Label>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>{t("phoneNumber")}</Label>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder={t("phoneExample")}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t("email")}</Label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("emailExample")}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t("address")}</Label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder={t("addressExample")}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t("city")}</Label>
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder={t("cityExample")}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t("category")}</Label>
          <Select name="category" value={formData.category} onChange={handleChange}>
            <option value="basic">{t("basic")}</option>
            <option value="important">{t("important")}</option>
            <option value="vip">{t("vip")}</option>
            <option value="gold">{t("gold")}</option>
            <option value="platinum">{t("platinum")}</option>
          </Select>
        </FormGroup>

        <FormGroup style={{ gridColumn: "1 / -1" }}>
          <Label>{t("notes")}</Label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder={t("noteExample")}
          />
        </FormGroup>
      </FormGrid>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
        <Button type="button" variant="secondary" onClick={props.onCancel}>
          {t("cancel")}
        </Button>
        <Button type="submit" variant="primary" disabled={props.isLoading}>
          {props.isLoading ? t("saving") : props.initialData ? t("updateOwner") : t("createOwner")}
        </Button>
      </div>
    </form>
  );
}
