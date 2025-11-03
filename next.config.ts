import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evokhnbifwpfmrlptpxw.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
    minimumCacheTTL: 7 * 24 * 60 * 60,
  },
};

export default withPlausibleProxy({
  subdirectory: "s",
  customDomain: "https://s.lorenzo0111.me",
})(nextConfig);
