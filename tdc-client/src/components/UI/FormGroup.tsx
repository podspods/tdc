import { Input, Label } from "../../common/common.styled";

export type FormGroupProps = {
  label: string;
  name: string;
  value: string | number | boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
};
export default function FormGroup({ ...props }: FormGroupProps) {
  const displayValue =
    typeof props.value === "boolean" ? (props.value ? "true" : "false") : String(props.value);
  return (
    <>
      <Label>{props.label}</Label>
      <Input name="firstName" value={displayValue} onChange={props.onChange} required />
    </>
  );
}
