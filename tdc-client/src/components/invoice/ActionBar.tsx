import styled from "styled-components";
import { Button } from "../../common/common.styled";
import { useTranslation } from "react-i18next";
import { ComponentStatus } from "../../common/commun.types";

export type ActionBarProps = {
  onAction: (state: ComponentStatus) => void;
  withPdf?: boolean;
};
export default function ActionBar({ ...props }: ActionBarProps) {
  const { t } = useTranslation(["invoice"]);

  return (
    <>
      <MainContainer>
        <Button $iconOnly onClick={() => props.onAction(ComponentStatus.Edit)} title={t("edit")}>
          🖍
        </Button>
        <Button $iconOnly onClick={() => props.onAction(ComponentStatus.View)} title={t("view")}>
          🔍
        </Button>
        <Button
          $iconOnly
          onClick={() => props.onAction(ComponentStatus.Create)}
          title={t("newInvoice")}
        >
          ➕
        </Button>
        {props.withPdf && (
          <Button
            $iconOnly
            onClick={() => props.onAction(ComponentStatus.ToPdf)}
            title={t("toPdf")}
          >
            📜
          </Button>
        )}
        <Button $iconOnly onClick={() => props.onAction(ComponentStatus.Init)} title={t("Back")}>
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
