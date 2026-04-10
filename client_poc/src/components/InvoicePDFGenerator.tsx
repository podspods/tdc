import React, { useState } from "react";
import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { InvoicePDF } from "./InvoicePDF";
// import { Button } from "./UI/Button";

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  owner: { name: string; phone: string; email?: string };
  vehicle: { plateNumber: string; brand: string; model: string; year?: number };
  items: Array<{
    description: string;
    hours?: number;
    rate?: number;
    quantity?: number;
    unitPrice?: number;
    amount: number;
    type: "labor" | "part" | "consumable";
  }>;
  subtotal: number;
  taxRate: number;
  totalAmount: number;
  amountPaid: number;
  garageInfo: { name: string; phone: string; address: string };
}

const InvoicePDFGenerator: React.FC<{ data: InvoiceData }> = ({ data }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <PDFDownloadLink
          document={<InvoicePDF {...data} />}
          fileName={`invoice_${data.invoiceNumber}.pdf`}
        >
          {({ blob, url, loading, error }) => (
            <button disabled={loading}>{loading ? "Generating PDF..." : "📄 Download PDF"}</button>
          )}
        </PDFDownloadLink>

        <button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Hide Preview" : "👁️ Preview PDF"}
        </button>
        <button>toto</button>
      </div>

      {showPreview && (
        <div style={{ height: "600px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
          <PDFViewer width="100%" height="100%">
            <InvoicePDF {...data} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default InvoicePDFGenerator;
