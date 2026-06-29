import { useTranslation } from "react-i18next";
import { Button, Header, MainContainer, Title } from "../common/common.styled";
import { useEffect, useState } from "react";
import type { ViewMode } from "../common/commun.types";
import { SPARE_PART_INIT } from "../common/constant";
import type { CreateSparePartDto, SparePart } from "../components/sparePart/sparePart.types";
import Modal from "../components/sparePart/sparePart.Modal";
import List from "../components/sparePart/sparePart.List";
import Stats from "../components/sparePart/sparePart.Stats";
import { useSparePart } from "../components/sparePart/sparePart.useSparePart";

export type SparePartProps = {};
export default function SparePart({ ...props }: SparePartProps) {
  const { t } = useTranslation(["sparePart"]);
  const {
    sparePartList,
    loading,
    stats,
    total,
    page,
    limit,
    setPage,
    setFilters,
    createSparePart,
    updateSparePart,
    deleteSparePart,
    searchSpareParts,
    refresh,
  } = useSparePart();

  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [selectedSparePart, setSelectedSparePart] = useState<SparePart>(SPARE_PART_INIT);

  const [modalOpen, setModalOpen] = useState(false);

  //--------------------------------------------------------------------------------------------------------------------------
  async function handleSubmit(sparePart: CreateSparePartDto) {
    console.log("handleSubmit", sparePart);
    let success = false;
    if (viewMode === "create") {
      const result = await createSparePart(sparePart);
      success = !!result;
    } else if (viewMode === "edit" && selectedSparePart) {
      const result = await updateSparePart(selectedSparePart.id, sparePart);
      success = !!result;
    }
    if (success) {
      setModalOpen(false);
      setSelectedSparePart(SPARE_PART_INIT);
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------

  function handleCreate() {
    console.log("handleCreate", 0);
    setSelectedSparePart(SPARE_PART_INIT);
    setViewMode("create");
    setModalOpen(true);
  }

  function handleEdit(sparePart: SparePart) {
    console.log("handleEdit", sparePart.code);
    setSelectedSparePart(sparePart);
    setViewMode("edit");
    setModalOpen(true);
  }
  function handleDelete(id: number) {
    console.log("handleDelete", id);
  }
  function handleView(sparePart: SparePart) {
    console.log("handleView", sparePart.code);
    setViewMode("view");
  }
  function handlePageChange() {
    console.log("handlePageChange", 0);
  }
  function handleSearch() {
    console.log("handleSearch", 0);
  }
  function handleFilterChange() {
    console.log("handleFilterChange", 0);
  }

  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <>
      <MainContainer>
        <Header>
          <Title>{t("sparePartManagement")}</Title>

          <Button variant="primary" onClick={handleCreate}>
            {t("newSparePart")}
          </Button>
        </Header>

        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            setViewMode={setViewMode}
            setSelectedSparePart={setSelectedSparePart}
            onSubmit={handleSubmit}
            viewMode={viewMode}
            selectedSparePart={selectedSparePart}
            isLoading={loading}
          />
        )}

        {stats && <Stats stats={stats} />}

        <List
          sparePartList={sparePartList}
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
