import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../i18n";

/**
 * Custom hook for language management
 * Provides utilities for working with translations
 */
export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  /**
   * Get current language code
   */
  const currentLanguage = i18n.language;

  /**
   * Get current language object
   */
  const currentLanguageObject =
    supportedLanguages.find((lang) => lang.code === currentLanguage) || supportedLanguages[0];

  /**
   * Check if a specific language is active
   */
  const isActive = (langCode: string): boolean => {
    return currentLanguage === langCode;
  };

  /**
   * Format currency according to current language
   */
  const formatCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat(currentLanguage, {
      style: "currency",
      currency: currentLanguage === "vi" ? "VND" : "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  /**
   * Format date according to current language
   */
  const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString(currentLanguage, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  /**
   * Format datetime according to current language
   */
  const formatDateTime = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleString(currentLanguage, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * Get direction (RTL/LTR) - all our languages are LTR
   */
  const direction = "ltr";

  return {
    t,
    i18n,
    currentLanguage,
    currentLanguageObject,
    isActive,
    formatCurrency,
    formatDate,
    formatDateTime,
    direction,
    supportedLanguages,
  };
};

export default useLanguage;
