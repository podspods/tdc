import { Invoice } from "../entity/invoice/invoice.types";

export function formatDateToYYYYMMDD(date: Date): string {
  const myDate = new Date(date);
  const year = myDate.getFullYear();
  const month = String(myDate.getMonth() + 1).padStart(2, "0");
  const day = String(myDate.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

// export function formatDateToYYYYMMDD(isoDate: string): string {
//   console.log("formatDateToYYYYMMDD isoDate", isoDate);
//   console.log("formatDateToYYYYMMDD typeof isoDate 13", typeof isoDate);
//   const returnValue = isoDate.split("T")[0].replace(/-/g, "");
//   console.log("formatDateToYYYYMMDD returnValue", returnValue);

//   return returnValue;
//   // return "1234ZZZ";
// }

export function generateInvoiceNumber(invoice: Invoice): string {
  const newGarageId = invoice.garageId ? invoice.garageId : 99;
  const newVehicleId = invoice.vehicleId ? invoice.vehicleId : 99;
  const newId = invoice.id ? invoice.id : 99999;
  const newdate: Date = invoice.issueDate ? invoice.issueDate : new Date();
  console.log(
    "%%%%%%%%%%%%%%%%ùùgenerateInvoiceNumber  typeofinvoice.issueDate 26 ",
    typeof invoice.issueDate,
  );
  console.log("%%%%%%%%%%%%%%%%ùùgenerateInvoiceNumber invoice.issueDate 27 ", invoice.issueDate);
  console.log(
    "%%%%%%%%%%%%%%%%ùùgenerateInvoiceNumber new Date().toISOString()28 ",
    typeof new Date().toISOString(),
  );
  console.log("%%%%%%%%%%%%%%%%ùùgenerateInvoiceNumber typeof newdate29 ", typeof newdate);
  return (
    newGarageId.toString().padStart(2, "0") +
    newVehicleId.toString().padStart(5, "0") +
    formatDateToYYYYMMDD(newdate) +
    "-" +
    newId.toString().padStart(5, "0")
  );
}
