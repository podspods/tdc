import { formatDateToYYYYMMDD } from "../../common/common";

//--------------------------------------------------------------------------------------------------------------------------
export function generateTempInvoiceNumber(
  garageId: number,
  ownerId: number,
  vehicleId: number,
): string {
  return (
    garageId.toString().padStart(2, "0") +
    ownerId.toString().padStart(4, "0") +
    vehicleId.toString().padStart(5, "0") +
    formatDateToYYYYMMDD(new Date()) +
    "-"
  );
}
