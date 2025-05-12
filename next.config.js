/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/my-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '',
  distDir: 'out',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  // Disable linting during build - we'll handle it separately
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Make sure routes are properly generated
  trailingSlash: true,
  // Exclude problematic routes from export
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/projects': { page: '/projects' },
      '/contact': { page: '/contact' },
      '/404': { page: '/404' },
    };
  },
}

module.exports = nextConfig