import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { Correspondance } from "../correspondance/types";
import { headerLine, InvoiceLineInit, totalLine } from "../../common/constant";
import type { InvoiceLine } from "../invoice/types";
import { lineTypeSectionStyles } from "./styles";
import { Text, View } from "@react-pdf/renderer";
import BadgeLine from "./BadgeLine";

export type InvoiceLineDetailProps = {
  value: InvoiceLine[];
  lineType: Correspondance;
};

export default function InvoiceLineDetail({ ...props }: InvoiceLineDetailProps) {
  const { t } = useTranslation(["invoice", "correspondance"]);

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalGross, setTotalGross] = useState<number>(0);

  useEffect(() => {
    const sumTotal = () => {
      const totalGross = props.value.reduce(
        (sum, line) => sum + (line.unitPrice * line.quantity || 0),
        0,
      );
      setTotalGross(totalGross);
      const totalAmount = props.value.reduce((sum, line) => sum + (line.amount || 0), 0);
      setTotalAmount(totalAmount);
    };

    sumTotal();
  }, [props.value]);

  //--------------------------------------------------------------------------------------------------------------------------

  const total: InvoiceLine = {
    ...InvoiceLineInit,
    description: t("subtotal"),
    unitPrice: totalGross,
    amount: totalAmount,
  };

  if (props.value.length === 0) {
    return null;
  }

  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <View style={lineTypeSectionStyles.mainContainer}>
        <Text style={lineTypeSectionStyles.title}>
          {t(`correspondance:${props.lineType.description}`)}
        </Text>
        <BadgeLine key={0} value={InvoiceLineInit} typeLine={headerLine} index={0} />
        {props.value.map((line, index) => (
          <BadgeLine key={line.id} value={line} typeLine={props.lineType.code} index={index + 1} />
        ))}

        <BadgeLine key={"T"} value={total} typeLine={totalLine} index={0} />
      </View>
    </>
  );
}

export const LineTitle = styled.div`
  width: 100%;
  background-color: ${({ theme }) => `${theme.colors.background.warning}`};
  border-radius: ${({ theme }) => `${theme.borderRadius.sm}`};
`;
