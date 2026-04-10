import { useState } from "react";
import { useOwners } from "../hooks/useOwners";
import { OwnersList } from "../components/Owners/OwnersList";
import { OwnersForm } from "../components/Owners/OwnersForm";
import { OwnersView } from "../components/Owners/OwnersView";
import { type Owner } from "../components/Owners/Owners.types";
import {
  Container,
  Header,
  Title,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
} from "../components/Owners/Owners.styled";
import { useTranslation } from "react-i18next";

type ViewMode = "list" | "create" | "edit" | "view";

export function OwnersPage() {
  const { t } = useTranslation(["owner"]);

  const {
    owners,
    stats,
    loading,
    total,
    page,
    limit,
    setPage,
    setFilters,
    createOwner,
    updateOwner,
    deleteOwner,
    searchOwners,
    refresh,
  } = useOwners();

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = () => {
    setSelectedOwner(null);
    setViewMode("create");
    setModalOpen(true);
  };

  const handleEdit = (owner: Owner) => {
    setSelectedOwner(owner);
    setViewMode("edit");
    setModalOpen(true);
  };

  const handleView = (owner: Owner) => {
    setSelectedOwner(owner);
    setViewMode("view");
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this owner?")) {
      await deleteOwner(id);
    }
  };

  const handleSubmit = async (data: any) => {
    let success = false;
    if (viewMode === "create") {
      const result = await createOwner(data);
      success = !!result;
    } else if (viewMode === "edit" && selectedOwner) {
      const result = await updateOwner(selectedOwner.id, data);
      success = !!result;
    }
    if (success) {
      setModalOpen(false);
      setSelectedOwner(null);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleSearch = (query: string) => {
    if (query.length >= 2) {
      searchOwners(query);
    } else if (query.length === 0) {
      refresh();
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Header>
        <Title>{t("ownersManagement")}</Title>

        <Button variant="primary" onClick={handleCreate}>
          {t("newOwner")}
        </Button>
      </Header>

      {/* Statistics */}
      {stats && (
        <StatsGrid>
          <StatCard>
            <StatValue>{stats.total}</StatValue>
            <StatLabel> {t("totalOwners")}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.active}</StatValue>
            <StatLabel> {t("active")}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.inactive}</StatValue>
            <StatLabel> {t("inactive")}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.blocked}</StatValue>
            <StatLabel> {t("blocked")}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{formatCurrency(stats.totalSpentAll)}</StatValue>
            <StatLabel> {t("totalRevenue")}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{formatCurrency(stats.averageSpentPerOwner)}</StatValue>
            <StatLabel> {t("averageSpent")}</StatLabel>
          </StatCard>
        </StatsGrid>
      )}

      {/* Categories Stats */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle> {t("byCategory")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <div>
                {t("basic")}: {stats.byCategory.basic}
              </div>
              <div>
                {t("important")}: {stats.byCategory.important}
              </div>
              <div>
                {t("vip")}: {stats.byCategory.vip}
              </div>
              <div>
                {t("gold")}: {stats.byCategory.gold}
              </div>
              <div>
                {t("platinum")}: {stats.byCategory.platinum}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Owners List */}
      <Card>
        <CardHeader>
          <CardTitle>{t("ownersList")}</CardTitle>
        </CardHeader>
        <CardContent>
          <OwnersList
            owners={owners}
            loading={loading}
            total={total}
            page={page}
            limit={limit}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </CardContent>
      </Card>

      {/* Modal for Create/Edit/View */}
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {viewMode === "create" && "Create New Owner"}
                {viewMode === "edit" && "Edit Owner"}
                {viewMode === "view" && "Owner Details"}
              </ModalTitle>
              <button onClick={() => setModalOpen(false)}>✕</button>
            </ModalHeader>
            <ModalBody>
              {viewMode === "view" && selectedOwner && (
                <OwnersView
                  owner={selectedOwner}
                  onClose={() => setModalOpen(false)}
                  onEdit={() => {
                    setModalOpen(false);
                    handleEdit(selectedOwner);
                  }}
                />
              )}
              {(viewMode === "create" || viewMode === "edit") && (
                <OwnersForm
                  initialData={selectedOwner}
                  onSubmit={handleSubmit}
                  onCancel={() => setModalOpen(false)}
                  isLoading={loading}
                />
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
}
