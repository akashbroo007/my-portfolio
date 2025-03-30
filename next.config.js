/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.jsdelivr.net',
      'upload.wikimedia.org',
      'avatars.githubusercontent.com',
      'images.unsplash.com'
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig