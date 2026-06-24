import { useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import { InvoiceState, type InvoiceDisplay } from "../invoice/types";
import ActionBar from "../invoice/ActionBar";
import { fetchInvoiceDisplay } from "../invoice/helper";
import DisplayInvoice from "./DisplayInvoice";

export type ToPdfProps = {
  onStateChange: (state: InvoiceState, invoiceId: number) => void;
  invoiceId: number;
  invoiceState: InvoiceState;
};
export default function ToPdf({ ...props }: ToPdfProps) {
  const generatedRef = useRef(false);
  useEffect(() => {
    const loadData = async () => {
      if (generatedRef.current) return; // déjà généré
      generatedRef.current = true;
      try {
        const newInvoiceDisplay = await fetchInvoiceDisplay(props.invoiceId);
        generatePdf(newInvoiceDisplay);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    loadData();
  }, [props.invoiceId]);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: InvoiceState) => {
    props.onStateChange(state, props.invoiceId);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const generatePdf = async (invoiceDisplay: InvoiceDisplay) => {
    const blob = await pdf(<DisplayInvoice invoiceDisplay={invoiceDisplay} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "TDC-PDF");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    // props.onStateChange(InvoiceState.View, invoiceDisplay.invoice.id);
  };

  return (
    <>
      <h1>ToPdf</h1>
      <ActionBar onAction={handleAction} />
    </>
  );
}

//--------------------------------------------------------------------------------------------------------------------------
