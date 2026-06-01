import styled from "styled-components";
import type { InvoiceLine } from "./invoice.types";
import { headerLine, totalLine } from "../../common/constant";
import { useTranslation } from "react-i18next";
import { Description, Discount, Gross, Id, LineContainer, Net, Quantity } from "./view.style";

export type BadgeLineProps = {
  value: InvoiceLine;
  index: number;
  typeLine: number;
};

export default function BadgeLine({ ...props }: BadgeLineProps) {
  const { t } = useTranslation(["invoice"]);

  const renderContent = () => {
    switch (props.typeLine) {
      case headerLine: // en-tête des colonnes
        return (
          <LineContainer>
            <Id>{t("n°")}</Id>
            <Description style={{ textAlign: "center" }}>{t("description")}</Description>
            <Quantity style={{ textAlign: "center" }}>{t("quantity")}</Quantity>
            <Gross style={{ textAlign: "center" }}>{t("grossPrice")}</Gross>
            <Discount style={{ textAlign: "center" }}>{t("discountRate")}</Discount>
            <Net style={{ textAlign: "center" }}>{t("amount")}</Net>
          </LineContainer>
        );
      case totalLine: // ligne de total général
        return (
          <LineContainer>
            <Id></Id>
            <Description>{t("grandTotal")}</Description>
            <Quantity></Quantity>
            <Gross>{props.value.unitPrice.toLocaleString()} ₫</Gross>
            <Discount></Discount>
            <Net>{props.value.amount.toLocaleString()} ₫</Net>
          </LineContainer>
        );
      default: // ligne normale de détail
        return (
          <LineContainer>
            <Id>
              {props.typeLine}.{props.index}
            </Id>
            <Description>{props.value.description}</Description>
            <Quantity>{props.value.quantity}</Quantity>
            <Gross>{props.value.unitPrice.toLocaleString()} ₫</Gross>
            <Discount>{props.value.discountRate}%</Discount>
            <Net>{props.value.amount.toLocaleString()} ₫</Net>
          </LineContainer>
        );
    }
  };

  return <>{renderContent()}</>;
}
