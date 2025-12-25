import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uuhfmiptamruqyoxigki.supabase.co',
      },
    ],
  },
};

export default nextConfig;
