import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [];
  },
  async rewrites() {
    return [
      // Fix mistaken /public/* requests: public folder is served at root
      { source: "/public/:path*", destination: "/:path*" },
    ];
  },
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.13", // Your current device
    "::1", // IPv6 localhost
  ],
  images: {
    localPatterns: [
      {
        // `public/` is served at site root. Omit `search` so cache-bust query strings
        // (e.g. `?v=20260423` on static assets) are allowed per Next image docs.
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
