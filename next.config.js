/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/my-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '',
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
}

module.exports = nextConfig