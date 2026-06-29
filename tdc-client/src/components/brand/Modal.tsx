import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ModalBody as StyledModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import { Input } from "../UI/Input";
import moment from "moment";
import { ComponentStatus } from "../../common/commun.types";
import styled from "styled-components";
import ActionBar from "../UI/ActionBar";
import QuitButton from "../UI/QuitButton";
import type { Brand } from "./types";
import { inputChange } from "../../common/common";
import { createOrUpdate } from "./crud";
import { brandInit } from "../../common/constant";

export type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  value: Brand;
  componentStatus: ComponentStatus;
  isModalOpen: boolean;
  onClose: () => void;
};

export default function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["brand"]);
  const [brand, setBrand] = useState<Brand>(brandInit);
  const [isBusy, setBusy] = useState<boolean>(false);

  useEffect(() => {
    setBrand(props.value);
  }, [props.value]);
  //--------------------------------------------------------------------------------------------------------------------------

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBrand = inputChange(event, brand);
    setBrand(newBrand);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSave = async () => {
    setBusy(true);
    const result = await createOrUpdate(brand);

    setBrand(result);
    setBusy(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleReset = () => {
    setBrand(props.value);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleQuit = () => {
    props.setModalOpen(false);
    props.onClose();
  };
  //--------------------------------------------------------------------------------------------------------------------------
  if (!props.isModalOpen) return;

  return (
    <>
      <ModalOverlay>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{props.value ? t("editBrand") : t("addBrand")}</ModalTitle>
            <QuitButton onClick={handleQuit} />
          </ModalHeader>
          <ModalBody>
            <Input
              label={t("code")}
              name="code"
              value={brand.code}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("name")}
              name="name"
              value={brand.name}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("countryOfOrigin")}
              name="countryOfOrigin"
              value={brand.countryOfOrigin}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />

            <Input
              label={t("createdBy")}
              name="createdBy"
              value={brand.createdBy}
              onChange={handleInputChange}
              readOnly
            />
            <Input
              label={t("createdAt")}
              name="createdAt"
              value={brand.createDate ? moment(brand.createDate).format("DD/MM/YYYY") : ""}
              onChange={handleInputChange}
              readOnly
            />
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
    </>
  );
}

const ModalBody = styled(StyledModalBody)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

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
