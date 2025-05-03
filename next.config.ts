import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      's3.amazonaws.com',
      'cdn.shopify.com',
      'knowt.com',
      'i.scdn.co',
      'photogradient.com',
      'metafetch-api.vercel.app',
      'apps.ankiweb.net',
      'meshgradient.com',
      'superdesigner.co',
      'www.isocons.app',
      'www.radix-ui.com',
      'fontawesome.com',
      'react-icons.github.io',
      'lucide.dev',
      'worldvectorlogo.com',
      'logoipsum.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      }
    ]
  },
};

export default nextConfig;
