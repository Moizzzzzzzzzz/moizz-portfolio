import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-foreground text-background hover:opacity-80": variant === "primary",
          "hover:bg-foreground/10": variant === "ghost",
          "border border-foreground/20 hover:bg-foreground/5": variant === "outline",
        },
        {
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-5 text-sm": size === "md",
          "h-12 px-7 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
