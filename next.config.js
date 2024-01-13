/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vgdbmt7zigpfy6rk.public.blob.vercel-storage.com",
      },
    ],
    minimumCacheTTL: 60 * 60,
  },
};

module.exports = nextConfig;
