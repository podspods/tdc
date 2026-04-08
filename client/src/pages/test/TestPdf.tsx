import InvoicePDFGenerator, { InvoiceData } from "../../components/InvoicePDFGenerator";

export type TestPdfProps = {};
export default function TestPdf({ ...props }: TestPdfProps) {
  const myData: InvoiceData = {
    invoiceNumber: "invoid number",
    issueDate: "issu date",
    dueDate: "due date",
    owner: { name: "onwer name", phone: "onwer phon", email: "onwer mail" },
    vehicle: {
      plateNumber: "vehicle plate number",
      model: "vehicle model",
      year: 2000,
      brand: "vehicle   brand",
    },

    items: [
      {
        description: "items desc",
        hours: 9,
        rate: 8,
        quantity: 1,
        unitPrice: 2,
        amount: 3,
        type: "labor",
      },
    ],
    subtotal: 10,
    taxRate: 11,
    totalAmount: 12,
    amountPaid: 13,
    garageInfo: { name: "garage info ", phone: "garage phone ", address: "garage address " },
  };

  return (
    <>
      <h1>TestPdf</h1>
      <InvoicePDFGenerator data={myData} />
    </>
  );
}
