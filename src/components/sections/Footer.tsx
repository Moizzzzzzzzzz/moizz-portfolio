import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-8">

        {/* Top row — 2-col at md: brand left, nav right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-10">

          {/* Brand */}
          <div>
            <p className="text-white font-semibold text-sm mb-3">moizz.dev</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Full-stack AI engineer building RAG, agents, and LLM products that ship.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-5">Pages</p>
              <ul className="space-y-3">
                {["Work", "Writing", "About", "Contact"].map((page) => (
                  <li key={page}>
                    <Link
                      href={`/${page.toLowerCase()}`}
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {page}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-5">Find me</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/Moizzzzzzzzzz"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/abdul-moizz-b21bb0322"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.upwork.com/freelancers/abdulmoizz"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    Upwork ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex justify-between text-xs text-white/30">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Abdul Moizz. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Built with Next.js, GSAP &amp; lots of caffeine.
          </p>
        </div>

      </div>
    </footer>
  );
}
