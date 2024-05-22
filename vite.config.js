import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // 替換為你想要的主機名
    port: 3333, // 替換為你想要的端口號
  },
});
