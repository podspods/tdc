import { useEffect, useState } from "react";
import type { Correspondance } from "../correspondance/types";
import InvoiceLineDetail from "./InvoiceLineDetail";
import Summary from "./Summary";
import { Button } from "../../common/common.styled";
import { useTranslation } from "react-i18next";
import type { InvoiceLine } from "./types";

export type LineSectionProps = {
  typeLineList: Correspondance[];
  value: InvoiceLine[];
  editMode: boolean;
  onNewInvoiceLine?: () => void;
};
export default function LineSection({ ...props }: LineSectionProps) {
  const { t } = useTranslation(["invoice"]);

  const [lineTypeList, setLineTypeList] = useState<Correspondance[]>([]);
  const [refreshId, setRefreshId] = useState<number>(0);
  const [invoiceLineExist, setInvoiceLineExist] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleAddLine = () => {
    setIsModalOpen(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {lineTypeList.map((lineType) => (
        <InvoiceLineDetail
          value={props.value}
          key={lineType.id}
          lineType={lineType}
          editMode={props.editMode}
        />
      ))}
      {!invoiceLineExist && (
        <Button $iconOnly onClick={handleAddLine} title={t("New Line")}>
          ➕
        </Button>
      )}

      <Summary
        refreshId={refreshId}
        invoiceId={props.invoiceId}
        vatRate={10}
        lineTypeList={lineTypeList}
      />
    </>
  );
}
