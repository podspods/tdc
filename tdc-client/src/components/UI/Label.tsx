export type LabelProps = {
  label: string;
  value: string;
};
export default function Label({ ...props }: LabelProps) {
  return (
    <>
      <div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>{props.label}</div>
        <div>{props.value}</div>
      </div>
    </>
  );
}
