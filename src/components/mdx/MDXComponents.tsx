import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/cn";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("mt-10 mb-4 text-4xl font-bold tracking-tight", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("mt-8 mb-3 text-2xl font-semibold", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("mt-6 mb-2 text-xl font-semibold", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("my-4 leading-7 text-foreground/80", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn("underline underline-offset-4 hover:text-foreground transition-colors", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 ml-6 list-disc space-y-1 text-foreground/80", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-4 ml-6 list-decimal space-y-1 text-foreground/80", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("my-4 border-l-2 border-foreground/20 pl-4 italic text-foreground/60", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn("rounded bg-foreground/10 px-1 py-0.5 text-sm font-mono", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn("my-6 overflow-x-auto rounded-xl bg-foreground/5 p-4 text-sm", className)}
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-foreground/10" />,
};
