import { useEffect, useState } from "react";
import type { Owner } from "../components/owner/types";
import { Modal } from "../components/owner/Modal";
import { useTranslation } from "react-i18next";
import List from "../components/owner/List";
import { ComponentStatus } from "../common/commun.types";
import { ownerInit } from "../common/constant";
import { getOwnerList } from "../components/owner/crud";

export default function Owner() {
  const { t } = useTranslation(["owner"]);

  const [owner, setOwner] = useState<Owner>(ownerInit);
  const [ownerList, setOwnerList] = useState<Owner[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const [componentStatus, setComponentStatus] = useState<ComponentStatus>(ComponentStatus.Init);

  useEffect(() => {
    fetchOwner();
  }, [refresh]);

  //--------------------------------------------------------------------------------------------------------------------------
  const fetchOwner = async () => {
    try {
      const result = await getOwnerList();
      setOwnerList(result);
    } catch (err) {
      console.error("catch Error loading Owner", err);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleStateChange = (componentStatus: ComponentStatus) => {
    setComponentStatus(componentStatus);
    setModalOpen(
      componentStatus === ComponentStatus.Create ||
        componentStatus === ComponentStatus.Edit ||
        componentStatus === ComponentStatus.View,
    );
    if (componentStatus === ComponentStatus.Create) setOwner(ownerInit);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleClose = () => {
    setModalOpen(false);
    setRefresh((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleSelect = (owner: Owner) => {
    setOwner(owner);
    setModalOpen(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <h1>{t("title")}</h1>

      <List onSelected={handleSelect} onStateChange={handleStateChange} ownerList={ownerList} />
      <Modal
        value={owner}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        componentStatus={componentStatus}
        onClose={handleClose}
      />
    </>
  );
}
