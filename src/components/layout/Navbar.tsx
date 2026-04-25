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
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 px-8 lg:px-16 px-6 lg:px-10",
        scrolled
          ? "bg-black/90 backdrop-blur-md border-white/10"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-wide text-white text-base font-semibold pl-2">
          moizz.dev
        </Link>

        {/* Nav links — desktop */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative py-1 px-3 text-sm transition-colors duration-200",
                pathname.startsWith(href)
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {label}
              {pathname.startsWith(href) && (
                <span className="absolute -bottom-px left-0 h-px w-full bg-violet-600" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA button + mobile menu */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="px-6 py-2 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            Let&apos;s talk →
          </Link>

          <MobileMenu links={links} />
        </div>

      </div>
    </header>
  );
}
