import { useTranslation } from "react-i18next";
import { Button, Header, MainContainer, Title } from "../common/common.styled";
import type { ViewMode } from "../common/commun.types";
import type { Owner } from "../components/owner/owner.types";
import { useState } from "react";
import { OWNER_INIT } from "../common/constant";
import Modal from "../components/owner/owner.Modal";
import { useOwner } from "../components/owner/owner.useOwner";

export type OwnersProps = {};
export default function Owners({ ...props }: OwnersProps) {
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
  } = useOwner();

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedOwner, setSelectedOwner] = useState<Owner>(OWNER_INIT);

  const [modalOpen, setModalOpen] = useState(false);

  function handleCreate() {
    console.log("handleCreate", 0);
    setSelectedOwner(OWNER_INIT);
    setViewMode("create");
    setModalOpen(true);
  }

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
      </MainContainer>
    </>
  );
}
