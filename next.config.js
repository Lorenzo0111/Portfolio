/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evokhnbifwpfmrlptpxw.supabase.co",
      },
    ],
    minimumCacheTTL: 7 * 24 * 60 * 60,
  },
};

module.exports = nextConfig;