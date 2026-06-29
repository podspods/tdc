import type { SparePartStats } from "./sparePart.types";

export type SparePartProps = {
  stats: SparePartStats;
};
export default function SparePart({ ...props }: SparePartProps) {
  return (
    <>
      <h1>Stats</h1>
    </>
  );
}
