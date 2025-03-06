import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  experimental: {
    optimizeCss: false
  },
  
};

export default nextConfig;
