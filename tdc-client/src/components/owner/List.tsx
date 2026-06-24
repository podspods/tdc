import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CategoryBadge,
  Pagination,
} from "../../common/common.styled";
import {
  ActionButton,
  FilterBar,
  FilterSelect,
  PageButton,
  SearchInput,
  StatusBadge,
  Table,
  Td,
  Th,
} from "../../common/common.styled";
import { useState } from "react";
import type { Owner } from "./types";
import { formatCurrency } from "../../common/common";

export type ListProps = {
  ownerList: Owner[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  onEdit: (owner: Owner) => void;
  onDelete: (id: number) => void;
  onView: (owner: Owner) => void;
  onPageChange: (page: number) => void;
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["owner"]);
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
          <CardTitle>{t("ownersList")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <FilterBar>
              <SearchInput
                type="text"
                placeholder="Search by name, phone, email..."
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

            <Table>
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>Email</Th>
                  <Th>City</Th>
                  <Th>Category</Th>
                  <Th>Status</Th>
                  <Th>Total Spent</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {props.ownerList.length === 0 ? (
                  <tr>
                    <Td colSpan={9} style={{ textAlign: "center" }}>
                      No owners found
                    </Td>
                  </tr>
                ) : (
                  props.ownerList.map((owner) => (
                    <tr key={owner.id}>
                      <Td>{owner.id}</Td>
                      <Td>
                        <strong>{`${owner.firstName} ${owner.lastName}  `}</strong>
                      </Td>
                      <Td>{owner.phoneNumber}</Td>
                      <Td>{owner.email || "-"}</Td>
                      <Td>{owner.city || "-"}</Td>
                      <Td>
                        <CategoryBadge $category={owner.category || 0}>
                          {owner.category}
                        </CategoryBadge>
                      </Td>
                      <Td>
                        <StatusBadge $status={owner.status || 0}>{owner.status}</StatusBadge>
                      </Td>
                      <Td>{formatCurrency(owner.totalSpent)}</Td>
                      <Td>
                        <ActionButton onClick={() => props.onView(owner)} title="View">
                          👁️
                        </ActionButton>
                        <ActionButton onClick={() => props.onEdit(owner)} title="Edit">
                          ✏️
                        </ActionButton>
                        <ActionButton onClick={() => props.onDelete(owner.id)} title="Delete">
                          🗑️
                        </ActionButton>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

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
                >
                  →
                </PageButton>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
