import { useEffect, useState } from "react";
import { MainContainer } from "../common/common.styled";
import { ComponentStatus } from "../common/commun.types";
import List from "../components/garage/List";
import { garageInit } from "../common/constant";
import type { Garage } from "../components/garage/garage.types";
import { useTranslation } from "react-i18next";
import Modal from "../components/garage/Modal";
import { getGarageList } from "../components/garage/crud";

export default function Garage() {
  const { t } = useTranslation(["garage"]);

  const [garage, setGarage] = useState<Garage>(garageInit);
  const [garageList, setGarageList] = useState<Garage[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const [componentStatus, setComponentStatus] = useState<ComponentStatus>(ComponentStatus.Init);

  useEffect(() => {
    fetchGarage();
  }, [refresh]);
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchGarage = async () => {
    try {
      const result = await getGarageList();
      setGarageList(result);
    } catch (err) {
      console.error("catch Error loading Garage", err);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleSelect = (garage: Garage) => {
    setGarage(garage);
    setModalOpen(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleStateChange = (componentStatus: ComponentStatus) => {
    setComponentStatus(componentStatus);
    setModalOpen(
      componentStatus === ComponentStatus.Create ||
        componentStatus === ComponentStatus.Edit ||
        componentStatus === ComponentStatus.View,
    );
    if (componentStatus === ComponentStatus.Create) setGarage(garageInit);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleClose = () => {
    setModalOpen(false);
    setRefresh((prev) => prev + 1);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      <h1>{t("title")}</h1>

      <List onSelected={handleSelect} onStateChange={handleStateChange} garageList={garageList} />

      <Modal
        value={garage}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        componentStatus={componentStatus}
        onClose={handleClose}
      />
    </MainContainer>
  );
}
