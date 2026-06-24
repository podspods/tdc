import { useTranslation } from "react-i18next";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import type { Vehicle } from "./types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import type { Owner } from "../owner/types";
import { getAllOwner } from "../owner/crud";
import { Select } from "../UI/Select";
import { Input } from "../UI/Input";
import type { OptionValue } from "../../common/commun.types";
import { getBrandList } from "../brand/crud";
import { getModelList } from "../model/crud";
import { brandInit, vehicleInit } from "../../common/constant";
import { createVehicle, updateVehicle } from "./crud";
import toast from "react-hot-toast";

export type ModalProps = {
  editMode?: boolean;
  isOpen: boolean;
  vehicle: Vehicle; // null = creation mode
  owner: Owner;
  onClose: () => void;
  onSuccess: () => void; // refresh parent list
  setVehicle: (vehicle: Vehicle) => void;
  onNewOwner: () => void;
  onNewVehicle?: () => void;
};
export function Modal({ ...props }: ModalProps) {
  if (!props.isOpen) return null;

  const { t } = useTranslation(["vehicle"]);

  // const [currentEditMode, setCurrentEditMode] = useState<boolean>(props.editMode || false);
  const [vehicle, setVehicle] = useState<Vehicle>(props.vehicle);
  const [isBusy, setBusy] = useState<boolean>(false);

  const [ownerOptionList, setOwnerOptionList] = useState<OptionValue[]>([]);
  const [brandOptionList, setBrandOptionList] = useState<OptionValue[]>([]);
  const [currentBrandId, setCurrentBrandId] = useState<number>(brandInit.id);

  const [modelOptionList, setModelOptionList] = useState<OptionValue[]>([]);
  useEffect(() => {
    const newVehicle: Vehicle = { ...props.vehicle, ownerId: props.owner.id };
    setVehicle(newVehicle);
  }, [props.editMode, props.vehicle, props.owner]);

  useEffect(() => {
    const loadOwnerList = async () => {
      const ownerList = await getAllOwner();
      // setOwnerList(ownerList);
      const newOwnerOptionList: OptionValue[] = ownerList.map((record) => ({
        value: record.id.toString(),
        label: `${record.firstName} ${record.lastName}`,
      }));
      setOwnerOptionList(newOwnerOptionList);
    };
    loadOwnerList();
    loadBrand();
    loadModel();
  }, []);

  useEffect(() => {
    loadModel();
  }, [currentBrandId]);

  const loadBrand = async () => {
    const brandlist = await getBrandList();

    const newBrandOptionList: OptionValue[] = brandlist.map((record) => ({
      value: record.id.toString(),
      label: record.name,
    }));
    setBrandOptionList(newBrandOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadModel = async () => {
    const modelList = await getModelList();
    // setModelList(modelList);
    const newModelOptionList: OptionValue[] = modelList
      .filter((record) => record.brandId === currentBrandId)
      .map((record) => ({
        value: record.id.toString(),
        label: record.name,
      }));
    setModelOptionList(newModelOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleCreate = async () => {
    setBusy(true);
    const result: Vehicle =
      vehicle.id > 0 ? await updateVehicle(vehicle) : await createVehicle(vehicle);
    if (result.id !== vehicleInit.id) {
      setVehicle(result);
      props.setVehicle(result);
      props.onSuccess();
    } else {
      toast.error("error creating vehicle");
    }
    setBusy(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleOwnerChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const newVehicle: Vehicle = { ...vehicle, ownerId: Number(event.target.value) };
    setVehicle(newVehicle);
  };
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const newBrandid = Number(event.target.value);
    setCurrentBrandId(newBrandid);
  };
  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newVehicle: Vehicle = { ...vehicle, modelId: Number(event.target.value) };
    setVehicle(newVehicle);
  };
  const handlePlateNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicle: Vehicle = { ...vehicle, plateNumber: event.target.value };
    setVehicle(newVehicle);
  };
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicle: Vehicle = { ...vehicle, color: event.target.value };
    setVehicle(newVehicle);
  };

  const handleVintageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicle: Vehicle = { ...vehicle, vintage: Number(event.target.value) };
    setVehicle(newVehicle);
  };
  const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicle: Vehicle = { ...vehicle, mileage: Number(event.target.value) };
    setVehicle(newVehicle);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <ModalOverlay onClick={() => props.onClose()}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{t("title")}</ModalTitle>
            <button onClick={() => props.onClose()}>✕</button>
          </ModalHeader>
          <ModalBody>
            <p>modal body</p>
            <Row>
              <Select
                label={t("owner")}
                options={ownerOptionList}
                onChange={handleOwnerChange}
                width={"30%"}
                value={vehicle.ownerId}
              />
              <Button $iconOnly onClick={props.onNewOwner} title={t("newOwner")}>
                👨‍💼
              </Button>
            </Row>
            <Row>
              <Select
                label={t("brand")}
                options={brandOptionList}
                onChange={handleBrandChange}
                value={currentBrandId}
                width={"30%"}
              />
              <Select
                label={t("Model")}
                options={modelOptionList}
                onChange={handleModelChange}
                value={vehicle.modelId}
                width={"30%"}
              />
            </Row>
            <Row>
              <Input
                width="30%"
                label={t("plateNumber")}
                value={vehicle.plateNumber}
                onChange={handlePlateNumberChange}
              />
              <Input
                width="30%"
                label={t("vintage")}
                value={vehicle.vintage}
                type="number"
                onChange={handleVintageChange}
              />
              <Input
                width="30%"
                label={t("color")}
                value={vehicle.color}
                onChange={handleColorChange}
              />
              <Input
                width="30%"
                label={t("mileag")}
                value={vehicle.mileage}
                onChange={handleMileageChange}
              />
            </Row>
            <Button onClick={handleCreate} disabled={isBusy}>
              {t("createVehicle")}
            </Button>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;

  width: "100%";
`;
