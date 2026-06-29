import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  ModalBody as StyledModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import { Input } from "../UI/Input";
import { costInit } from "../../common/constant";
import moment from "moment";
import { ComponentStatus } from "../../common/commun.types";
import styled from "styled-components";
import type { Cost } from "./types";
import { createOrUpdate } from "./crud";

export type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  value: Cost;
  componentStatus: ComponentStatus;
  isModalOpen: boolean;
  onClose: () => void;
};

export default function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["cost"]);
  const [cost, setCost] = useState<Cost>(costInit);

  useEffect(() => {
    setCost(props.value);
  }, [props.value]);
  //--------------------------------------------------------------------------------------------------------------------------

  // //--------------------------------------------------------------------------------------------------------------------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    if (type === "checkbox") {
      const newCost: Cost = { ...cost, [name]: e.target.checked };
      setCost(newCost);
      return;
    }
    if (type === "number") {
      const newCost: Cost = { ...cost, [name]: value === "" ? undefined : Number(value) };
      setCost(newCost);
      return;
    }
    if (type === "date") {
      const newCost: Cost = { ...cost, [name]: value === "" ? null : value };
      setCost(newCost);
      return;
    }

    const newCost: Cost = { ...cost, [name]: value };
    setCost(newCost);
    return;
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const HandleSave = async () => {
    const result = await createOrUpdate(cost);
    setCost(result);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const HandleReset = () => {
    setCost(props.value);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const HandleQuit = () => {
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
            <Button onClick={HandleQuit}>❌</Button>
          </ModalHeader>
          <ModalBody>
            <Input
              label={t("name")}
              key={"name"}
              name="name"
              value={cost.name}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("monthlyBase")}
              type="number"
              key={"monthlyBase"}
              name="monthlyBase"
              value={cost.monthlyBase}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("dayWork")}
              key={"dayWork"}
              type="number"
              name="dayWork"
              value={cost.dayWork}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />

            <Input
              label={t("hourWork")}
              key={"hourWork"}
              type="number"
              name="hourWork"
              value={cost.hourWork}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />

            <Input
              label={t("effectiveDate")}
              key={"effectiveDate"}
              type="date"
              name="effectiveDate"
              value={cost.effectiveDate ? moment(cost.effectiveDate).format("YYYY-MM-DD") : ""}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("endDate")}
              key={"endDate"}
              type="date"
              name="endDate"
              value={cost.endDate ? moment(cost.endDate).format("YYYY-MM-DD") : ""}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
            <Input
              label={t("createdBy")}
              key={"createdBy"}
              name="createdBy"
              value={cost.createdBy}
              onChange={handleInputChange}
              readOnly
            />
            <Input
              label={t("createdAt")}
              key={"createdAt"}
              type="date"
              name="createdAt"
              value={cost.createdAt ? moment(cost.createdAt).format("YYYY-MM-DD") : ""}
              onChange={handleInputChange}
              readOnly
            />
            <Input
              label={t("updatedAt")}
              key={"updatedAt"}
              name="updatedAt"
              type="date"
              value={cost.updatedAt ? moment(cost.updatedAt).format("YYYY-MM-DD") : ""}
              onChange={handleInputChange}
              readOnly={props.componentStatus === ComponentStatus.View}
            />
          </ModalBody>
          <div className="modal-buttons">
            <Button $iconOnly onClick={HandleSave} $variant="success" title={t("save")}>
              ✔
            </Button>
            <Button
              $iconOnly
              type="button"
              $variant="warning"
              onClick={HandleReset}
              title={t("reset")}
            >
              🔄
            </Button>
            <Button
              $iconOnly
              type="button"
              $variant="warning"
              onClick={HandleQuit}
              title={t("quit")}
            >
              ❌
            </Button>
          </div>
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
