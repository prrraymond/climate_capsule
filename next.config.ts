import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
