import Link from "next/link";

const navLinks = [
  { href: "/work",    label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about",   label: "About" },
  { href: "/contact", label: "Contact" },
];

const elsewhere = [
  { href: "https://github.com/Moizzzzzzzzzz",                    label: "GitHub ↗" },
  { href: "https://linkedin.com/in/abdul-moizz-b21bb0322",       label: "LinkedIn ↗" },
  { href: "https://www.upwork.com/freelancers/abdulmoizz",        label: "Upwork ↗" },
  { href: "mailto:abdul2005moizzz@gmail.com",                     label: "Email ↗" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand statement */}
          <div className="footer-brand">
            Build the AI system
            <br />
            <em>that doesn&apos;t fall apart.</em>
          </div>

          {/* Meta links */}
          <div className="footer-meta">
            <div className="footer-meta-block">
              <div className="label">Index</div>
              <div className="val">
                {navLinks.map(({ href, label }) => (
                  <Link key={href} href={href}>{label}</Link>
                ))}
              </div>
            </div>
            <div className="footer-meta-block">
              <div className="label">Elsewhere</div>
              <div className="val">
                {elsewhere.map(({ href, label }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer">{label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Abdul Moizz Khan · Islamabad, PK</div>
          <div>v1.0 · Built in Next.js / R3F / GSAP</div>
        </div>
      </div>
    </footer>
  );
}
