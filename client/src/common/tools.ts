/**
 * Date Utilities and Formatters
 */

/**
 * Convert ISO date string to French format DD/MM/YYYY
 */
export const formatDateFR = (isoDate: string): string => {
  if (!isoDate) return "";

  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return isoDate;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    return isoDate;
  }
};

/**
 * Format date with time
 */
export const formatDateTimeFR = (isoDate: string): string => {
  if (!isoDate) return "";

  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return isoDate;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return isoDate;
  }
};

/**
 * Format currency to VND
 */
export const formatCurrency = (amount: number): string => {
  if (amount === null || amount === undefined) return "0 ₫";

  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Fallback if Intl is not available
    return amount.toLocaleString("vi-VN") + " ₫";
  }
};

/**
 * Format currency with compact notation (K, M, B)
 */
export const formatCompactCurrency = (amount: number): string => {
  if (amount === null || amount === undefined) return "0 ₫";

  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
      compactDisplay: "short",
    }).format(amount);
  } catch {
    if (amount >= 1_000_000_000) {
      return (amount / 1_000_000_000).toFixed(1) + "B ₫";
    } else if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(1) + "M ₫";
    } else if (amount >= 1_000) {
      return (amount / 1_000).toFixed(1) + "K ₫";
    }
    return amount.toString() + " ₫";
  }
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Capitalize first letter
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Get initials from name
 */
export const getInitials = (firstName: string, lastName: string): string => {
  return (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "");
};
