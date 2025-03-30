/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/my-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '',
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
}

module.exports = nextConfig