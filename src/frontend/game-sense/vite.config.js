import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 80,
    },
    base: "/",
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: { enabled: true },
            manifest: {
                name: "GameSense",
                short_name: "GameSense",
                description: "GameSense",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
