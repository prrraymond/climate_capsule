import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  // Better error handling with source maps
  productionBrowserSourceMaps: true,
};

export default nextConfig;
