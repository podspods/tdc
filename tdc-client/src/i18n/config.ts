import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import enCommon from "./locales/en/common.json";
import enNavigation from "./locales/en/navigation.json";
import enInvoice from "./locales/en/invoice.json";
import enOwner from "./locales/en/owner.json";
import enVehicle from "./locales/en/vehicle.json";
import enTask from "./locales/en/task.json";
import enSparePart from "./locales/en/sparePart.json";
import enCorrespondance from "./locales/en/correspondance.json";
import enGarage from "./locales/en/garage.json";
import enPartAndLabor from "./locales/en/partAndLabor.json";
import enPartAndLaborDb from "./locales/en/partAndLaborDb.json";
import enColor from "./locales/en/color.json";

import viCommon from "./locales/vi/common.json";
import viNavigation from "./locales/vi/navigation.json";
import viInvoice from "./locales/vi/invoice.json";
import viOwner from "./locales/vi/owner.json";
import viVehicle from "./locales/vi/vehicle.json";
import viTask from "./locales/vi/task.json";
import viSparePart from "./locales/vi/sparePart.json";
import viCorrespondance from "./locales/vi/correspondance.json";
import viGarage from "./locales/vi/garage.json";
import viPartAndLabor from "./locales/vi/partAndLabor.json";
import viPartAndLaborDb from "./locales/vi/partAndLaborDb.json";
import viColor from "./locales/vi/color.json";

import frCommon from "./locales/fr/common.json";
import frNavigation from "./locales/fr/navigation.json";
import frInvoice from "./locales/fr/invoice.json";
import frOwner from "./locales/fr/owner.json";
import frVehicle from "./locales/fr/vehicle.json";
import frTask from "./locales/fr/task.json";
import frSparePart from "./locales/fr/sparePart.json";
import frCorrespondance from "./locales/fr/correspondance.json";
import frGarage from "./locales/fr/garage.json";
import frPartAndLabor from "./locales/fr/partAndLabor.json";
import frPartAndLaborDb from "./locales/fr/partAndLaborDb.json";
import frColor from "./locales/fr/color.json";

export const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    invoice: enInvoice,
    owner: enOwner,
    vehicle: enVehicle,
    task: enTask,
    sparePart: enSparePart,
    correspondance: enCorrespondance,
    garage: enGarage,
    partAndLabor: enPartAndLabor,
    partAndLaborDb: enPartAndLaborDb,
    color: enColor,
  },
  vi: {
    common: viCommon,
    navigation: viNavigation,
    invoice: viInvoice,
    owner: viOwner,
    vehicle: viVehicle,
    task: viTask,
    sparePart: viSparePart,
    correspondance: viCorrespondance,
    garage: viGarage,
    partAndLabor: viPartAndLabor,
    partAndLaborDb: viPartAndLaborDb,
    color: viColor,
  },
  fr: {
    common: frCommon,
    navigation: frNavigation,
    invoice: frInvoice,
    owner: frOwner,
    vehicle: frVehicle,
    task: frTask,
    sparePart: frSparePart,
    correspondance: frCorrespondance,
    garage: frGarage,
    partAndLabor: frPartAndLabor,
    partAndLaborDb: frPartAndLaborDb,
    color: frColor,
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
