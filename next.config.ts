import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.13", // Your current device
    "::1", // IPv6 localhost
  ],
};

export default nextConfig;
