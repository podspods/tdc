import styled from "styled-components";
import type { Invoice, InvoiceLine, SummaryValue } from "./types";
import { Description, LineTitle, MainSubject } from "./view.style";
import { useTranslation } from "react-i18next";
import type { Correspondance } from "../correspondance/types";
import { useEffect, useState } from "react";
import { summaryValueInit } from "../../common/constant";
import { LineContainer } from "../../common/common.styled";
import { calculateSumary } from "./helper";

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

  // const fetchInvoiceLine = async () => {
  //   try {
  //     const response = await getInvoiceLineById(props.invoiceId);
  //     setInvoiceLineList(response);
  //   } catch (err) {
  //     toast.error("Une erreur inattendue est survenue");
  //   }
  // };
  //--------------------------------------------------------------------------------------------------------------------------

  // const calculateSumary = (invoiceLineList: InvoiceLine[], lineTypeList: Correspondance[]) => {
  //   const { partandLaborList, totalParAndLabor } = computePartsAndLabor(
  //     lineTypeList,
  //     invoiceLineList,
  //   );
  //   const { discountList, totalDiscount } = computeDiscount(lineTypeList, invoiceLineList);
  //   const totalGross = totalParAndLabor - totalDiscount;

  //   const vat: number = (totalGross * props.vatRate) / 100 || 0;

  //   const newSummaryValue: SummaryValue = {
  //     partandLaborList: partandLaborList,
  //     totalPartAndLabor: totalParAndLabor,
  //     discountList: discountList,
  //     totalDiscount: totalDiscount,
  //     totalGross: totalGross,
  //     netAmount: totalGross + vat,
  //     vat: (totalGross * props.vatRate) / 100 || 0,
  //   };
  //   setSummaryValue(newSummaryValue);
  // };
  // //--------------------------------------------------------------------------------------------------------------------------

  // function computePartsAndLabor(
  //   lineTypeList: Correspondance[],
  //   invoiceLineList: InvoiceLine[],
  // ): {
  //   partandLaborList: number[];
  //   totalParAndLabor: number;
  // } {
  //   const partandLaborList = lineTypeList.map((lineType) => {
  //     return invoiceLineList
  //       .filter((line) => line.lineTypeCode === lineType.code)
  //       .reduce((sum, line) => sum + (line.unitPrice * line.quantity || 0), 0);
  //   });
  //   const totalParAndLabor = partandLaborList.reduce((sum, val) => sum + val, 0);

  //   return { partandLaborList, totalParAndLabor };
  // }
  // //--------------------------------------------------------------------------------------------------------------------------

  // function computeDiscount(
  //   lineTypeList: Correspondance[],
  //   invoiceLineList: InvoiceLine[],
  // ): {
  //   discountList: number[];
  //   totalDiscount: number;
  // } {
  //   const discountList = lineTypeList.map((lineType) => {
  //     return invoiceLineList
  //       .filter((line) => line.lineTypeCode === lineType.code)
  //       .reduce(
  //         (sum, line) => sum + ((line.unitPrice * line.quantity * line.discountRate) / 100 || 0),
  //         0,
  //       );
  //   });
  //   const totalDiscount = discountList.reduce((sum, val) => sum + val, 0);

  //   return { discountList, totalDiscount };
  // }
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <MainSubject>
      <LineTitle>{t("summary")}</LineTitle>
      <MyLineContainer>
        <MyDescription>{t("partsAndlabor")}</MyDescription>

        <Calculus>
          {summaryValue.partandLaborList.map(
            (value, index) => value != 0 && <Value key={index}>{value}</Value>,
          )}
        </Calculus>
        <Result>
          {summaryValue.totalPartAndLabor.toLocaleString()} {t("currency")}
        </Result>
      </MyLineContainer>
      <MyLineContainer>
        <MyDescription>{t("Discount")}</MyDescription>
        <Calculus>
          {summaryValue.discountList.map(
            (value, index) => value != 0 && <Value key={index}>{value}</Value>,
          )}
        </Calculus>
        <Result>
          {summaryValue.totalDiscount.toLocaleString()} {t("currency")}
        </Result>
      </MyLineContainer>
      <MyLineContainer>
        <MyDescription>{t("subtotal")}</MyDescription>
        <Calculus></Calculus>
        <Result>
          {summaryValue.totalGross.toLocaleString()} {t("currency")}
        </Result>
      </MyLineContainer>
      <MyLineContainer>
        <MyDescription>{t("vat")}</MyDescription>
        <Calculus>{props.vatRate}%</Calculus>
        <Result>
          {summaryValue.vat.toLocaleString()} {t("currency")}
        </Result>
      </MyLineContainer>
      <MyLineContainer>
        <MyDescription>{t("grandTotal")}</MyDescription>
        <Calculus></Calculus>
        <NetAmount>
          {summaryValue.netAmount.toLocaleString()} {t("currency")}
        </NetAmount>
      </MyLineContainer>
    </MainSubject>
  );
}

const MyLineContainer = styled(LineContainer)`
  border-bottom: 1px dashed red;
  border-color: ${({ theme }) => `${theme.colors.background.white}`};
`;

const MyDescription = styled(Description)`
  width: 59%;
`;

const Calculus = styled.div`
  width: 20%;
  font-size: ${({ theme }) => `${theme.fontSize.xs}`};
`;

const Result = styled.div`
  width: 20%;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  text-align: right;
`;
const NetAmount = styled(Result)`
  font-weight: 700;
  border: 2px solid red;
`;

const Value = styled.div`
  width: 100%;
  text-align: right;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
`;
