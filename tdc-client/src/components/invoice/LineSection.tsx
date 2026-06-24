import InvoiceLineDetail from "./InvoiceLineDetail";
import Summary from "./Summary";
import { Button } from "../../common/common.styled";
import { useTranslation } from "react-i18next";
import type { InvoiceDisplay } from "./types";
import { useEffect, useState } from "react";
import { invoiceDisplayInit } from "../../common/constant";

export type LineSectionProps = {
  invoiceDisplay: InvoiceDisplay;
  editMode: boolean;
  onNewInvoiceLine?: () => void;
  setIsModalOpen?: (isOpen: boolean) => void;
};
export default function LineSection({ ...props }: LineSectionProps) {
  const { t } = useTranslation(["invoice"]);

  const [invoiceDisplay, setInvoiceDisplay] = useState<InvoiceDisplay>(invoiceDisplayInit);

  useEffect(() => {
    setInvoiceDisplay(props.invoiceDisplay);
  }, [props.invoiceDisplay]);
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAddLine = () => {
    (props.setIsModalOpen ?? (() => {}))(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      {invoiceDisplay &&
        invoiceDisplay.lineTypeList.map((lineType) => (
          <InvoiceLineDetail
            value={invoiceDisplay.invoiceLineList.filter(
              (record) => record.lineTypeCode === lineType.code,
            )}
            key={lineType.id}
            lineType={lineType}
            editMode={props.editMode}
          />
        ))}
      {invoiceDisplay.invoiceLineList.length <= 0 && props.editMode && (
        <Button $iconOnly onClick={handleAddLine} title={t("New Line")}>
          ➕
        </Button>
      )}
      <Summary
        invoice={invoiceDisplay.invoice}
        vatRate={10}
        lineTypeList={invoiceDisplay.lineTypeList}
        invoiceLineList={invoiceDisplay.invoiceLineList}
      />
    </>
  );
}
