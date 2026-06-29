import ActionBar from "./ActionBar";
import { ComponentStatus, type InvoiceInfo } from "./types";
export type EditProps = {
  onStateChange: (state: ComponentStatus, invoiceId: number) => void;
  invoiceInfo: InvoiceInfo;
};
export default function Edit({ ...props }: EditProps) {
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus) => {
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
