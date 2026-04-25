"use client";

import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { className?: string };

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text",
        "placeholder:text-muted",
        "transition-colors duration-200",
        "focus:border-accent/40 focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
      {...props}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string };

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text",
        "placeholder:text-muted",
        "transition-colors duration-200",
        "focus:border-accent/40 focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
      {...props}
    />
  );
}
