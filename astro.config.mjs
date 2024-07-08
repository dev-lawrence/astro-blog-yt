import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    sanity({
      projectId: "7nolqz71",
      dataset: "production",
      useCdn: true,
      studioBasePath: "/admin",
    }),
  ],
  output: "server",
  devToolbar: {
    enabled: false,
  },
  adapter: netlify(),

  image: {
    remotePatterns: [{ protocol: "http" }, { protocol: "https" }],
  },
});
