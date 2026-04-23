import Link from "next/link";

const links = [
  { href: "https://github.com/moizzz", label: "GitHub" },
  { href: "https://twitter.com/moizzz", label: "Twitter" },
  { href: "https://linkedin.com/in/moizzz", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        <p className="text-sm text-foreground/30">
          © {new Date().getFullYear()} Moizz. All rights reserved.
        </p>
        <ul className="flex gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/40 hover:text-foreground transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
