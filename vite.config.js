import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs/promises";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加載.env文件
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      host: "localhost",
      port: 3000,
      base: "/",
      open: true,
      proxy: {
        "/spotify-api": {
          // target: import.meta.env.VITE_SPOTIFY_API_BASE_URI,
          target: env.VITE_SPOTIFY_API_BASE_URI,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/spotify-api/, ""),
        },
        "/backend-api": {
          // target: import.meta.env.VITE_BACKEND_API_BASE_URI,
          target: env.VITE_BACKEND_API_BASE_URI,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/backend-api/, ""),
        },
        "/supabase-api": {
          // target: import.meta.env.VITE_SUPABASE_API_BASE_URI,
          target: env.VITE_SUPABASE_API_BASE_URI,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/supabase-api/, ""),
        },
      },
    },

    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/, // 匹配所有在src目錄下的.js和.jsx文件
      exclude: [],
      target: "esnext", // 設置目標環境為 esnext
    },

    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    build: {
      outDir: "dist", // 默认构建输出目录是 'dist'
      target: "esnext", // 設置目標環境為 esnext
    },

    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: "load-js-files-as-jsx",
            setup(build) {
              build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                loader: "jsx", // 對所有.js文件使用jsx_loader
                contents: await fs.readFile(args.path, "utf8"),
              }));
            },
          },
        ],
      },
    },
  };
});
