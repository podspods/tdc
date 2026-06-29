import type { StatTask } from "./task.types";

export type TaskProps = {
  stats: StatTask;
};
export default function Task({ ...props }: TaskProps) {
  return (
    <>
      <h1>Stats</h1>
    </>
  );
}
