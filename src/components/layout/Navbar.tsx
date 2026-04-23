"use client";

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          moizz<span className="text-foreground/30">.</span>dev
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  pathname.startsWith(href) ? "text-foreground" : "text-foreground/50"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <MobileMenu links={links} />
      </nav>
    </header>
  );
}
