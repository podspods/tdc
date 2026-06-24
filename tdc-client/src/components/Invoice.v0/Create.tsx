import ActionBar from "./ActionBar";
import { InvoiceState, type Invoice, type InvoiceInfo } from "./types";

export type CreateProps = {
  onStateChange: (state: InvoiceState, invoiceId: number) => void;
  invoiceInfo: InvoiceInfo;
};
export default function Create({ ...props }: CreateProps) {
  const handleAction = (state: InvoiceState) => {
    props.onStateChange(state, props.invoiceInfo.id);
  };
  return (
    <>
      <h1>Create</h1>

      <ActionBar onAction={handleAction} />
    </>
  );
}
