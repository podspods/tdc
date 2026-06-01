import styled from "styled-components";
import type { VehicleInfo } from "./vehicle.types";

export type BadgeProps = {
  value: VehicleInfo;
};
export default function Badge({ ...props }: BadgeProps) {
  return (
    <MainContainer>
      <Model>{`${props.value.brandName} - ${props.value.modelName} `}</Model>
      <Information>{`${props.value.plateNumber} - ${props.value.mileage} km`}</Information>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  text-align: left;
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid black;
  border-color: ${({ theme }) => theme.colors.text.primary};
  width: "100%";
`;

const Model = styled.div``;
const Information = styled.div``;
