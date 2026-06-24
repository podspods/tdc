import { useTranslation } from "react-i18next";
import { LeftSide, LineTitle, MainSubject, TwoHalfPage } from "./view.style";
import styled from "styled-components";
import { LineContainer } from "../../common/common.styled";

export type AgreementProps = {};
export default function Agreement({ ...props }: AgreementProps) {
  const { t } = useTranslation(["invoice"]);

  return (
    <MainSubject>
      <LineTitle>{t("agreement")}</LineTitle>
      <LineContainer>{t("discountReason")}</LineContainer>
      <LineContainer>{t("paymentMethod")}</LineContainer>
      <LineContainer>{t("warranty")}</LineContainer>
      <TwoHalfPage style={{ padding: "1rem" }}>
        <GarageRepresentative>{t("garageRepresentative")}</GarageRepresentative>
        <Customer>{t("customer")}</Customer>
      </TwoHalfPage>
    </MainSubject>
  );
}

const GarageRepresentative = styled(LeftSide)`
  padding: ${({ theme }) => `${theme.spacing.sm} `};
  background-color: ${({ theme }) => theme.colors.background.white};
  border: 1px solid red;
  border-radius: ${({ theme }) => theme.spacing.sm};
  min-height: 10rem;
`;

const Customer = styled(GarageRepresentative)``;
