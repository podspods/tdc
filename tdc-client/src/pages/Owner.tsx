import { useTranslation } from "react-i18next";
import { Button, Header, MainContainer, Title } from "../common/common.styled";
import type { ViewMode } from "../common/commun.types";
import type { Owner } from "../components/owner/owner.types";
import { useState } from "react";
import { OWNER_INIT } from "../common/constant";
import Modal from "../components/owner/owner.Modal";
import { useOwner } from "../components/owner/owner.useOwner";
import Stats from "../components/owner/owner.Stats";
import List from "../components/owner/owner.List";

export type OwnersProps = {};
export default function Owners({ ...props }: OwnersProps) {
  const { t } = useTranslation(["owner"]);

  const {
    ownerList,
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
  } = useOwner();

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedOwner, setSelectedOwner] = useState<Owner>(OWNER_INIT);

  const [modalOpen, setModalOpen] = useState(false);
  //--------------------------------------------------------------------------------------------------------------------------

  function handleCreate() {
    console.log("handleCreate", 0);
    setSelectedOwner(OWNER_INIT);
    setViewMode("create");
    setModalOpen(true);
  }
  //--------------------------------------------------------------------------------------------------------------------------
  const handleEdit = (owner: Owner) => {
    setSelectedOwner(owner);
    setViewMode("edit");
    setModalOpen(true);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleView = (owner: Owner) => {
    setSelectedOwner(owner);
    setViewMode("view");
    setModalOpen(true);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this owner?")) {
      await deleteOwner(id);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleSearch = (query: string) => {
    if (query.length >= 2) {
      searchOwners(query);
    } else if (query.length === 0) {
      refresh();
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  async function handleSubmit(data: any) {
    console.log("handleSubmit", data);
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
      setSelectedOwner(OWNER_INIT);
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <MainContainer>
        <Header>
          <Title>{t("ownersManagement")}</Title>

          <Button variant="primary" onClick={handleCreate}>
            {t("newOwner")}
          </Button>
        </Header>
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            setViewMode={setViewMode}
            setSelectedOwner={setSelectedOwner}
            onSubmit={handleSubmit}
            viewMode={viewMode}
            selectedOwner={selectedOwner}
            isLoading={loading}
          />
        )}
        {stats && <Stats stats={stats} />}
        <List
          ownerList={ownerList}
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
      </MainContainer>
    </>
  );
}
