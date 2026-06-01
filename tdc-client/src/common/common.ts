import type { Garage } from "../components/Garage/garage.types";
import type { OptionValue } from "./commun.types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
}

export const ZformatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN") + " ₫";
};

export function formatDateToYYYYMMDD(date: Date): string {
  const myDate = new Date(date);
  const year = myDate.getFullYear();
  const month = String(myDate.getMonth() + 1).padStart(2, "0");
  const day = String(myDate.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
export function formatDateToDDMMYYYY(date: Date): string {
  const myDate = new Date(date);
  const year = myDate.getFullYear();
  const month = String(myDate.getMonth() + 1).padStart(2, "0");
  const day = String(myDate.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}

export function garage2Option(garageList: Garage[]): OptionValue[] {
  const returnValue: OptionValue[] = garageList.map((value) => ({
    value: value.id.toString(),
    label: value.name,
  }));

  return returnValue;
}

export const saveSelectedGarageId = (id: number) => {
  localStorage.setItem("selectedGarageId", id.toString());
};

export const getSelectedGarageId = (): number | null => {
  const raw = localStorage.getItem("selectedGarageId");
  if (raw === null) return null;
  const id = parseInt(raw, 10);
  return isNaN(id) ? null : id;
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("fr-FR");
};

export function splitTaskCode(taskCode: string): string[] {
  const category = taskCode.substring(0, 2); // "MA"
  const subcategory = taskCode.substring(2, 4); // "EN"
  const brand = taskCode.substring(4, 6); // "AL"
  const sequence = taskCode.substring(6); // "002"
  return [category, subcategory, brand, sequence];
}
