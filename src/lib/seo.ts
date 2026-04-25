import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://moizzz.dev";

export const siteConfig = {
  name: "Moizz K",
  title: "Moizz K — AI Engineer",
  description:
    "Full-stack AI engineer building production RAG systems, AI agents, and LLM products. Based in Pakistan, working globally.",
  url: baseUrl,
  ogImage: `${baseUrl}/opengraph-image`,
  twitter: "@moizzzzzzzzzz",
  links: {
    github: "https://github.com/Moizzzzzzzzzz",
    twitter: "https://twitter.com/moizzzzzzzzzz",
  },
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  url = siteConfig.url,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  url?: string;
} = {}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitter,
    },
    metadataBase: new URL(baseUrl),
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

export function buildMetadata(overrides: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — AI Engineer`,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitter,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  };
}
