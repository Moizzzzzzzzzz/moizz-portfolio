export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  cover: string;
  year: number;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime?: string;
}

export interface CaseStudyFrontmatter extends Project {
  problem: string;
  approach: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  demoUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
