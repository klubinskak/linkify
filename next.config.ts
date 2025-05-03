import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      's3.amazonaws.com',
      'cdn.shopify.com', // For the placeholder image
      'knowt.com',
      'i.scdn.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
