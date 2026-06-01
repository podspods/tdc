import ActionBar from "./ActionBar";
import { InvoiceState, type InvoiceInfo } from "./invoice.types";
export type EditProps = {
  onStateChange: (state: InvoiceState, invoiceId: number) => void;
  invoiceInfo: InvoiceInfo;
};
export default function Edit({ ...props }: EditProps) {
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: InvoiceState) => {
    props.onStateChange(state, props.invoiceInfo.id);
  };
  //
  return (
    <>
      <h1>Edit</h1>
      <h1>{props.invoiceInfo.id}</h1>

      <ActionBar onAction={handleAction} />
    </>
  );
}
