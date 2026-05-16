import type { PdfDataHeader } from "./Pdf.types";

export async function generateHeader(invoiceId: number) {
  const invoiceRes = await _getInvoiceById(invoiceId);

  if (!invoiceRes.success) {
    console.error("invoice not found  id:", invoiceId);
    return;
  }
  const currentInvoice: Invoice = invoiceRes.data || INVOICE_INIT;
  const vehicleResponse = await _getVehicleById(currentInvoice?.vehicleId || 0);

  if (!vehicleResponse.success) {
    console.error("vehicle not found id :", currentInvoice.vehicleId);
    return;
  }
  const vehicle: Vehicle = vehicleResponse?.data || VEHICLE_INIT;
  const ownerResponse = await _getOwnerById(vehicle.ownerId);
  console.log("ownerResponse", ownerResponse);
  if (!ownerResponse.data) {
    console.error("owner not found id :", vehicle.ownerId);
    return;
  }

  const owner: Owner = ownerResponse?.data || OWNER_INIT;

  // 2. Get invoice lines
  const linesRes = await _getInvoiceLine(invoiceId);
  const lines = linesRes.success ? linesRes.data : [];

  // 3. Filter lines by type
  const taskList = lines?.filter((l) => l.lineTypeCode === 1);
  const sparePartList = lines?.filter((l) => l.lineTypeCode === 2);
  const consumableList = lines?.filter((l) => l.lineTypeCode === 3);

  console.log("taskList", taskList);

  // 3. Construire l’en‑tête (avec les vraies données)
  const invoiceHeader: PdfDataHeader = {
    garage: garageTest,
    owner: owner,
    vehicle: vehicle,
    invoiceNumber: currentInvoice?.invoiceNumber || invoiceNulberText,
    invoiceDate: dateTest,
  };
}
