import type { Correspondance } from "../correspondance/types";
import type { InvoiceLine } from "./invoice.types";
import { useTranslation } from "react-i18next";
import BadgeLine from "./BadgeLine";
import { headerLine, InvoiceLineInit, totalLine } from "../../common/constant";
import { LineTitle, MainSubject } from "./view.style";

export type InvoiceLineDetailProps = {
  value: InvoiceLine[];
  lineType: Correspondance;
};
export default function InvoiceLineDetail({ ...props }: InvoiceLineDetailProps) {
  const { t } = useTranslation(["invoice"]);
  const filteredLines: InvoiceLine[] = props.value.filter(
    (line) => line.lineTypeCode === props.lineType.code,
  );
  const totalGross = filteredLines.reduce((sum, line) => sum + (line.unitPrice || 0), 0);
  const totalAmount = filteredLines.reduce((sum, line) => sum + (line.amount || 0), 0);
  const total: InvoiceLine = {
    ...InvoiceLineInit,
    description: t("subtotal"),
    unitPrice: totalGross,
    amount: totalAmount,
  };

  if (filteredLines.length === 0) {
    return null;
  }

  return (
    <MainSubject>
      <LineTitle>{t(props.lineType.valueStr)}</LineTitle>
      <BadgeLine key={0} value={InvoiceLineInit} typeLine={headerLine} index={0} />
      {filteredLines.map((line, index) => (
        <BadgeLine key={line.id} value={line} typeLine={props.lineType.code} index={index + 1} />
      ))}
      <BadgeLine key={"T"} value={total} typeLine={totalLine} index={0} />
    </MainSubject>
  );
}
