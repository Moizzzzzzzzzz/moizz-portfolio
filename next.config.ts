import path from "path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// String paths are resolved by @next/mdx's mdx-js-loader at compile time
// (see mdx-js-loader.js → importPluginForPath). Plain strings are
// serializable by Turbopack, unlike inline functions.
const STRIP_FM = path.resolve("./src/lib/remark-strip-frontmatter.mjs");

const withMDX = createMDX({
  options: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remarkPlugins: [STRIP_FM, "remark-gfm"] as any,
  },
});

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
};

export default withBundleAnalyzer(withMDX(nextConfig));
