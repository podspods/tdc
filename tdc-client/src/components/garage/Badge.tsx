import { _getGarageById } from "./garage.service";
import type { Garage } from "./garage.types";
import styled from "styled-components";
import Select from "./Select";

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
  width: 80%;
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

export type BadgeProps = {
  value: Garage;
  garageList?: Garage[];
  editMode?: boolean;
  onChange?: (garageId: number) => void;
};
export default function Badge({ ...props }: BadgeProps) {
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
        {props.value.logoUrl && (
          <Image src={props.value.logoUrl} alt={props.value.name} title={props.value.name} />
        )}
        <Footer>
          <Address>🏠 {`${props.value.address}, ${props.value.city}`} </Address>

          <Phone>📞 {props.value.phone}</Phone>
        </Footer>
      </MainContainer>
    </>
  );
}
