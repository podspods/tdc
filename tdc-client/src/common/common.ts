import type { Garage } from "../components/garage/garage.types";
import type { Invoice } from "../components/invoice/types";
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
export function ZformatDateToDDMMYYYY(date: Date): string {
  const myDate = new Date(date);
  const year = myDate.getFullYear();
  const month = String(myDate.getMonth() + 1).padStart(2, "0");
  const day = String(myDate.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}

// export function formatDateToYYYYMMDD(isoDate: string): string {
//   return isoDate.split("T")[0].replace(/-/g, "");
// }

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

export function generateInvoiceNumber(invoice: Invoice): string {
  const newGarageId = invoice.garageId ? invoice.garageId : 99;
  const newVehicleId = invoice.vehicleId ? invoice.vehicleId : 99;
  const newId = invoice.id ? invoice.id : 99999;
  const newdate: Date = invoice.issueDate ? invoice.issueDate : new Date();

  return (
    newGarageId.toString().padStart(2, "0") +
    newVehicleId.toString().padStart(5, "0") +
    formatDateToYYYYMMDD(newdate) +
    "-" +
    newId.toString().padStart(5, "0")
  );
}

// Fonction de formatage manuel (sans espace insécable)
export const formatNumber = (value: number): string => {
  const parts = value.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] ? `,${parts[1]}` : "";
  // Ajouter un espace normal (espace classique)
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted}${decimalPart}`;
};

export function inputChange<T extends Record<string, any>>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  currentValue: T,
): T {
  const { value, name, type } = e.target;
  if (type === "checkbox") {
    return { ...currentValue, [name]: e.target.checked };
  }
  if (type === "number") {
    return { ...currentValue, [name]: value === "" ? undefined : Number(value) };
  }
  if (type === "date") {
    return { ...currentValue, [name]: value === "" ? null : value };
  }

  return { ...currentValue, [name]: value };
}
