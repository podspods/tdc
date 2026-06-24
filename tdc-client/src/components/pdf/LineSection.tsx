import InvoiceLineDetail from "./InvoiceLineDetail";
import type { InvoiceDisplay } from "../invoice/types";
import Summary from "./Summary";

export type LineSectionProps = {
  invoiceDisplay: InvoiceDisplay;
};
export default function LineSection({ ...props }: LineSectionProps) {
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      {props.invoiceDisplay &&
        props.invoiceDisplay.lineTypeList.map((lineType) => (
          <InvoiceLineDetail
            value={props.invoiceDisplay.invoiceLineList.filter(
              (record) => record.lineTypeCode === lineType.code,
            )}
            key={lineType.id}
            lineType={lineType}
          />
        ))}

      <Summary
        invoice={props.invoiceDisplay.invoice}
        vatRate={props.invoiceDisplay.garage.taxRate}
        lineTypeList={props.invoiceDisplay.lineTypeList}
        invoiceLineList={props.invoiceDisplay.invoiceLineList}
      />
    </>
  );
}
