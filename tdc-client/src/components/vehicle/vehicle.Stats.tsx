import type { VehicleStats } from "./types";

export type StatsProps = {
  stats: VehicleStats;
};
export default function Stats({ ...props }: StatsProps) {
  return (
    <>
      <h1>Stats</h1>
      <p>{props.stats.active} </p>
    </>
  );
}
