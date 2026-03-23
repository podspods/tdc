import { MenuItem } from "./commonType";

export const API_NAME = "Tommi's Ducati club";

// Menu items data
export const menuItems: MenuItem[] = [
  { id: "home", label: "home", path: "/" },
  { id: "sest", label: "test", path: "/test/rate-config" },

  { id: "models", label: "model", path: "/models" },
  { id: "ADM model", label: "ADM model", path: "/admin/models" },
  { id: "registrations", label: "registrations", path: "/registrations" },
  { id: "ADM registrations", label: "ADM registrations", path: "/admin/registrations" },
  { id: "owners", label: "owners", path: "/owners" },
  { id: "ADM owners", label: "ADM owners", path: "/admin/owners" },
  { id: "ADM Labor", label: "ADM labor", path: "/admin/labor" },
  { id: "checkDatabase", label: "checkDatabase", path: "/checkDatabase" },
  { id: "testApi", label: "testApi", path: "/testApi" },
  { id: "about", label: "about", path: "/about" },
  { id: "contact", label: "contact", path: "/contact" },
];
