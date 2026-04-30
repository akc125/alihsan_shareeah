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
      {
        protocol: "https",
        hostname: "alihsan-shareeath-college.onrender.com",
      },
    ],
  },
};

export default nextConfig;
