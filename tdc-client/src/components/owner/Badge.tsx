import styled from "styled-components";
import type { Owner } from "./owner.types";

export type BadgeProps = {
  value: Owner;
};
export default function Badge({ ...props }: BadgeProps) {
  return (
    <MainContainer>
      <Name>
        {props.value.firstName} {props.value.lastName}
      </Name>

      {props.value.address && <Address>{props.value.address}</Address>}
      {props.value.city && <City>{props.value.city}</City>}
      {props.value.phoneNumber && <Phone> 📞{props.value.phoneNumber}</Phone>}
    </MainContainer>
  );
}

const Name = styled.div``;
const Address = styled.div``;
const City = styled.div``;
const Phone = styled.div``;

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
