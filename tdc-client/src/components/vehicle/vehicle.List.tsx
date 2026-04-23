import type { Vehicle } from "./vehicle.types";

export type ListProps = {
  vehicleList: Vehicle[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  onEdit: (owner: Vehicle) => void;
  onDelete: (id: number) => void;
  onView: (owner: Vehicle) => void;
  onPageChange: (page: number) => void;
};
export default function List({ ...props }: ListProps) {
  return (
    <>
      <h1>List</h1>
    </>
  );
}
