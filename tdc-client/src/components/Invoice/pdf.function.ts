import { consumablelist, header, sparePartList, taskLists } from "./Pdf.test";
import type { PdfHeader } from "./Pdf.types";

export function getHeader(invoiceDbId: number): PdfHeader {
  return header;
}

export function getTaskList(invoiceDbId: number) {
  return taskLists;
}
export function getSparePartList(invoiceDbId: number) {
  return sparePartList;
}

export function getConsumablelist(invoiceDbId: number) {
  return consumablelist;
}
