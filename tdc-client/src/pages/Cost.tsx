// src/pages/CostPage.tsx
import { MainContainer } from "../common/common.styled";
import List from "../components/cost/List";
import type { Cost } from "../components/cost/types";
import { useEffect, useState } from "react";
import { costInit } from "../common/constant";
import { getCostList } from "../components/cost/crud";
import { ComponentStatus } from "../common/commun.types";
import Modal from "../components/cost/Modal";

export default function Cost() {
  const [cost, setCost] = useState<Cost>(costInit);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [costList, setCostList] = useState<Cost[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [componentStatus, setComponentStatus] = useState<ComponentStatus>(ComponentStatus.Init);

  useEffect(() => {
    fetchCost();
  }, [refresh]);

  //--------------------------------------------------------------------------------------------------------------------------
  const fetchCost = async () => {
    try {
      const result = await getCostList();
      setCostList(result);
    } catch (err) {
      console.error("catch Error loading Garage", err);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleSelect = (Cost: Cost) => {
    setCost(Cost);
    setModalOpen(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  const handleStateChange = (componentStatus: ComponentStatus) => {
    setComponentStatus(componentStatus);
    setModalOpen(
      componentStatus === ComponentStatus.Create ||
        componentStatus === ComponentStatus.Edit ||
        componentStatus === ComponentStatus.View,
    );
    if (componentStatus === ComponentStatus.Create) setCost(costInit);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleClose = () => {
    setModalOpen(false);
    setRefresh((prev) => prev + 1);
  };

  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <MainContainer>
      <List onSelected={handleSelect} onStateChange={handleStateChange} value={costList} />

      <Modal
        value={cost}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        componentStatus={componentStatus}
        onClose={handleClose}
      />
    </MainContainer>
  );
}
