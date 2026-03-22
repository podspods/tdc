/**
 * i18n configuration file
 * Supports English (en), Vietnamese (vi), French (fr)
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Import translations directly (optional - can also use HTTP backend)
import enCommon from "./locales/en/common.json";
import enLabor from "./locales/en/labor.json";
import enSparePart from "./locales/en/sparePart.json";
import enOwner from "./locales/en/owner.json";
import enInvoice from "./locales/en/invoice.json";

import viCommon from "./locales/vi/common.json";
import viLabor from "./locales/vi/labor.json";
import viSparePart from "./locales/vi/sparePart.json";
import viOwner from "./locales/vi/owner.json";
import viInvoice from "./locales/vi/invoice.json";

import frCommon from "./locales/fr/common.json";
import frLabor from "./locales/fr/labor.json";
import frSparePart from "./locales/fr/sparePart.json";
import frOwner from "./locales/fr/owner.json";
import frInvoice from "./locales/fr/invoice.json";

// Available languages
export const supportedLanguages = [
  { code: "en", name: "", flag: "🇬🇧" },
  { code: "vi", name: "", flag: "🇻🇳" },
  { code: "fr", name: "", flag: "🇫🇷" },
  //   { code: "en", name: "English", flag: "🇬🇧" },
  // { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  // { code: "fr", name: "Français", flag: "🇫🇷" },
];

// Resources object with all translations
const resources = {
  en: {
    common: enCommon,
    labor: enLabor,
    sparePart: enSparePart,
    owner: enOwner,
    invoice: enInvoice,
  },
  vi: {
    common: viCommon,
    labor: viLabor,
    sparePart: viSparePart,
    owner: viOwner,
    invoice: viInvoice,
  },
  fr: {
    common: frCommon,
    labor: frLabor,
    sparePart: frSparePart,
    owner: frOwner,
    invoice: frInvoice,
  },
};

// Default namespace
export const defaultNamespace = "common";

// i18n initialization
i18n
  // Use HTTP backend to load translations from public folder (optional)
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources, // Direct translations (comment out if using backend)

    // Backend configuration (if using HTTP)
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },

    // Default language
    fallbackLng: "en",

    // Supported languages
    supportedLngs: ["en", "vi", "fr"],

    // Default namespace
    ns: ["common", "navigation", "labor", "sparePart", "owner", "invoice"],
    defaultNS: defaultNamespace,

    // Detection options
    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already safes from XSS
      formatSeparator: ",",
    },

    // React options
    react: {
      useSuspense: false, // Set to false to avoid suspense issues
    },

    // Debug mode in development
    debug: process.env.NODE_ENV === "development",

    // Load all namespaces on initialization
    load: "all",
  });

export default i18n;
