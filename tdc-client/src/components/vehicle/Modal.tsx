import { useTranslation } from "react-i18next";
import {
  Button,
  ModalBody,
  ModalContent as StyledModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import type { VehicleInfo } from "./types";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import type { Owner } from "../owner/types";
import { Select } from "../UI/Select";
import { Input } from "../UI/Input";
import type { ComponentStatus } from "../../common/commun.types";
import { getBrandList } from "../brand/crud";
import { getModelList } from "../model/crud";
import { brandInit, modelInit, ownerInit, vehicleInit } from "../../common/constant";
import { updateOrCreate } from "./crud";
import { getOwnerList } from "../owner/crud";
import { inputChange } from "../../common/common";
import type { Brand } from "../brand/types";
import type { Model } from "../model/types";
import QuitButton from "../UI/QuitButton";
import ActionBar from "../UI/ActionBar";

export type ModalProps = {
  value: VehicleInfo;
  componentStatus: ComponentStatus;
  editMode?: boolean;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  onClose: () => void;
  onNewOwner?: () => void;
};
export function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["vehicle"]);

  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(props.value);
  const [isBusy, setBusy] = useState<boolean>(false);
  const [ownerList, setOwnerList] = useState<Owner[]>([]);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [modelList, setModelList] = useState<Model[]>([]);

  const modelListOption = useMemo(() => {
    return modelList
      .filter((model: Model) => model.brandId === vehicleInfo.brand.id)
      .map((record) => ({
        value: record.id.toString(),
        label: record.name,
      }));
  }, [vehicleInfo.brand.id, modelList]);

  const brandListOption = useMemo(() => {
    return brandList.map((record) => ({
      value: record.id.toString(),
      label: record.name,
    }));
  }, [brandList]);

  const ownerOptionList = useMemo(() => {
    return ownerList.map((record) => ({
      value: record.id.toString(),
      label: `${record.lastName} ${record.firstName}`,
    }));
  }, [ownerList]);

  useEffect(() => {
    setVehicleInfo(props.value);
    loadOwnerList();
    loadBrandList();
    loadModelList();
  }, [props.value]);

  // //--------------------------------------------------------------------------------------------------------------------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newVehicle = inputChange(e, vehicleInfo.vehicle);
    const newVehicleInfo = { ...vehicleInfo, vehicle: newVehicle };
    setVehicleInfo(newVehicleInfo);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const loadOwnerList = async () => {
    const newOwnerList = await getOwnerList();
    setOwnerList(newOwnerList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadBrandList = async () => {
    const newBrandlist = await getBrandList();
    setBrandList(newBrandlist);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadModelList = async () => {
    const newModellist = await getModelList();
    setModelList(newModellist);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleSave = async () => {
    setBusy(true);
    const result = await updateOrCreate(vehicleInfo.vehicle);
    if (result.id !== vehicleInit.id) {
      const newVehicleInfo: VehicleInfo = { ...vehicleInfo, vehicle: result };
      setVehicleInfo(newVehicleInfo);
    }

    setBusy(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOwnerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const newOwner: Owner =
      ownerList.find((record: Owner) => record.id === selectedId) ?? ownerInit;
    if (newOwner.id !== ownerInit.id)
      setVehicleInfo((prev) => ({
        ...prev,
        owner: newOwner,
        vehicle: { ...prev.vehicle, ownerId: selectedId },
      }));
  };

  //--------------------------------------------------------------------------------------------------------------------------  //--------------------------------------------------------------------------------------------------------------------------
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const newBrand: Brand =
      brandList.find((record: Brand) => record.id === selectedId) ?? brandInit;
    if (newBrand.id !== brandInit.id) setVehicleInfo((prev) => ({ ...prev, brand: newBrand }));
  };
  //--------------------------------------------------------------------------------------------------------------------------  //--------------------------------------------------------------------------------------------------------------------------
  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const newModel: Model =
      modelList.find((record: Model) => record.id === selectedId) ?? modelInit;
    if (newModel.id !== modelInit.id) setVehicleInfo((prev) => ({ ...prev, model: newModel }));
  };

  const handleReset = () => {
    setVehicleInfo((prev) => ({ ...prev, vehicle: vehicleInit }));
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleQuit = () => {
    props.setModalOpen(false);
    props.onClose();
  };
  //--------------------------------------------------------------------------------------------------------------------------  //--------------------------------------------------------------------------------------------------------------------------
  if (!props.isModalOpen) return null;
  return (
    <>
      <ModalOverlay>
        <ModalContent onClick={(e) => e.stopPropagation()} style={{ width: "500px" }}>
          <ModalHeader>
            <ModalTitle>{t("title")}</ModalTitle>
            <QuitButton onClick={props.onClose} />
          </ModalHeader>
          <ModalBody>
            <OwnerROw>
              <Select
                label={t("owner")}
                options={ownerOptionList}
                onChange={handleOwnerChange}
                value={vehicleInfo.owner.id}
              />
              <Button
                $iconOnly
                onClick={props.onNewOwner}
                title={t("newOwner")}
                style={{ flex: "0 0 auto" }}
              >
                👨‍💼
              </Button>
            </OwnerROw>
            <Row>
              <Select
                label={t("brand")}
                options={brandListOption}
                onChange={handleBrandChange}
                value={vehicleInfo.brand.id}
              />
              <Select
                label={t("Model")}
                options={modelListOption}
                onChange={handleModelChange}
                value={vehicleInfo.model.id}
              />
            </Row>
            <Row>
              <Input
                label={t("plateNumber")}
                name="plateNumber"
                value={vehicleInfo.vehicle.plateNumber}
                onChange={handleInputChange}
              />
              <Input
                label={t("vintage")}
                value={vehicleInfo.vehicle.vintage}
                type="number"
                onChange={handleInputChange}
              />
            </Row>
            <Row>
              <Input
                label={t("color")}
                name="color"
                value={vehicleInfo.vehicle.color}
                onChange={handleInputChange}
              />
              <Input
                label={t("mileage")}
                value={vehicleInfo.vehicle.mileage}
                onChange={handleInputChange}
              />
            </Row>
            <ActionBar
              handleQuit={handleQuit}
              handleReset={handleReset}
              handleSave={handleSave}
              isBusy={isBusy}
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;

  & > * {
    flex: 0 0 calc(50% - 0.25rem); /* 0.25rem = moitié du gap */
    min-width: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    & > * {
      flex: 1 1 100%;
      width: 100%;
    }
  }
`;

const ModalContent = styled(StyledModalContent)`
  width: 500px;
  max-width: 95%;
  margin: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin: 0.5rem;
    border-radius: 0;
  }
`;

const OwnerROw = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: "nowrap";
  gap: "0.5rem";
  width: "100%";
  align-items: "center";
`;
