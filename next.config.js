/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional but helpful: allow Next Image to load from common hosts
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },

  // If you use server actions, this keeps them flexible
  experimental: {
    serverActions: { allowedOrigins: ['*'] }
  },

  // Keep your existing webpack alias to ignore 'canvas' in the browser
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: false
    }
    return config
  }
}

export default nextConfig
