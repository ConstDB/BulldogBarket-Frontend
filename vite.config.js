import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
