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
      'images.unsplash.com'
    ],
    unoptimized: true,
  }
}

module.exports = nextConfig