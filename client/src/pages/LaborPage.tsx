import LaborEdit from "../components/LaborEdit";

export type LaborPageProps = {};
export default function LaborPage({ ...props }: LaborPageProps) {
  return (
    <div>
      <LaborEdit />
    </div>
  );
}
