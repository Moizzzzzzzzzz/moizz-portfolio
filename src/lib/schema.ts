import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  cover: z.string(),
  year: z.number(),
  featured: z.boolean().optional(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  problem: z.string(),
  approach: z.string(),
  stack: z.array(z.string()),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })),
  demoUrl: z.string().url().optional(),
});

export const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
});
