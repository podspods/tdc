import styled from "styled-components";
import { useEffect, useState } from "react";
import { modelInfoInit } from "../../common/constant";
import SelectBar from "../UI/SelectBar";
import type { ComponentStatus } from "../../common/commun.types";
import type { ModelInfo } from "./types";

export type BadgeProps = {
  value: ModelInfo;
  onAction: (state: ComponentStatus, modelInfo: ModelInfo) => void;
};
export default function Badge({ ...props }: BadgeProps) {
  const [modelInfo, setModelInfo] = useState<ModelInfo>(modelInfoInit);

  useEffect(() => {
    setModelInfo(props.value);
  }, [props.value]);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus) => {
    console.log("handleAction 21", state);
    props.onAction(state, modelInfo);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      <div>{modelInfo.model.id}</div>
      <p>{modelInfo.brand.name}</p>
      <p>{modelInfo.model.name}</p>
      <p>{modelInfo.model.engineType}</p>
      {/* <p>{model.createDate.toISOString().split("T")[0]}</p> // "2026-06-25" */}
      <p>{modelInfo.model.createdBy}</p>
      <SelectBar onAction={handleAction} />
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
