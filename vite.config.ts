import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/react-ecommerce/" : "/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["node_modules"],
        quietDeps: true,
      },
    },
  },
}));
