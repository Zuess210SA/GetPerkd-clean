/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@neondatabase/serverless'],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
}

export default nextConfig