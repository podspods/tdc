// src/components/model/Modal.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { modelInit } from "../../common/constant";
import { _createModel, _updateModel } from "./service";
import type { Model, CreateModelDto, UpdateModelDto } from "./types";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
} from "../../common/common.styled";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";
import SelectBrand from "../brand/SelectBrand";
import type { Brand } from "../brand/types";

// Additional styled components for this modal
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export type ModalProps = {
  setModalOpen: (open: boolean) => void;
  editingItem: Model | null;
  fetchModels: () => Promise<void>;
  brandList: Brand[];
};

export default function ModelModal({ ...props }: ModalProps) {
  const { t } = useTranslation(["model"]);
  const [formData, setFormData] = useState<CreateModelDto>(modelInit);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedBrandId, setSelectedBrandId] = useState<number>(props.editingItem?.brandId || 0);
  s; // Sync form when editingItem changes
  useEffect(() => {
    if (props.editingItem) {
      setFormData({
        brandId: props.editingItem.brandId,
        name: props.editingItem.name,
        createdBy: props.editingItem.createdBy,
        yearStart: props.editingItem.yearStart,
        yearEnd: props.editingItem.yearEnd,
        isCurrent: props.editingItem.isCurrent,
        engineDisplacement: props.editingItem.engineDisplacement,
        engineType: props.editingItem.engineType || "",
        powerHp: props.editingItem.powerHp,
        torqueNm: props.editingItem.torqueNm,
        weightKg: props.editingItem.weightKg,
        fuelCapacityLiters: props.editingItem.fuelCapacityLiters,
        description: props.editingItem.description || "",
        imageUrl: props.editingItem.imageUrl || "",
      });
    } else {
      setFormData(modelInit);
    }
  }, [props.editingItem]);
  //--------------------------------------------------------------------------------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;

    if (type === "number") {
      parsedValue = value === "" ? undefined : Number(value);
    } else if (type === "checkbox") {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleBrandCHange = (id: number) => {
    setSelectedBrandId(id);
    setFormData((prev) => ({ ...prev, brandId: id }));
  };
  //--------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!formData.brandId || !formData.name || !formData.createdBy) {
      alert(t("validationRequired"));
      return;
    }

    setIsSubmitting(true);
    try {
      if (props.editingItem) {
        const updateData: UpdateModelDto = {
          brandId: formData.brandId,
          name: formData.name,
          yearStart: formData.yearStart,
          yearEnd: formData.yearEnd,
          isCurrent: formData.isCurrent,
          engineDisplacement: formData.engineDisplacement,
          engineType: formData.engineType,
          powerHp: formData.powerHp,
          torqueNm: formData.torqueNm,
          weightKg: formData.weightKg,
          fuelCapacityLiters: formData.fuelCapacityLiters,
          description: formData.description,
          imageUrl: formData.imageUrl,
        };
        const response = await _updateModel(props.editingItem.id, updateData);
        if (response.success) {
          await props.fetchModels();
          props.setModalOpen(false);
        } else {
          alert(response.message || t("updateFailed"));
        }
      } else {
        const createData: CreateModelDto = { ...formData };
        const response = await _createModel(createData);
        if (response.success) {
          await props.fetchModels();
          props.setModalOpen(false);
        } else {
          alert(response.message || t("createFailed"));
        }
      }
    } catch (err) {
      console.error(err);
      alert(t("saveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={() => props.setModalOpen(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{props.editingItem ? t("editModel") : t("addModel")}</ModalTitle>
          <Button $variant="secondary" onClick={() => props.setModalOpen(false)}>
            ✖
          </Button>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGrid>
              <Input
                label={t("brandId")}
                type="number"
                name="brandId"
                value={formData.brandId || ""}
                onChange={handleChange}
                required
              />
              <SelectBrand
                selectedBrandId={selectedBrandId}
                setSelectedBrandId={handleBrandCHange}
                brandList={props.brandList}
              />
              <Input
                label={t("name")}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label={t("createdBy")}
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                required
              />
              <Input
                label={t("yearStart")}
                type="number"
                name="yearStart"
                value={formData.yearStart || ""}
                onChange={handleChange}
              />
              <Input
                label={t("yearEnd")}
                type="number"
                name="yearEnd"
                value={formData.yearEnd || ""}
                onChange={handleChange}
              />
              <Input
                label={t("isCurrent")}
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent || false}
                onChange={handleChange}
              />
              <Input
                label={`${t("engineDisplacement")} (cc)`}
                type="number"
                name="engineDisplacement"
                value={formData.engineDisplacement || ""}
                onChange={handleChange}
              />
              <Input
                label={t("engineType")}
                type="text"
                name="engineType"
                value={formData.engineType || ""}
                onChange={handleChange}
              />
              <Input
                label={t("powerHp")}
                type="number"
                name="powerHp"
                value={formData.powerHp || ""}
                onChange={handleChange}
              />
              <Input
                label={t("torqueNm")}
                type="number"
                name="torqueNm"
                value={formData.torqueNm || ""}
                onChange={handleChange}
              />
              <Input
                label={t("weightKg")}
                type="number"
                name="weightKg"
                value={formData.weightKg || ""}
                onChange={handleChange}
              />
              <Input
                label={t("fuelCapacityLiters")}
                type="number"
                name="fuelCapacityLiters"
                value={formData.fuelCapacityLiters || ""}
                onChange={handleChange}
              />
              <FullWidth>
                <Textarea
                  label={t("description")}
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                />
              </FullWidth>
              <FullWidth>
                <Input
                  label={t("imageUrl")}
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleChange}
                />
              </FullWidth>
            </FormGrid>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? t("saving") : t("save")}
            </Button>
            <Button type="button" $variant="secondary" onClick={() => props.setModalOpen(false)}>
              {t("cancel")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
