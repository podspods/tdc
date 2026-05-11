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
