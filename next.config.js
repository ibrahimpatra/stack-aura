/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['i.ibb.co', 'images.unsplash.com', 'firebasestorage.googleapis.com', 'i.imgur.com'],
  },
};
module.exports = nextConfig;
