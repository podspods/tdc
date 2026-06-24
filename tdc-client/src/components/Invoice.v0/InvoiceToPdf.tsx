import {
  InvoiceState,
  type GroupedInvoiceLine,
  type groupedInvoiceLine,
  type Invoice,
  type InvoiceInfo,
  type InvoiceLine,
} from "./types";
import type { PdfDataHeader } from "./Pdf.types";
import { getVehicleById } from "../vehicle/Crud";
import { getOwnerById } from "../owner/crud";
import type { Owner } from "../owner/types";
import { getInvoiceById } from "./crud";
import { _getInvoiceLine } from "./invoice.service";
import { pdf } from "@react-pdf/renderer";
import ToPdf from "./invoice.ToPdf";
import { useEffect, useState } from "react";
import { _getGarageById } from "../garage/garage.service";
import { garageInit, lineTypeSubjectCode } from "../../common/constant";
import ActionBar from "./ActionBar";
import { getInvoiceLine } from "./crud";
import type { Correspondance } from "../correspondance/types";
import { getCorrespondanceBySubject } from "../correspondance/crud";

export type InvoiceToPdfProps = {
  onStateChange: (state: InvoiceState, invoiceId: number) => void;
  invoiceInfo: InvoiceInfo;
};
export default function InvoiceToPdf({ ...props }: InvoiceToPdfProps) {
  const [lineTypeList, setLineTypeList] = useState<Correspondance[]>([]);

  useEffect(() => {
    const fetchTypeLines = async () => {
      try {
        const newTypeLineList = await getCorrespondanceBySubject(lineTypeSubjectCode);
        setLineTypeList(newTypeLineList);
      } catch (error) {
        console.error("Failed to load type lines:", error);
      }
    };
    fetchTypeLines();
  }, []);

  useEffect(() => {
    generatePdf(props.invoiceInfo.id);
  }, [lineTypeList]);
  //--------------------------------------------------------------------------------------------------------------------------
  const getPdfDataHeaderInvoice = async (invoice: Invoice): Promise<PdfDataHeader> => {
    const vehicle = await getVehicleById(invoice.vehicleId);
    const response = await _getGarageById(invoice.garageId);
    const myGarage = response.success ? response.data : garageInit;
    const owner: Owner = await getOwnerById(vehicle.ownerId);
    return {
      garage: myGarage || garageInit,
      owner: owner,
      vehicle: vehicle,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: new Date(invoice.issueDate),
    };
  };
  //--------------------------------------------------------------------------------------------------------------------------

  async function generatePdf(invoiceId: number) {
    // Generate the PDF document
    const invoice = await getInvoiceById(invoiceId);

    // 2. Get invoice lines
    const invoiceLineList = await getInvoiceLine(invoiceId);

    // 3. Filter lines by type

    const invoiceHeader: PdfDataHeader = await getPdfDataHeaderInvoice(invoice);

    const blob = await pdf(
      <ToPdf
        header={invoiceHeader}
        invoiceLineList={invoiceLineList}
        lineTypeList={lineTypeList}
      />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    // Open in a new tab
    window.open(url, "_blank");
    // Revoke the URL after a delay to free memory
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: InvoiceState) => {
    props.onStateChange(state, props.invoiceInfo.id);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <h1>InvoiceToPdf</h1>
      <ActionBar onAction={handleAction} />
    </>
  );
}
