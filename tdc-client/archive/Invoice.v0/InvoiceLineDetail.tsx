import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { Correspondance } from "../correspondance/types";
import type { InvoiceLine } from "./types";
import BadgeLine from "./BadgeLine";
import { headerLine, InvoiceLineInit, totalLine } from "../../common/constant";
import { LineTitle, MainSubject } from "./view.style";
import { Button } from "../../common/common.styled";

export type InvoiceLineDetailProps = {
  value: InvoiceLine[];
  lineType: Correspondance;
  editMode?: boolean;
  setModalCreateOpen?: (isOpen: boolean) => void;
  onClose?: () => void;
  onChange?: () => void;
};

export default function InvoiceLineDetail({ ...props }: InvoiceLineDetailProps) {
  const { t } = useTranslation(["invoice", "correspondance"]);

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalGross, setTotalGross] = useState<number>(0);

  useEffect(() => {
    const sumTotal = () => {
      const totalGross = props.value.reduce(
        (sum, line) => sum + (line.unitPrice * line.quantity || 0),
        0,
      );
      setTotalGross(totalGross);
      const totalAmount = props.value.reduce((sum, line) => sum + (line.amount || 0), 0);
      setTotalAmount(totalAmount);
    };

    sumTotal();
  }, [props.value]);

  //--------------------------------------------------------------------------------------------------------------------------

  const total: InvoiceLine = {
    ...InvoiceLineInit,
    description: t("subtotal"),
    unitPrice: totalGross,
    amount: totalAmount,
  };

  if (props.value.length === 0) {
    return null;
  }

  //--------------------------------------------------------------------------------------------------------------------------
  const handleAddLine = () => {
    props?.setModalCreateOpen ? props?.setModalCreateOpen(true) : null;
  };

  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <MainSubject>
        <LineTitle>{t(`correspondance:${props.lineType.description}`)}</LineTitle>
        <BadgeLine key={0} value={InvoiceLineInit} typeLine={headerLine} index={0} />
        {props.value.map((line, index) => (
          <BadgeLine
            key={line.id}
            value={line}
            typeLine={props.lineType.code}
            index={index + 1}
            editMode={props.editMode}
            onChange={props.onChange}
          />
        ))}
        {props.editMode && (
          <Button $iconOnly onClick={handleAddLine} title={t("New Line")}>
            ➕
          </Button>
        )}
        <BadgeLine key={"T"} value={total} typeLine={totalLine} index={0} />
      </MainSubject>
    </>
  );
}

// Modal components
export const Modal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;

  h3 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    &:hover {
      color: #000;
    }
  }
`;

export const ModalBody = styled.div`
  padding: 1rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
`;
