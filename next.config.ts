import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      's3.amazonaws.com',
      'cdn.shopify.com', // For the placeholder image
      'knowt.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
