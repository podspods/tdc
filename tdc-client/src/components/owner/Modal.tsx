// src/components/owner/Modal.tsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody as StyledModalBody,
} from "../../common/common.styled";
import { _createOwner, _updateOwner } from "./service";
import type { Owner } from "./types";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";
import { _getAllCorrespondances } from "../correspondance/service";
import { ownerCategorySubjectCode, ownerInit, ownerStatusSubjectCode } from "../../common/constant";
import { Select } from "../UI/Select";
import { ComponentStatus, type OptionValue } from "../../common/commun.types";
import { inputChange } from "../../common/common";
import { createOrUpdate } from "./crud";
import { getCorrespondanceBySubject } from "../correspondance/crud";
import ActionBar from "../UI/ActionBar";
import QuitButton from "../UI/QuitButton";

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export type ModalProps = {
  value: Owner;
  componentStatus: ComponentStatus;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  onClose: () => void;
};

export function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["owner"]);
  const [owner, setOwner] = useState<Owner>(ownerInit);
  const [isBusy, setBusy] = useState<boolean>(false);
  const [ownerCategoryOptionList, setOwnerCategoryOptionList] = useState<OptionValue[]>([]);
  const [ownerStatusOptionList, setOwnerStatusOptionList] = useState<OptionValue[]>([]);
  useEffect(() => {
    setOwner(props.value);
    fetchOwnerCategory();
    fetchOwnerStatus();
  }, [props.value]);

  //--------------------------------------------------------------------------------------------------------------------------
  const fetchOwnerCategory = async () => {
    try {
      const result = await getCorrespondanceBySubject(ownerCategorySubjectCode);
      const newOwnerCategoryOptionList: OptionValue[] = result.map((record) => ({
        value: record.code.toString(),
        label: record.valueStr,
      }));

      setOwnerCategoryOptionList(newOwnerCategoryOptionList);
    } catch (err) {
      console.error("catch Error loading Owner", err);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const fetchOwnerStatus = async () => {
    try {
      const result = await getCorrespondanceBySubject(ownerStatusSubjectCode);
      const newOwnerStatusOptionList: OptionValue[] = result.map((record) => ({
        value: record.code.toString(),
        label: record.valueStr,
      }));
      setOwnerStatusOptionList(newOwnerStatusOptionList);
    } catch (err) {
      console.error("catch Error loading Owner", err);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newOwner = inputChange(e, owner);
    setOwner(newOwner);
  };
  // Sync form with props.owner when modal opens
  const handleTextAeraChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    setOwner({ ...owner, [name]: value });
  };
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSave = async () => {
    setBusy(true);
    const result = await createOrUpdate(owner);
    setOwner(result);
    setBusy(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleReset = () => {
    setOwner(props.value);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleQuit = () => {
    props.setModalOpen(false);
    props.onClose();
  };

  if (!props.isModalOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {props.value.id !== ownerInit.id ? t("editOwner") : t("addOwner")}
          </ModalTitle>
          <QuitButton onClick={props.onClose} title={t("quit")} />
        </ModalHeader>
        <ModalBody>
          <Input
            label={t("firstName")}
            type="text"
            name="firstName"
            value={owner.firstName}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />

          <Input
            label={t("lastName")}
            type="text"
            name="lastName"
            value={owner.lastName}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("phoneNumber")}
            type="text"
            name="phoneNumber"
            value={owner.phoneNumber}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("email")}
            type="email"
            name="email"
            value={owner.email}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("address")}
            type="text"
            name="address"
            value={owner.address}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Input
            label={t("city")}
            type="text"
            name="city"
            value={owner.city}
            onChange={handleInputChange}
            readOnly={props.componentStatus === ComponentStatus.View}
          />
          <Select
            label={t("category")}
            name="category"
            value={owner.category}
            onChange={handleInputChange}
            options={ownerCategoryOptionList}
            disabled={props.componentStatus === ComponentStatus.View}
          />
          <Select
            label={t("status")}
            name="status"
            value={owner.status}
            onChange={handleInputChange}
            options={ownerStatusOptionList}
            disabled={props.componentStatus === ComponentStatus.View}
          />
          <FullWidth>
            <Textarea
              label={t("notes")}
              name="notes"
              value={owner.notes}
              onChange={handleTextAeraChange}
              rows={3}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
          </FullWidth>

          <Input
            label={t("createdBy")}
            type="text"
            name="createdBy"
            value={owner.createdBy}
            onChange={handleInputChange}
            disabled={!!props.value}
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
  );
}

const ModalBody = styled(StyledModalBody)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;

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
