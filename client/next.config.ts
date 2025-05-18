import type { NextConfig } from "next";

const nextConfig: NextConfig = {  // для читання з сервера
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
