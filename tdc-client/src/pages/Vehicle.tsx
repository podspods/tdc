import { useTranslation } from "react-i18next";
import { Button, Header, MainContainer, Title } from "../common/common.styled";
import { useState } from "react";
import type { ViewMode } from "../common/commun.types";
import { VEHICLE_INIT } from "../common/constant";
import type { Vehicle } from "../components/vehicle/vehicle.types";
import Modal from "../components/vehicle/vehicle.Modal";
import { useVehicle } from "../components/vehicle/vehicle.useVehicle";
import List from "../components/vehicle/vehicle.List";
import Stats from "../components/vehicle/vehicle.Stats";

export type VehicleProps = {};
export default function Vehicle({ ...props }: VehicleProps) {
  const { t } = useTranslation(["vehicle"]);
  const {
    vehicleList,
    loading,
    stats,
    total,
    page,
    limit,
    setPage,
    setFilters,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    searchVehicles,
    refresh,
  } = useVehicle();

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(VEHICLE_INIT);

  const [modalOpen, setModalOpen] = useState(false);

  //--------------------------------------------------------------------------------------------------------------------------
  async function handleSubmit(vehicle: Vehicle) {
    console.log("handleSubmit", vehicle);
    let success = false;
    if (viewMode === "create") {
      const result = await createVehicle(vehicle);
      success = !!result;
    } else if (viewMode === "edit" && selectedVehicle) {
      const result = await updateVehicle(selectedVehicle.id, vehicle);
      success = !!result;
    }
    if (success) {
      setModalOpen(false);
      setSelectedVehicle(VEHICLE_INIT);
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------

  function handleCreate() {
    console.log("handleCreate", 0);
    setSelectedVehicle(VEHICLE_INIT);
    setViewMode("create");
    setModalOpen(true);
  }

  function handleEdit() {
    console.log("handleEdit", 0);
  }
  function handleDelete() {
    console.log("handleDelete", 0);
  }
  function handleView() {
    console.log("handleView", 0);
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

  return (
    <>
      <MainContainer>
        <Header>
          <Title>{t("vehicleManagement")}</Title>

          <Button variant="primary" onClick={handleCreate}>
            {t("newVehicle")}
          </Button>
        </Header>

        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            setViewMode={setViewMode}
            setSelectedVehicle={setSelectedVehicle}
            onSubmit={handleSubmit}
            viewMode={viewMode}
            selectedVehicle={selectedVehicle}
            isLoading={loading}
          />
        )}

        {stats && <Stats stats={stats} />}

        <List
          vehicleList={vehicleList}
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
