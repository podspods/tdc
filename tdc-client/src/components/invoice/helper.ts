import { lineTypeSubjectCode } from "../../common/constant";
import { _getBrandById } from "../brand/service";
import { getCorrespondanceBySubject } from "../correspondance/crud";
import type { Correspondance } from "../correspondance/types";
import { getGarage } from "../garage/crud";
import { getVehicleInfoById } from "../vehicle/crud";
import { getInvoiceById, getInvoiceLineById } from "./crud";
import type { InvoiceLine, SummaryValue } from "./types";
import type { InvoiceDisplay } from "./types";

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

//--------------------------------------------------------------------------------------------------------------------------
export async function fetchInvoiceDisplay(id: number): Promise<InvoiceDisplay> {
  const newInvoice = await getInvoiceById(id);
  const newInvoiceLineList = await getInvoiceLineById(id);
  const lineTypeList = await getCorrespondanceBySubject(lineTypeSubjectCode);
  const vehicleInfo = await getVehicleInfoById(newInvoice.vehicleId);
  const garage = await getGarage(newInvoice.garageId);

  const invoiceDisplay: InvoiceDisplay = {
    invoice: newInvoice,
    invoiceLineList: newInvoiceLineList,
    lineTypeList: lineTypeList,
    vehicleInfo: vehicleInfo,
    garage: garage,
  };

  return invoiceDisplay;
}
