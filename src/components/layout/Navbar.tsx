"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { MobileMenu } from "./MobileMenu";

const links = [
  { href: "/work",    label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about",   label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeRoot = "/" + (pathname.split("/")[1] ?? "");

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Primary">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link href="/" className="logo" data-cursor-hover>
          <span className="logo-mark">
            <span>MK</span>
          </span>
          <span className="logo-text">
            Moizz K <span className="muted">— AI Engineer</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${activeRoot === href ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile menu */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <MagneticButton>
            <Link href="/contact" className="nav-cta">
              <span className="nav-cta-dot" />
              Available for hire
            </Link>
          </MagneticButton>
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
