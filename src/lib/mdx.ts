import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CaseStudyFrontmatter, Post } from "@/types";

const WORK_DIR = path.join(process.cwd(), "src/content/work");
const WRITING_DIR = path.join(process.cwd(), "src/content/writing");

function readMdx<T>(dir: string, slug: string): { frontmatter: T; content: string } {
  const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content };
}

function listSlugs(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllProjects(): (CaseStudyFrontmatter & { slug: string })[] {
  return listSlugs(WORK_DIR).map((slug) => {
    const { frontmatter } = readMdx<CaseStudyFrontmatter>(WORK_DIR, slug);
    return { ...frontmatter, slug };
  });
}

export function getProject(slug: string) {
  return readMdx<CaseStudyFrontmatter>(WORK_DIR, slug);
}

export function getAllPosts(): (Post & { slug: string })[] {
  return listSlugs(WRITING_DIR)
    .map((slug) => {
      const { frontmatter } = readMdx<Post>(WRITING_DIR, slug);
      return { ...frontmatter, slug };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string) {
  return readMdx<Post>(WRITING_DIR, slug);
}
