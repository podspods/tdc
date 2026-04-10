import React, { useState } from "react";
import type { Owner } from "./Owners.types";
import {
  Table,
  Th,
  Td,
  StatusBadge,
  CategoryBadge,
  ActionButton,
  SearchInput,
  FilterSelect,
  FilterBar,
  Pagination,
  PageButton,
} from "./Owners.styled";

type OwnersListProps = {
  owners: Owner[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onEdit: (owner: Owner) => void;
  onDelete: (id: number) => void;
  onView: (owner: Owner) => void;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
};

export function OwnersList({
  owners,
  loading,
  total,
  page,
  limit,
  onEdit,
  onDelete,
  onView,
  onPageChange,
  onSearch,
  onFilterChange,
}: OwnersListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilterChange({ category: value || undefined });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStatus(value);
    onFilterChange({ status: value || undefined });
  };

  const totalPages = Math.ceil(total / limit);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading && owners.length === 0) {
    return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>;
  }

  return (
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
          {owners.length === 0 ? (
            <tr>
              <Td colSpan={9} style={{ textAlign: "center" }}>
                No owners found
              </Td>
            </tr>
          ) : (
            owners.map((owner) => (
              <tr key={owner.id}>
                <Td>{owner.id}</Td>
                <Td>
                  <strong>{owner.fullName}</strong>
                </Td>
                <Td>{owner.phoneNumber}</Td>
                <Td>{owner.email || "-"}</Td>
                <Td>{owner.city || "-"}</Td>
                <Td>
                  <CategoryBadge $category={owner.category}>{owner.category}</CategoryBadge>
                </Td>
                <Td>
                  <StatusBadge $status={owner.status}>{owner.status}</StatusBadge>
                </Td>
                <Td>{formatCurrency(owner.totalSpent)}</Td>
                <Td>
                  <ActionButton onClick={() => onView(owner)} title="View">
                    👁️
                  </ActionButton>
                  <ActionButton onClick={() => onEdit(owner)} title="Edit">
                    ✏️
                  </ActionButton>
                  <ActionButton onClick={() => onDelete(owner.id)} title="Delete">
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
          <PageButton onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            ←
          </PageButton>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }
            return (
              <PageButton
                key={pageNum}
                $active={pageNum === page}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </PageButton>
            );
          })}
          <PageButton onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
            →
          </PageButton>
        </Pagination>
      )}
    </div>
  );
}
