import { useEffect, useState } from "react";
import { getSelectedGarageId } from "../../common/common";
import { _getGarageById } from "./garage.service";
import type { Garage } from "./garage.types";
import { garageInit } from "../../common/constant";
import styled from "styled-components";

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
  id?: number;
  fetchGarage?: (id: number) => Promise<{ success: boolean; data?: Garage }>;
};
export default function Badge({ ...props }: BadgeProps) {
  const [currentGarage, setCurrentGarage] = useState<Garage>(garageInit);

  useEffect(() => {
    const loadGarage = async () => {
      const garageId = props.id ? props.id : getSelectedGarageId();
      if (!garageId) return;

      const service = props.fetchGarage || _getGarageById;
      const response = await service(garageId);
      if (response.success) {
        setCurrentGarage(response?.data || garageInit);
      }
    };

    loadGarage();
  }, [props.id, props.fetchGarage]);

  return (
    <>
      <MainContainer>
        {currentGarage.logoUrl && (
          <Image src={currentGarage.logoUrl} alt={currentGarage.name} title={currentGarage.name} />
        )}
        <Footer>
          <Address>🏠 {`${currentGarage.address}, ${currentGarage.city}`} </Address>

          <Phone>📞 {currentGarage.phone}</Phone>
        </Footer>
      </MainContainer>
    </>
  );
}
