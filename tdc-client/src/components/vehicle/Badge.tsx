import styled from "styled-components";
import type { Vehicle, VehicleInfo } from "./types";
import { useEffect, useState } from "react";
import { Select as SelectVehicle } from "./Select";
import type { Owner } from "../owner/types";
import { ownerInit, vehicleInfoInit } from "../../common/constant";
import { Input } from "../UI/Input";
import { useTranslation } from "react-i18next";
import { Button } from "../../common/common.styled";
import { getVehicleInfoByOwnerId, updateVehicle } from "./crud";

export type BadgeProps = {
  value: Vehicle;
  owner: Owner;
  editMode?: boolean;
  onChange?: (vehicleid: number) => void;
  ownerChange?: boolean;
  onNewOwner?: () => void;
  onNewVehicle?: () => void;
};
export default function Badge({ ...props }: BadgeProps) {
  const { t } = useTranslation(["vehicle", "color"]);

  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(vehicleInfoInit);
  const [vehicleInfoList, setVehicleInfoList] = useState<VehicleInfo[]>([]);

  useEffect(() => {
    if (props.value && props.owner.id !== ownerInit.id) {
      fetchVehicleInfoListByOwner(props.owner.id);
      setVehicleInfo({ ...vehicleInfoInit, vehicle: props.value });
    }
  }, [props.value, props.owner]);
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchVehicleInfoListByOwner = async (ownerId: number) => {
    const ownerVehicleInfoList: VehicleInfo[] = await getVehicleInfoByOwnerId(ownerId);
    setVehicleInfoList(ownerVehicleInfoList);
    const vehicleInfoSelected: VehicleInfo =
      ownerVehicleInfoList.find(
        (vehicleInfo) => vehicleInfo.vehicle.id === vehicleInfo.vehicle.id,
      ) || vehicleInfoInit;
    setVehicleInfo(vehicleInfoSelected);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleVehicleChange = (id: number) => {
    if (id !== vehicleInfo.vehicle.id) {
      const vehicleSelected = vehicleInfoList.find((record) => record.vehicle.id === id);
      if (vehicleSelected) {
        setVehicleInfo(vehicleSelected || vehicleInfoInit);
        props.onChange?.(id);
      }
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMileage = Number(event.target.value);
    const newVehicule: Vehicle = { ...vehicleInfo.vehicle, mileage: newMileage };
    const newVehicleInfo: VehicleInfo = { ...vehicleInfo, vehicle: newVehicule };
    updateVehicle(newVehicule);
    setVehicleInfo(newVehicleInfo);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const color = t(`color: ${vehicleInfo.vehicle.color}`);
  return (
    <MainContainer>
      {props.editMode && (
        <Row>
          <SelectVehicle
            onChange={handleVehicleChange}
            vehicleInfoList={vehicleInfoList}
            vehicleSelected={vehicleInfo.vehicle.id}
          />
          <Button $iconOnly onClick={props.onNewVehicle} title={t("newVehicle")}>
            🏍
          </Button>
        </Row>
      )}
      <Model>{`${vehicleInfo.brand.name}-${vehicleInfo.model.name}-${color}`}</Model>
      <Information>
        <Input
          fontSize="0.7rem"
          width="10rem"
          readOnly
          label={t("plateNumber")}
          value={vehicleInfo.vehicle.plateNumber}
        />
        <Input
          fontSize="0.7rem"
          width="10rem"
          readOnly={!props.editMode}
          label={t("mileage")}
          type="number"
          value={vehicleInfo.vehicle.mileage}
          onChange={handleMileageChange}
        />
      </Information>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: ${({ theme }) => `${theme.fontSize.xs}`};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid black;
  border-color: ${({ theme }) => theme.colors.text.primary};
  width: "100%";
`;

const Model = styled.div`
  width: 100%;
  align-items: center;
  text-align: center;
`;
const Information = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  gap: 0.3rem;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  width: "100%";
`;
