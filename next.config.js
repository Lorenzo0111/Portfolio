const { withPlausibleProxy } = require('next-plausible');

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

module.exports = withPlausibleProxy({
  subdirectory: "s",
  customDomain: "https://s.lorenzo0111.me"
})(nextConfig);