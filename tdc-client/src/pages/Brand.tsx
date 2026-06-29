import { useTranslation } from "react-i18next";
import { MainContainer } from "../common/common.styled";
import { brandInit } from "../common/constant";
import type { Brand } from "../components/brand/types";
import { useEffect, useState } from "react";
import List from "../components/brand/List";
import { getBrandList } from "../components/brand/crud";
import { ComponentStatus } from "../common/commun.types";
import Modal from "../components/brand/Modal";

export default function Brand() {
  const { t } = useTranslation(["brand"]);

  const [brand, setBrand] = useState<Brand>(brandInit);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [componentStatus, setComponentStatus] = useState<ComponentStatus>(ComponentStatus.Init);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchBrand();
  }, [refresh]);
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchBrand = async () => {
    try {
      const result = await getBrandList();
      setBrandList(result);
    } catch (err) {
      console.error("catch Error loading Vehicle", err);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSelect = (brand: Brand) => {
    setBrand(brand);
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
    if (status === ComponentStatus.Create) setBrand(brandInit);
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

      <List onSelected={handleSelect} onStateChange={handleStateChange} brandList={brandList} />

      <Modal
        value={brand}
        isModalOpen={isModalOpen}
        setModalOpen={handleSetModalOpen}
        componentStatus={componentStatus}
        onClose={handleOnClose}
      />
    </MainContainer>
  );
}
