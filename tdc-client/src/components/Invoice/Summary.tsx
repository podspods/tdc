import styled from "styled-components";
import type { InvoiceLine } from "./invoice.types";
import { LineContainer, LineTitle, MainSubject } from "./view.style";
import { useTranslation } from "react-i18next";
import { getCorrespondanceBySubject } from "../correspondance/Crud";
import { lineTypeSubjectCode } from "../../common/constant";
import type { Correspondance } from "../correspondance/types";
import { useEffect, useState } from "react";

export type SummaryProps = {
  value: InvoiceLine[];
  vatRate: number;
};

//--------------------------------------------------------------------------------------------------------------------------

export default function Summary({ ...props }: SummaryProps) {
  const { t } = useTranslation(["invoice"]);

  const [lineTypeList, setLineTypeList] = useState<Correspondance[]>([]);

  //--------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function fetchData() {
      const lineTypeList: Correspondance[] = await getCorrespondanceBySubject(lineTypeSubjectCode);
      setLineTypeList(lineTypeList);
    }
    fetchData();
  }, [props.value]);
  //--------------------------------------------------------------------------------------------------------------------------
  function computePartsAndLabor(value: InvoiceLine[]): {
    partandLaborList: number[];
    totalParAndLabor: number;
  } {
    const partandLaborList = lineTypeList.map((lineType) => {
      return value
        .filter((line) => line.lineTypeCode === lineType.code)
        .reduce((sum, line) => sum + (line.unitPrice * line.quantity || 0), 0);
    });
    const totalParAndLabor = partandLaborList.reduce((sum, val) => sum + val, 0);

    return { partandLaborList, totalParAndLabor };
  }
  //--------------------------------------------------------------------------------------------------------------------------

  function computeDiscount(value: InvoiceLine[]): {
    discountList: number[];
    totalDiscount: number;
  } {
    const discountList = lineTypeList.map((lineType) => {
      return value
        .filter((line) => line.lineTypeCode === lineType.code)
        .reduce(
          (sum, line) => sum + ((line.unitPrice * line.quantity * line.discountRate) / 100 || 0),
          0,
        );
    });
    const totalDiscount = discountList.reduce((sum, val) => sum + val, 0);

    return { discountList, totalDiscount };
  }
  //--------------------------------------------------------------------------------------------------------------------------

  const { partandLaborList, totalParAndLabor } = computePartsAndLabor(props.value);
  const { discountList, totalDiscount } = computeDiscount(props.value);
  const totalGross = totalParAndLabor - totalDiscount;

  const vat: number = (totalGross * props.vatRate) / 100 || 0;

  const netamount: number = totalGross + vat;
  return (
    <MainSubject>
      <LineTitle>{t("summary")}</LineTitle>
      <MyLineContainer>
        <Description>{t("partsAndlabor")}</Description>
        <Calculus>
          {partandLaborList.map((value, index) => value != 0 && <Value key={index}>{value}</Value>)}
        </Calculus>
        <Result>{totalParAndLabor.toLocaleString()} ₫</Result>
      </MyLineContainer>
      <MyLineContainer>
        <Description>{t("Discount")}</Description>
        <Calculus>
          {discountList.map((value, index) => value != 0 && <Value key={index}>{value}</Value>)}
        </Calculus>
        <Result>{totalDiscount.toLocaleString()} ₫</Result>
      </MyLineContainer>
      <MyLineContainer>
        <Gross></Gross>
        <Description>{t("subtotal")}</Description>
        <Calculus></Calculus>
        <Result>{totalGross.toLocaleString()} ₫</Result>
      </MyLineContainer>
      <MyLineContainer>
        <Description>{t("vat")}</Description>
        <Calculus>{props.vatRate}%</Calculus>
        <Result>{vat.toLocaleString()} ₫</Result>
      </MyLineContainer>
      <MyLineContainer>
        <Description>{t("grandTotal")}</Description>
        <Calculus></Calculus>
        <NetAmount>{netamount.toLocaleString()} ₫</NetAmount>
      </MyLineContainer>
    </MainSubject>
  );
}

const MyLineContainer = styled(LineContainer)`
  border-bottom: 1px dashed red;
  border-color: ${({ theme }) => `${theme.colors.background.white}`};
`;

const Description = styled.div`
  width: 60%;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
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
const Gross = styled.div`
  background-color: ${({ theme }) => `${theme.softColor._400}`};
`;

const Value = styled.div`
  width: 100%;
  text-align: right;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
`;
