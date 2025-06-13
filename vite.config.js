import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
        theme: {
          extend: {
            colors: {
              primary: "#5B76F7",
              secondary: "#1E2939",
              accent: "#101828",
            },
          },
        },
        plugins: [],
      },
    }),
  ],
});
