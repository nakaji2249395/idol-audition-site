import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb"
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qpblyjszkqiurtipyhie.supabase.co",
        pathname: "/storage/v1/object/public/**"
      },
      {
        protocol: "https",
        hostname: "audition-plus.nerim.info",
        pathname: "/img/audition/**"
      }
    ]
  }
};

export default nextConfig;
