import { useTranslation } from "react-i18next";
import type { Correspondance } from "../correspondance/types";
import { useEffect, useState } from "react";
import { summaryValueInit } from "../../common/constant";
import type { Invoice, InvoiceLine, SummaryValue } from "../invoice/types";
import { Text, View } from "@react-pdf/renderer";
import { calculateSumary } from "../invoice/helper";
import { lineTypeSectionStyles, summaryStyles } from "./styles";
import { formatNumber } from "../../common/common";

export type SummaryProps = {
  lineTypeList: Correspondance[];
  invoice: Invoice;
  invoiceLineList: InvoiceLine[];

  vatRate: number;
};

//--------------------------------------------------------------------------------------------------------------------------

export default function Summary({ ...props }: SummaryProps) {
  const { t } = useTranslation(["invoice"]);

  const [lineTypeList, setLineTypeList] = useState<Correspondance[]>([]);
  const [invoiceLineList, setInvoiceLineList] = useState<InvoiceLine[]>(props.invoiceLineList);
  const [summaryValue, setSummaryValue] = useState<SummaryValue>(summaryValueInit);

  //--------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setLineTypeList(props.lineTypeList);
    setInvoiceLineList(props.invoiceLineList);
    // fetchInvoiceLine();
  }, [props.lineTypeList, props.invoiceLineList]);
  //--------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const newSummaryValue = calculateSumary(invoiceLineList, lineTypeList, props.vatRate);
    setSummaryValue(newSummaryValue);
  }, [invoiceLineList, lineTypeList, props.vatRate]);
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <View style={summaryStyles.mainContainer}>
      <Text style={summaryStyles.title}>{t("summary")}</Text>
      <View style={summaryStyles.row}>
        <Text style={summaryStyles.subTitle}>{t("partsAndlabor")}</Text>

        <View style={summaryStyles.detailValue}>
          {summaryValue.partandLaborList.map(
            (value, index) =>
              value != 0 && (
                <Text style={summaryStyles.detailTextValue} key={index}>
                  {formatNumber(value)}
                </Text>
              ),
          )}
        </View>
        <Text style={summaryStyles.totalValue}>
          {formatNumber(summaryValue.totalPartAndLabor)} {t("currency")}
        </Text>
      </View>
      <View style={summaryStyles.row}>
        <Text style={summaryStyles.subTitle}>{t("Discount")}</Text>
        <View style={summaryStyles.detailValue}>
          {summaryValue.discountList.map(
            (value, index) =>
              value != 0 && (
                <Text style={summaryStyles.detailTextValue} key={index}>
                  {formatNumber(value)}
                </Text>
              ),
          )}
        </View>
        <Text style={summaryStyles.totalValue}>
          {formatNumber(summaryValue.totalDiscount)} {t("currency")}
        </Text>
      </View>
      <View style={summaryStyles.row}>
        <Text style={summaryStyles.subTitle}>{t("subtotal")}</Text>
        <View style={summaryStyles.detailValue}></View>
        <Text style={summaryStyles.totalValue}>
          {formatNumber(summaryValue.totalGross)} {t("currency")}
        </Text>
      </View>
      <View style={summaryStyles.row}>
        <Text style={summaryStyles.subTitle}>{t("vat")}</Text>
        <View style={summaryStyles.detailValue}>
          <Text style={summaryStyles.detailTextValue}>{props.vatRate}%</Text>
        </View>
        <Text style={summaryStyles.totalValue}>
          {formatNumber(summaryValue.vat)} {t("currency")}
        </Text>
      </View>
      <View style={summaryStyles.row}>
        <Text style={summaryStyles.subTitle}>{t("grandTotal")}</Text>
        <View style={summaryStyles.detailValue}></View>
        <Text style={summaryStyles.netAmount}>
          {formatNumber(summaryValue.netAmount)} {t("currency")}
        </Text>
      </View>
    </View>
  );
}

// const MyLineContainer = styled(LineContainer)`
//   border-bottom: 1px dashed red;
//   border-color: ${({ theme }) => `${theme.colors.background.white}`};
// `;

// const MyDescription = styled(Description)`
//   width: 59%;
// `;

// const Calculus = styled.div`
//   width: 20%;
//   font-size: ${({ theme }) => `${theme.fontSize.xs}`};
// `;

// const Text = styled.div`
//   width: 20%;
//   padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
//   text-align: right;
// `;
// const NetAmount = styled(Result)`
//   font-weight: 700;
//   border: 2px solid red;
// `;

// const Value = styled.div`
//   width: 100%;
//   text-align: right;
//   padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
// `;
