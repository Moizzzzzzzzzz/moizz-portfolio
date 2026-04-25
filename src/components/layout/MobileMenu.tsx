"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

const sheetVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.25, ease: [0.65, 0, 0.35, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.65, 0, 0.35, 1] as const },
  },
};

const listVariants = {
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  closed: {},
};

const itemVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] as const },
  },
};

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Stop/start Lenis smooth scroll while sheet is open
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Hamburger / close button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="relative z-[60] flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:text-text hover:bg-surface transition-colors duration-200"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={reduced ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <X size={18} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={reduced ? false : { rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <Menu size={18} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Full-screen sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="sheet"
            variants={reduced ? undefined : sheetVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col bg-bg/98 backdrop-blur-2xl"
          >
            <div className="flex flex-1 flex-col px-6 pt-24 pb-12">
              {/* Nav links */}
              <motion.ul
                variants={reduced ? undefined : listVariants}
                initial="closed"
                animate="open"
                className="flex flex-col gap-1"
              >
                {links.map(({ href, label }) => (
                  <motion.li
                    key={href}
                    variants={reduced ? undefined : itemVariants}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-3 text-4xl font-semibold tracking-tight transition-colors duration-200",
                        pathname.startsWith(href)
                          ? "text-text-bright"
                          : "text-muted hover:text-text"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA at bottom */}
              <motion.div
                variants={
                  reduced
                    ? undefined
                    : {
                        closed: { opacity: 0, y: 16 },
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: 0.1 + links.length * 0.06,
                            duration: 0.4,
                            ease: [0.65, 0, 0.35, 1] as const,
                          },
                        },
                      }
                }
                initial="closed"
                animate="open"
                className="mt-auto"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "h-12 px-7 rounded-xl text-base font-medium",
                    "bg-accent text-white hover:bg-accent/85 active:bg-accent/70",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  )}
                >
                  Let&apos;s talk →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
