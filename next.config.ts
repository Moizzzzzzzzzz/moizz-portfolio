import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "**.moizz.dev" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    mdxRs: true,
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
