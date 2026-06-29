import styled from "styled-components";
import { useEffect, useState } from "react";
import { brandInit } from "../../common/constant";
import type { Brand } from "./types";
import SelectBar from "../UI/SelectBar";
import type { ComponentStatus } from "../../common/commun.types";

export type BadgeProps = {
  value: Brand;
  onAction: (state: ComponentStatus, brand: Brand) => void;
};
export default function Badge({ ...props }: BadgeProps) {
  const [brand, setBrand] = useState<Brand>(brandInit);

  useEffect(() => {
    setBrand(props.value);
  }, [props.value]);

  //--------------------------------------------------------------------------------------------------------------------------
  const HandleAction = (state: ComponentStatus) => {
    props.onAction(state, brand);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      <div>
        {brand.id} - {brand.code}
      </div>
      <p>{brand.name}</p>
      <p>{brand.countryOfOrigin}</p>
      {/* <p>{brand.createDate.toISOString().split("T")[0]}</p> // "2026-06-25" */}
      <p>{brand.createdBy}</p>
      <SelectBar onAction={HandleAction} />
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
