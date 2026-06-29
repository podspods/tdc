import { useEffect, useState } from "react";
import type { Garage } from "./garage.types";
import { useTranslation } from "react-i18next";
import {
  ModalBody as StyledModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import { Input } from "../UI/Input";
import { garageInit } from "../../common/constant";
import moment from "moment";
import { ComponentStatus } from "../../common/commun.types";
import styled from "styled-components";
import { createOrUpdate } from "./crud";
import toast from "react-hot-toast";
import ActionBar from "../UI/ActionBar";
import QuitButton from "../UI/QuitButton";

export type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  value: Garage;
  componentStatus: ComponentStatus;
  isModalOpen: boolean;
  onClose: () => void;
};

export default function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["garage"]);
  const [garage, setGarage] = useState<Garage>(garageInit);
  const [isBusy, setBusy] = useState<boolean>(false);

  useEffect(() => {
    setGarage(props.value);
  }, [props.value]);
  //--------------------------------------------------------------------------------------------------------------------------

  // //--------------------------------------------------------------------------------------------------------------------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;

    if (type === "checkbox") {
      const newGarage: Garage = { ...garage, [name]: e.target.checked };
      setGarage(newGarage);
      return;
    }
    if (type === "number") {
      const newGarage: Garage = { ...garage, [name]: value === "" ? undefined : Number(value) };
      setGarage(newGarage);
      return;
    }

    const newGarage: Garage = { ...garage, [name]: value };
    console.log("newGarage 59", newGarage);
    setGarage(newGarage);
    return;
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSave = async () => {
    setBusy(true);
    const result = await createOrUpdate(garage);
    const action = garage.id === garageInit.id ? "Create" : "Update";

    toast.success(`${action} ${result.name} : success `);
    setGarage(result);
    setBusy(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleReset = () => {
    setGarage(props.value);
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
            <ModalTitle>{props.value ? t("editGarage") : t("addGarage")}</ModalTitle>
            <QuitButton onClick={handleQuit} />
          </ModalHeader>
          <ModalBody>
            <Input
              label={t("name")}
              name="name"
              value={garage.name}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("address")}
              name="address"
              value={garage.address}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("zipcode")}
              name="zipcode"
              value={garage.zipcode}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("city")}
              name="city"
              value={garage.city}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("phone")}
              name="phone"
              value={garage.phone}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("email")}
              name="email"
              value={garage.email}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("logoUrl")}
              name="logoUrl"
              value={garage.logoUrl}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("taxCode")}
              name="taxCode"
              value={garage.taxCode}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("taxRate")}
              type="number"
              name="taxRate"
              value={garage.taxRate}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("website")}
              name="website"
              value={garage.website}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("bankName")}
              name="bankName"
              value={garage.bankName}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("bankAccount")}
              name="bankAccount"
              value={garage.bankAccount}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("createdBy")}
              name="createdBy"
              value={garage.createdBy}
              onChange={handleInputChange}
              readOnly
            />
            <Input
              label={t("createdAt")}
              name="createdAt"
              value={garage.createdAt ? moment(garage.createdAt).format("DD/MM/YYYY") : ""}
              onChange={handleInputChange}
              readOnly
            />{" "}
            <Input
              label={t("updatedAt")}
              name="updatedAt"
              type="Date"
              value={garage.updatedAt ? moment(garage.updatedAt).format("YYYY-MM-DD") : ""}
              onChange={handleInputChange}
            />
            <Input
              label={t("isActive")}
              name="isActive"
              type="checkbox"
              checked={garage.isActive ?? false}
              onChange={handleInputChange}
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
