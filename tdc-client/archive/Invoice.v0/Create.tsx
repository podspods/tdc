import ActionBar from "./ActionBar";
import { ComponentStatus, type Invoice, type InvoiceInfo } from "./types";

export type CreateProps = {
  onStateChange: (state: ComponentStatus, invoiceId: number) => void;
  invoiceInfo: InvoiceInfo;
};
export default function Create({ ...props }: CreateProps) {
  const handleAction = (state: ComponentStatus) => {
    props.onStateChange(state, props.invoiceInfo.id);
  };
  return (
    <>
      <h1>Create</h1>

      <ActionBar onAction={handleAction} />
    </>
  );
}
