import type { Correspondance } from "../correspondance/types";
import type { InvoiceLine, SummaryValue } from "./types";

export function calculateSumary(
  invoiceLineList: InvoiceLine[],
  lineTypeList: Correspondance[],
  vatRate: number,
): SummaryValue {
  const { partandLaborList, totalParAndLabor } = computePartsAndLabor(
    lineTypeList,
    invoiceLineList,
  );
  const { discountList, totalDiscount } = computeDiscount(lineTypeList, invoiceLineList);
  const totalGross = totalParAndLabor - totalDiscount;

  const vat: number = (totalGross * vatRate) / 100 || 0;

  const newSummaryValue: SummaryValue = {
    partandLaborList: partandLaborList,
    totalPartAndLabor: totalParAndLabor,
    discountList: discountList,
    totalDiscount: totalDiscount,
    totalGross: totalGross,
    netAmount: totalGross + vat,
    vat: (totalGross * vatRate) / 100 || 0,
  };
  return newSummaryValue;
}
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

export function computePartsAndLabor(
  lineTypeList: Correspondance[],
  invoiceLineList: InvoiceLine[],
): {
  partandLaborList: number[];
  totalParAndLabor: number;
} {
  const partandLaborList = lineTypeList.map((lineType) => {
    return invoiceLineList
      .filter((line) => line.lineTypeCode === lineType.code)
      .reduce((sum, line) => sum + (line.unitPrice * line.quantity || 0), 0);
  });
  const totalParAndLabor = partandLaborList.reduce((sum, val) => sum + val, 0);

  return { partandLaborList, totalParAndLabor };
}

//--------------------------------------------------------------------------------------------------------------------------

export function computeDiscount(
  lineTypeList: Correspondance[],
  invoiceLineList: InvoiceLine[],
): {
  discountList: number[];
  totalDiscount: number;
} {
  const discountList = lineTypeList.map((lineType) => {
    return invoiceLineList
      .filter((line) => line.lineTypeCode === lineType.code)
      .reduce(
        (sum, line) => sum + ((line.unitPrice * line.quantity * line.discountRate) / 100 || 0),
        0,
      );
  });
  const totalDiscount = discountList.reduce((sum, val) => sum + val, 0);

  return { discountList, totalDiscount };
}
