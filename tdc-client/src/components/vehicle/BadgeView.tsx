import styled from "styled-components";
import type { ComponentStatus } from "../../common/commun.types";
import ActionBar from "../invoice/ActionBar";
import { Select } from "./Select";
import type { VehicleInfo } from "./types";
import { useTranslation } from "react-i18next";

export type BadgeViewProps = {
  value: VehicleInfo;
  list: VehicleInfo[];
  editMode?: boolean;
  listMode?: boolean;
  onChange?: (vehicleInfoId: number) => void;
  onAction?: (state: ComponentStatus, vehicleInfo: VehicleInfo) => void;
};
export default function BadgeView({ ...props }: BadgeViewProps) {
  const { t } = useTranslation(["vehicle", "color"]);

  const HandleOnAction = (state: ComponentStatus) => {
    props.onAction?.(state, props.value);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <MainContainer>
        {props.editMode && (
          <>
            <Select
              vehicleSelected={props.value.vehicle.id}
              vehicleInfoList={props.list}
              onChange={props.onChange ?? (() => {})}
            />
          </>
        )}
        <p>
          {props.value.owner.lastName} {props.value.owner.firstName}
        </p>
        <p>
          {props.value.brand.name} {props.value.model.name}{" "}
          {t(`color:${props.value.vehicle.color}`)}
        </p>
        <p>
          {props.value.vehicle.plateNumber} - {props.value.vehicle.mileage} km
        </p>
        {props.listMode && <ActionBar onAction={HandleOnAction} />}
      </MainContainer>
    </>
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
