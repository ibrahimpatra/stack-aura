/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['i.ibb.co', 'images.unsplash.com', 'firebasestorage.googleapis.com', 'i.imgur.com'],
  },
  async rewrites() {
    // Nice own-domain image URLs: /media/my-photo.webp
    return [{ source: '/media/:name', destination: '/api/media/:name' }];
  },
  async headers() {
    return [
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/tech/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};
module.exports = nextConfig;
