import { useTranslation } from "react-i18next";
import { MainContainer } from "../common/common.styled";
import { modelInfoInit } from "../common/constant";
import { useEffect, useState } from "react";
import { getModelInfoList } from "../components/model/crud";
import { ComponentStatus } from "../common/commun.types";
import Modal from "../components/model/Modal";
import type { Model, ModelInfo } from "../components/model/types";
import List from "../components/model/List";

export default function Model() {
  const { t } = useTranslation(["model"]);

  const [modelInfo, setModelInfo] = useState<ModelInfo>(modelInfoInit);
  const [modelInfoList, setModelInfoList] = useState<ModelInfo[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [componentStatus, setComponentStatus] = useState<ComponentStatus>(ComponentStatus.Init);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchModelInfo();
    setModalOpen(false);
  }, [refresh]);
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchModelInfo = async () => {
    try {
      const result = await getModelInfoList();
      setModelInfoList(result);
    } catch (err) {
      console.error("catch Error loading Vehicle", err);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSelect = (modelInfo: ModelInfo) => {
    console.log("handleSelect 35", modelInfo);
    setModelInfo(modelInfo);
    setModalOpen(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleStateChange = (status: ComponentStatus) => {
    setComponentStatus(status);

    setModalOpen(
      status === ComponentStatus.Create ||
        status === ComponentStatus.Edit ||
        status === ComponentStatus.View,
    );
    if (status === ComponentStatus.Create) setModelInfo(modelInfoInit);
  };

  const handleOnClose = () => {
    setRefresh((prev) => prev + 1);
  };

  const handleSetModalOpen = (value: boolean) => {
    setModalOpen(value);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      <h1>{t("title")}</h1>
      <p>{isModalOpen ? "true" : "false"} </p>
      <List
        onSelected={handleSelect}
        onStateChange={handleStateChange}
        modelInfoList={modelInfoList}
      />

      <Modal
        value={modelInfo.model}
        isModalOpen={isModalOpen}
        setModalOpen={handleSetModalOpen}
        componentStatus={componentStatus}
        onClose={handleOnClose}
      />
    </MainContainer>
  );
}
