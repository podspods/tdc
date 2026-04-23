import { Input, Label } from "../../common/common.styled";

export type FormGroupProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
};
export default function FormGroup({ ...props }: FormGroupProps) {
  return (
    <>
      <Label>{props.label}</Label>
      <Input name="firstName" value={props.value} onChange={props.onChange} required />
    </>
  );
}
