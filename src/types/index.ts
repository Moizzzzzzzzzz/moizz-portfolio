export interface Project {
  slug: string;
  title: string;
  description?: string;
  tagline?: string;
  tags?: string[];
  cover: string;
  thumbnail?: string;
  year?: number;
  date?: string;
  order?: number;
  featured?: boolean;
  status?: "live" | "case-study" | "archived";
  client?: string;
  role?: string;
  duration?: string;
  liveUrl?: string;
  githubUrl?: string;
  seo?: { description: string; ogImage?: string };
}

export type Post = {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  readingTime: string;
  draft: boolean;
};

export interface CaseStudyFrontmatter extends Project {
  problem: string;
  approach?: string;
  stack: string[];
  /** Old schema — kept for backward compat with non-documind case studies. */
  metrics?: { label: string; value: string }[];
  /** New schema — used by documind and future case studies. */
  results?: { metric: string; value: string; note?: string }[];
  demoUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
