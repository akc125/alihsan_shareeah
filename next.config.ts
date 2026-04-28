import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // REQUIRED for Electron static build

  images: {
    unoptimized: true, // REQUIRED for Electron
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
