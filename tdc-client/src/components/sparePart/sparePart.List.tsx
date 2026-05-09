import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FilterBar,
  FilterSelect,
  PageButton,
  Pagination,
  SearchInput,
} from "../../common/common.styled";
import { useState } from "react";
import type { SparePart } from "./sparePart.types";
import { SparePartTable } from "./SparePartTable";

export type ListProps = {
  sparePartList: SparePart[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  onEdit: (sparePart: SparePart) => void;
  onDelete: (id: number) => void;
  onView: (sparePart: SparePart) => void;
  onPageChange: (page: number) => void;
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["sparePart"]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const totalPages = Math.ceil(props.total / props.limit);

  const handleSearch = () => {
    props.onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    props.onFilterChange({ category: value || undefined });
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStatus(value);
    props.onFilterChange({ status: value || undefined });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t("sparePartsList")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <FilterBar>
              <SearchInput
                type="text"
                placeholder="Search by name, code, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <FilterSelect value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                <option value="basic">Basic</option>
                <option value="important">Important</option>
                <option value="vip">VIP</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </FilterSelect>
              <FilterSelect value={selectedStatus} onChange={handleStatusChange}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </FilterSelect>
              <button onClick={handleSearch}>Search</button>
            </FilterBar>

            <SparePartTable
              data={props.sparePartList}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            />

            {totalPages > 1 && (
              <Pagination>
                <PageButton
                  onClick={() => props.onPageChange(props.page - 1)}
                  disabled={props.page === 1}
                >
                  ←
                </PageButton>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (props.page <= 3) {
                    pageNum = i + 1;
                  } else if (props.page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = props.page - 2 + i;
                  }
                  return (
                    <PageButton
                      key={pageNum}
                      $active={pageNum === props.page}
                      onClick={() => props.onPageChange(pageNum)}
                    >
                      {pageNum}
                    </PageButton>
                  );
                })}
                <PageButton
                  onClick={() => props.onPageChange(props.page + 1)}
                  disabled={props.page === totalPages}
                ></PageButton>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
