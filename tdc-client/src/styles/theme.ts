// src/theme.ts

export const cherryBlossonBloom = {
  text: {
    brand: "#CC0000",
    primary: "#590d22",
    secondary: "#800f2f",
    success: "#a4133c",
    warning: "#c9184a",
    error: "#ff4d6d",
    black: "#03071e",
  },
  background: {
    brand: "#FFFFFF",
    primary: "#fff0f3",
    secondary: "#ffccd5",
    success: "#ffb3c1",
    warning: "#ff8fa3",
    error: "#ff758f",
    white: "#FFFFFF",
  },
  border: {
    primary: "#081c15",
    secondary: "#1b4332",
    success: "#2d6a4f",
    warning: "#40916c",
    error: "#52b788",
    black: "#03071e",
    white: "#d1d5db",
  },
};

export const lightColor = {
  text: {
    brand: "#CC0000",
    primary: "#CC0000",
    secondary: "#0F0F0F",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#ff4d6d",
    black: "#000000",
  },
  background: {
    brand: "#f8f9fa",
    primary: "e9ecef",
    secondary: "#dee2e6",
    success: "#ced4da",
    warning: "#adb5bd",
    error: "#adb5bd",
    white: "#f8f9fa",
  },
  border: {
    primary: "#212529",
    secondary: "#343a40",
    success: "#495057",
    warning: "6c757d",
    error: "#adb5bd",
    black: "#212529",
    white: "#f8f9fa",
  },
};

export const darkColor = {
  text: {
    brand: "#f8f9fa",
    primary: "e9ecef",
    secondary: "#dee2e6",
    success: "#ced4da",
    warning: "#adb5bd",
    error: "#adb5bd",
    black: "#000000",
  },
  background: {
    brand: "#CC0000",
    primary: "#CC0000",
    secondary: "#0F0F0F",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#ff4d6d",
    white: "#f8f9fa",
  },
  border: {
    primary: "#212529",
    secondary: "#343a40",
    success: "#495057",
    warning: "6c757d",
    error: "#adb5bd",
    black: "#212529",
    white: "#f8f9fa",
  },
};

export const softRainbow = {
  _000: "#fbf8cc",
  _100: "#fde4cf",
  _200: "#ffcfd2",
  _300: "#f1c0e8",
  _400: "#cfbaf0",
  _500: "#a3c4f3",
  _600: "#90dbf4",
  _700: "#8eecf5",
  _800: "#98f5e1",
  _900: "#b9fbc0",
};

export const commonTheme = {
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },
  statusColor: {
    "0": "#dcfce7",
    "1": "#fef3c7",
    "2": "#fee2e2",
    "3": "#dbeafe",
    "4": "#f3f4f6",
  },
  softColor: { ...softRainbow },
};

export const lightTheme = {
  ...commonTheme,
  colors: { ...lightColor },
};

export const darkTheme = {
  ...commonTheme,
  colors: { ...darkColor },
};

export const cherryBlossonBloomTheme = {
  ...commonTheme,
  colors: { ...cherryBlossonBloom },
};

// export type Theme = typeof lightTheme;
export type Theme = typeof darkTheme;

// export const theme = darkTheme;
// export const theme = lightTheme;
export const theme = cherryBlossonBloomTheme;
