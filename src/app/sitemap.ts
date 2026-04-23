import type { MetadataRoute } from "next";
import { getAllProjects, getAllPosts } from "@/lib/mdx";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://moizz.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${baseUrl}/writing/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    ...projects,
    ...posts,
  ];
}
