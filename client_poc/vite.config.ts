import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      // ✅ CORRECT: Redirige /api/* vers le backend
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: true,
        // Pas de réécriture supplémentaire
      },
    },
  },
});
