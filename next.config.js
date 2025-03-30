/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/my-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '',
  trailingSlash: true,
  distDir: 'out',
  images: {
    domains: [
      'cdn.jsdelivr.net',
      'cdn.worldvectorlogo.com',
      'upload.wikimedia.org',
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      'placehold.co'
    ],
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
  // Disable automatic prefetching which can cause issues in GitHub Pages
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig