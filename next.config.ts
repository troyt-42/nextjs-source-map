import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  webpack: (config, context) => {
    if (context.isServer) {
      if (context.dev) {
        config.devtool = "eval-source-map";
      } else {
        config.devtool = "source-map";
      }
    }

    return config;
  },
};

export default nextConfig;
