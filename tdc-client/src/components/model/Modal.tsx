// src/components/model/Modal.tsx
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { brandInit, modelInit } from "../../common/constant";
import { _createModel, _updateModel } from "./service";
import type { Model } from "./types";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody as StyledModalBody,
} from "../../common/common.styled";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";
import type { Brand } from "../brand/types";
import QuitButton from "../UI/QuitButton";
import { ComponentStatus } from "../../common/commun.types";
import { inputChange } from "../../common/common";
import { createOrUpdate } from "./crud";
import ActionBar from "../UI/ActionBar";
import { getBrandList } from "../brand/crud";
import { Select } from "../UI/Select";
import toast from "react-hot-toast";

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export type ModalProps = {
  setModalOpen: (open: boolean) => void;
  value: Model;
  componentStatus: ComponentStatus;
  isModalOpen: boolean;
  onClose: () => void;
};

export default function ModelModal({ ...props }: ModalProps) {
  const { t } = useTranslation(["model"]);
  const [isBusy, setBusy] = useState<boolean>(false);
  const [model, setModel] = useState<Model>(modelInit);
  const [brandList, setBrandList] = useState<Brand[]>([]);

  useEffect(() => {
    setModel(props.value);
    loadBrandList();
  }, [props.value]);
  //--------------------------------------------------------------------------------------------------------------------------

  const brandListOption = useMemo(() => {
    return brandList.map((record) => ({
      value: record.id.toString(),
      label: record.name,
    }));
  }, [brandList]);

  //--------------------------------------------------------------------------------------------------------------------------
  const loadBrandList = async () => {
    const newBrandlist = await getBrandList();
    setBrandList(newBrandlist);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newModel = inputChange(event, model);
    setModel(newModel);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleReset = () => {
    setModel(props.value);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSave = async () => {
    setBusy(true);
    const result = await createOrUpdate(model);
    toast.success(`Create : response.success`);

    setModel(result);
    setBusy(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------  //--------------------------------------------------------------------------------------------------------------------------
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const newBrand: Brand =
      brandList.find((record: Brand) => record.id === selectedId) ?? brandInit;
    if (newBrand.id !== brandInit.id) setModel((prev) => ({ ...prev, brandId: newBrand.id }));
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleQuit = () => {
    props.setModalOpen(false);
    props.onClose();
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModel((prev) => ({ ...prev, description: event.target.value }));
  };
  //--------------------------------------------------------------------------------------------------------------------------
  if (!props.isModalOpen) return null;
  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {props.value.id !== modelInit.id ? t("editModel") : t("addModel")}
          </ModalTitle>
          <QuitButton onClick={handleQuit} />
        </ModalHeader>
        <ModalBody>
          <Select
            label={t("brand")}
            options={brandListOption}
            onChange={handleBrandChange}
            value={model.brandId}
          />
          <Input
            label={t("name")}
            type="text"
            name="name"
            value={model.name}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("createdBy")}
            type="text"
            name="createdBy"
            value={model.createdBy}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("yearStart")}
            type="number"
            name="yearStart"
            value={model.yearStart || ""}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("yearEnd")}
            type="number"
            name="yearEnd"
            value={model.yearEnd || ""}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("isCurrent")}
            type="checkbox"
            name="isCurrent"
            checked={model.isCurrent || false}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={`${t("engineDisplacement")} (cc)`}
            type="number"
            name="engineDisplacement"
            value={model.engineDisplacement || ""}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("engineType")}
            type="text"
            name="engineType"
            value={model.engineType || ""}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("powerHp")}
            type="number"
            name="powerHp"
            value={model.powerHp || ""}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("torqueNm")}
            type="number"
            name="torqueNm"
            value={model.torqueNm || ""}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("weightKg")}
            type="number"
            name="weightKg"
            value={model.weightKg || ""}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("fuelCapacityLiters")}
            type="number"
            name="fuelCapacityLiters"
            value={model.fuelCapacityLiters || ""}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <FullWidth>
            <Textarea
              label={t("description")}
              name="description"
              value={model.description}
              onChange={handleDescriptionChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
          </FullWidth>
          <FullWidth>
            <Input
              label={t("imageUrl")}
              type="text"
              name="imageUrl"
              value={model.imageUrl || ""}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
          </FullWidth>
        </ModalBody>

        {(props.componentStatus === ComponentStatus.Create ||
          props.componentStatus === ComponentStatus.Edit) && (
          <ActionBar
            handleQuit={handleQuit}
            handleReset={handleReset}
            handleSave={handleSave}
            isBusy={isBusy}
          />
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalBody = styled(StyledModalBody)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;

  & > * {
    flex: 0 0 calc(50% - 0.5rem); /* 50% - la moitié du gap */
    min-width: 0;
  }

  @media (max-width: 768px) {
    & > * {
      flex: 0 0 100%;
    }
  }
`;
