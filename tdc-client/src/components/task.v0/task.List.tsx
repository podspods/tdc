import type { Task } from "./task.types";

export type ListProps = {
  taskList: Task[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  onEdit: (owner: Task) => void;
  onDelete: (id: number) => void;
  onView: (owner: Task) => void;
  onPageChange: (page: number) => void;
};
export default function List({ ...props }: ListProps) {
  return (
    <>
      <h1>List</h1>
    </>
  );
}
