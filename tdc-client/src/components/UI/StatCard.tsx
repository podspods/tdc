import { StatLabel, StatValue } from "../../common/common.styled";

export type StatCardProps = {
  label: string;
  value: string | number | boolean;
};
export default function StatCard({ ...props }: StatCardProps) {
  return (
    <>
      <StatValue>{props.value}</StatValue>
      <StatLabel>{props.label}</StatLabel>
    </>
  );
}
