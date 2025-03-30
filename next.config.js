/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.jsdelivr.net',
      'upload.wikimedia.org',
      'avatars.githubusercontent.com',
      'images.unsplash.com'
    ],
  }
}

module.exports = nextConfig