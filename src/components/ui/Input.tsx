import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { className?: string };

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-3 text-sm placeholder:text-foreground/30 focus:border-foreground/40 focus:outline-none transition-colors",
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
        "w-full resize-none rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-3 text-sm placeholder:text-foreground/30 focus:border-foreground/40 focus:outline-none transition-colors",
        className
      )}
      {...props}
    />
  );
}
