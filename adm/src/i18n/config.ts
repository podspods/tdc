import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import enCommon from "./locales/en/common.json";
import enNavigation from "./locales/en/navigation.json";
import enInvoiceHeaders from "./locales/en/invoiceHeaders.json";

import viCommon from "./locales/vi/common.json";
import viNavigation from "./locales/vi/navigation.json";
import viInvoiceHeaders from "./locales/vi/invoiceHeaders.json";

import frCommon from "./locales/fr/common.json";
import frNavigation from "./locales/fr/navigation.json";
import frInvoiceHeaders from "./locales/fr/invoiceHeaders.json";

export const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    invoiceHeaders: enInvoiceHeaders,
  },
  vi: {
    common: viCommon,
    navigation: viNavigation,
    invoiceHeaders: viInvoiceHeaders,
  },
  fr: {
    common: frCommon,
    navigation: frNavigation,
    invoiceHeaders: frInvoiceHeaders,
  },
};

export const supportedLanguages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "vi", "fr"],
    ns: ["common", "navigation", "invoiceHeaders"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
