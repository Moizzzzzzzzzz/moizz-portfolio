"use client";

import { cn } from "@/lib/cn";

type TagVariant = "default" | "accent";

interface TagProps {
  children: string;
  variant?: TagVariant;
  onClick?: () => void;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  default: "border border-border text-muted",
  accent: "bg-accent-soft border border-accent/20 text-accent",
};

export function Tag({ children, variant = "default", onClick, className }: TagProps) {
  const base = cn(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
    variantClasses[variant],
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          base,
          "cursor-pointer transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        )}
      >
        {children}
      </button>
    );
  }

  return <span className={base}>{children}</span>;
}
