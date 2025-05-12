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
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
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