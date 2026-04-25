"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

const links = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav aria-label="Main navigation" className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-text-bright hover:opacity-75 transition-opacity duration-200"
        >
          moizz<span className="text-muted">.</span>dev
        </Link>

        {/* Desktop nav links — centered */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "relative py-1 text-sm transition-colors duration-200",
                  pathname.startsWith(href)
                    ? "text-text-bright"
                    : "text-muted hover:text-text"
                )}
              >
                {label}
                {pathname.startsWith(href) && (
                  <span className="absolute -bottom-px left-0 h-px w-full bg-accent" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              "hidden md:inline-flex items-center gap-1.5",
              "h-8 px-4 rounded-lg text-xs font-medium",
              "bg-accent text-white hover:bg-accent/85 active:bg-accent/70",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            )}
          >
            Let&apos;s talk
            <span aria-hidden="true">→</span>
          </Link>

          <MobileMenu links={links} />
        </div>
      </nav>
    </header>
  );
}
