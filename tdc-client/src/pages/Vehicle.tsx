import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Vehicle, VehicleInfo } from "../components/vehicle/types";
import { ownerInit, vehicleInfoInit } from "../common/constant";
import { ComponentStatus } from "../common/commun.types";
import { getAllVehicleInfo } from "../components/vehicle/crud";
import { MainContainer } from "../common/common.styled";
import List from "../components/vehicle/List";
import { Modal as ModalVehicle } from "../components/vehicle/Modal";
import { Modal as ModalOwner } from "../components/owner/Modal";

export type ModalOpen = {
  owner: boolean;
  vehicle: boolean;
};
export const modalOpenInit: ModalOpen = {
  owner: false,
  vehicle: false,
};

export type statusVehicle = {
  owner: ComponentStatus;
  vehicle: ComponentStatus;
};
export const statusVehicleInit: statusVehicle = {
  owner: ComponentStatus.Init,
  vehicle: ComponentStatus.Init,
};
export default function Vehicle() {
  const { t } = useTranslation(["vehicle"]);

  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(vehicleInfoInit);
  const [vehicleInfoList, setVehicleList] = useState<VehicleInfo[]>([]);
  const [isModalOpen, setModalOpen] = useState<ModalOpen>(modalOpenInit);
  const [refresh, setRefresh] = useState<number>(0);
  const [componentStatus, setComponentStatus] = useState<statusVehicle>(statusVehicleInit);

  useEffect(() => {
    fetchVehicleInfo();
  }, [refresh]);
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchVehicleInfo = async () => {
    try {
      const result = await getAllVehicleInfo();
      setVehicleList(result);
    } catch (err) {
      console.error("catch Error loading Vehicle", err);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleStateChange = (vehicleStatus: ComponentStatus) => {
    setComponentStatus({ ...componentStatus, vehicle: vehicleStatus });
    const newModalOpen = {
      ...isModalOpen,
      vehicle:
        vehicleStatus === ComponentStatus.Create ||
        vehicleStatus === ComponentStatus.Edit ||
        vehicleStatus === ComponentStatus.View,
    };
    setModalOpen(newModalOpen);
    if (componentStatus.vehicle === ComponentStatus.Create) setVehicleInfo(vehicleInfoInit);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSelect = (vehicleInfo: VehicleInfo) => {
    setVehicleInfo(vehicleInfo);
    const newModalOpen = { ...isModalOpen, vehicle: true };
    setModalOpen(newModalOpen);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSetModalOwnerOpen = (isOpen: boolean) => {
    const newModalOpen = { ...isModalOpen, owner: isOpen };
    setModalOpen(newModalOpen);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSetModalVehicleOpen = (isOpen: boolean) => {
    const newModalOpen = { ...isModalOpen, vehicle: isOpen };
    setModalOpen(newModalOpen);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleModalVehicleClose = () => {
    const newModalOpen = { ...isModalOpen, vehicle: false };
    setModalOpen(newModalOpen);
    setRefresh((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleModalOwnerClose = () => {
    const newModalOpen = { ...isModalOpen, owner: false };
    setModalOpen(newModalOpen);
    setRefresh((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleNewOwner = () => {
    handleSetModalOwnerOpen(true);
    setVehicleInfo((prev) => ({ ...prev, owner: ownerInit }));
    setComponentStatus((prev) => ({ ...prev, owner: ComponentStatus.Create }));
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      <h1>{t("title")}</h1>

      <List
        onSelected={handleSelect}
        onStateChange={handleStateChange}
        vehicleInfoList={vehicleInfoList}
      />

      <ModalVehicle
        value={vehicleInfo}
        isModalOpen={isModalOpen.vehicle}
        setModalOpen={handleSetModalVehicleOpen}
        componentStatus={componentStatus.vehicle}
        onClose={handleModalVehicleClose}
        onNewOwner={handleNewOwner}
      />
      <ModalOwner
        value={vehicleInfo.owner}
        componentStatus={componentStatus.owner}
        isModalOpen={isModalOpen.owner}
        onClose={handleModalOwnerClose}
        setModalOpen={handleSetModalOwnerOpen}
      />
    </MainContainer>
  );
}
