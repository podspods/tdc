import ActionBar from "../invoice/ActionBar";
import type { ComponentStatus } from "../../common/commun.types";
import styled from "styled-components";
import type { Cost } from "./types";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumber } from "../../common/common";

const MainContainer = styled.div`
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid black;
  border-color: ${({ theme }) => theme.colors.text.primary};
  width: "100%";
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
`;

export type BadgeProps = {
  value: Cost;
  costList: Cost[];
  editMode?: boolean;
  listMode?: boolean;
  onChange?: (costId: number) => void;
  onAction?: (state: ComponentStatus, cost: Cost) => void;
};
export default function Badge({ ...props }: BadgeProps) {
  const { t } = useTranslation(["cost"]);

  //--------------------------------------------------------------------------------------------------------------------------
  const HandleOnAction = (state: ComponentStatus) => {
    props.onAction?.(state, props.value);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <MainContainer>
        <Name>{t(props.value.name)} </Name>
        <p>
          {props.value.dayWork} {t("days")} x {props.value.hourWork} {t("hours")}
        </p>
        <p>
          {formatNumber(props.value.monthlyBase)}
          {t("currency")}
        </p>
        <PDate>
          {t("effectiveDate")}:
          {props.value.effectiveDate ? moment(props.value.effectiveDate).format("DD/MM/YYYY") : ""}
        </PDate>

        <PDate>
          {t("endDate")}:
          {props.value.endDate ? moment(props.value.endDate).format("DD/MM/YYYY") : "∞"}
        </PDate>

        {props.listMode && <ActionBar onAction={HandleOnAction} />}
      </MainContainer>
    </>
  );
}

const PDate = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSize.base};
  text-align: left;
`;
