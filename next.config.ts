import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Allow product images from the Noroff API
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.noroff.dev",
      },
    ],
  },
};

export default nextConfig;
