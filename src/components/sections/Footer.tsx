import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const social = [
  { href: "https://github.com/moizzzzzzzzz", label: "GitHub" },
  { href: "https://linkedin.com/in/moizzz", label: "LinkedIn" },
  { href: "https://twitter.com/moizzz", label: "Twitter" },
  { href: "https://upwork.com/freelancers/moizzz", label: "Upwork" },
];

export function Footer() {
  return (
    <footer className="border-t border-[--color-border] mt-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        {/* Main row */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left — brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-text-bright hover:opacity-75 transition-opacity duration-200"
            >
              moizz<span className="text-muted">.</span>dev
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Full-stack AI engineer building RAG, agents,
              and LLM products that ship.
            </p>
          </div>

          {/* Right — nav columns */}
          <div className="flex gap-12 sm:gap-16">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/60">
                Pages
              </p>
              <ul className="flex flex-col gap-2.5">
                {nav.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted hover:text-text transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/60">
                Find me
              </p>
              <ul className="flex flex-col gap-2.5">
                {social.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted hover:text-text transition-colors duration-200"
                    >
                      {label}
                      <ArrowUpRight size={11} className="opacity-50" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[--color-border] mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[--color-muted]">
          <p className="text-xs text-muted/50">
            © {new Date().getFullYear()} Abdul Moizz. All rights reserved.
          </p>
          <p className="text-xs text-muted/30">
            Built with Next.js, GSAP &amp; lots of caffeine.
          </p>
        </div>
      </div>
    </footer>
  );
}
