/**
 * Date utilities for formatting dates in French format
 */

/**
 * Interface for date format options
 */
export interface DateFormatOptions {
  includeTime?: boolean;
  separator?: "/" | "-" | ".";
}

/**
 * Default date format options
 */
const defaultOptions: DateFormatOptions = {
  includeTime: false,
  separator: "/",
};

/**
 * Format ISO date to French format (DD/MM/YYYY)
 * @param isoDate - ISO date string
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * formatDateFR("2026-03-09T07:58:26.411Z") // "09/03/2026"
 * formatDateFR("2026-03-09T07:58:26.411Z", { includeTime: true }) // "09/03/2026 07:58"
 * formatDateFR("2026-03-09T07:58:26.411Z", { separator: '-' }) // "09-03-2026"
 */
export const formatDateFR = (
  isoDate: string,
  options: DateFormatOptions = defaultOptions,
): string => {
  // Gérer les cas null/undefined
  if (!isoDate) {
    return "";
  }

  try {
    const date = new Date(isoDate);

    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      console.warn(`[dateUtils] Invalid date: ${isoDate}`);
      return isoDate;
    }

    const { includeTime = false, separator = "/" } = options;

    // Format de base: DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}${separator}${month}${separator}${year}`;

    // Ajouter l'heure si demandé
    if (includeTime) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${formattedDate} ${hours}:${minutes}`;
    }

    return formattedDate;
  } catch (error) {
    console.error("[dateUtils] Error formatting date:", error);
    return isoDate;
  }
};

/**
 * Format ISO date to relative time (e.g., "il y a 2 jours")
 * @param isoDate - ISO date string
 * @returns Relative time string in French
 */
export const formatRelativeTime = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return `il y a ${diffSec} seconde${diffSec > 1 ? "s" : ""}`;
    } else if (diffMin < 60) {
      return `il y a ${diffMin} minute${diffMin > 1 ? "s" : ""}`;
    } else if (diffHour < 24) {
      return `il y a ${diffHour} heure${diffHour > 1 ? "s" : ""}`;
    } else if (diffDay < 30) {
      return `il y a ${diffDay} jour${diffDay > 1 ? "s" : ""}`;
    } else {
      return formatDateFR(isoDate);
    }
  } catch (error) {
    return isoDate;
  }
};

/**
 * Parse French date string to Date object
 * @param frDate - French date string (DD/MM/YYYY)
 * @returns Date object
 */
export const parseFrenchDate = (frDate: string): Date | null => {
  try {
    const [day, month, year] = frDate.split("/").map(Number);
    return new Date(year, month - 1, day);
  } catch (error) {
    console.error("[dateUtils] Error parsing French date:", error);
    return null;
  }
};
