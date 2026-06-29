import { _getGarageById } from "./garage.service";
import type { Garage } from "./garage.types";
import styled from "styled-components";
import Select from "./Select";
import type { ComponentStatus } from "../../common/commun.types";
import SelectBar from "../UI/SelectBar";

const MainContainer = styled.div`
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid black;
  border-color: ${({ theme }) => theme.colors.text.primary};
  width: "100%";
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const Footer = styled.div`
  border-top: 1px solid red;
  border-color: ${({ theme }) => theme.colors.text.primary};
`;

const Address = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;
const Phone = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.base};
`;
const Name = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
`;

export type BadgeProps = {
  value: Garage;
  garageList?: Garage[];
  editMode?: boolean;
  listMode?: boolean;
  onChange?: (garageId: number) => void;
  onAction?: (state: ComponentStatus, garage: Garage) => void;
};
export default function Badge({ ...props }: BadgeProps) {
  //--------------------------------------------------------------------------------------------------------------------------
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
              garageSelected={props.value.id}
              garageList={props.garageList || []}
              onChange={props.onChange ?? (() => {})}
            />
          </>
        )}
        <Name>{props.value.name} </Name>
        {props.value.logoUrl && (
          <Image src={props.value.logoUrl} alt={props.value.name} title={props.value.name} />
        )}
        <Footer>
          <Address>🏠 {`${props.value.address}, ${props.value.city}`} </Address>

          <Phone>📞 {props.value.phone}</Phone>
        </Footer>
        {props.listMode && <SelectBar onAction={HandleOnAction} withPdf />}
      </MainContainer>
    </>
  );
}
