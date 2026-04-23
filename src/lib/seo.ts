import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://moizz.dev";

export const siteConfig = {
  name: "Moizz",
  title: "Moizz — AI Engineer & Full-Stack Developer",
  description:
    "Building production-grade AI systems — RAG pipelines, LLM agents, and developer tools that ship.",
  url: baseUrl,
  ogImage: `${baseUrl}/og.png`,
  links: {
    github: "https://github.com/moizzz",
    twitter: "https://twitter.com/moizzz",
  },
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@moizzz",
    },
    metadataBase: new URL(baseUrl),
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
