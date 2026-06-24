import styled from "styled-components";
import { Button } from "../../common/common.styled";
import { InvoiceState } from "./types";
import { useTranslation } from "react-i18next";

export type ActionBarProps = {
  onAction: (state: InvoiceState) => void;
  editMode?: boolean;
};
export default function ActionBar({ ...props }: ActionBarProps) {
  const { t } = useTranslation(["invoice"]);

  return (
    <>
      <MainContainer>
        <Button $iconOnly onClick={() => props.onAction(InvoiceState.Edit)} title={t("edit")}>
          🖍
        </Button>
        <Button $iconOnly onClick={() => props.onAction(InvoiceState.View)} title={t("view")}>
          🔍
        </Button>
        <Button
          $iconOnly
          onClick={() => props.onAction(InvoiceState.Create)}
          title={t("newInvoice")}
        >
          ➕
        </Button>
        <Button $iconOnly onClick={() => props.onAction(InvoiceState.ToPdf)} title={t("toPdf")}>
          📜
        </Button>
        <Button $iconOnly onClick={() => props.onAction(InvoiceState.InitState)} title={t("Back")}>
          🔙
        </Button>
      </MainContainer>
    </>
  );
}

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
