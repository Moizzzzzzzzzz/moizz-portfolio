import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CursorFollower } from "@/components/animation/CursorFollower";
import { PageTransition } from "@/components/animation/PageTransition";
import { buildMetadata, siteConfig } from "@/lib/seo";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../../public/fonts/InterVariable.woff2", style: "normal" },
    { path: "../../public/fonts/InterVariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "../../public/fonts/InstrumentSerif-Regular.woff2", style: "normal", weight: "400" },
    { path: "../../public/fonts/InstrumentSerif-Italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../../public/fonts/JetBrainsMonoVariable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: {
    default: "Moizz K — AI Engineer",
    template: "%s — Moizz K",
  },
  keywords: [
    "Full-Stack AI Engineer",
    "RAG developer",
    "LangChain freelancer",
    "production LLM systems",
    "AI agent builder",
    "LangGraph freelancer",
    "FastAPI React AI developer",
    "RAG developer Pakistan",
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/InterVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-bg text-text">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-text-bright focus:ring-2 focus:ring-accent"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Moizz K",
              url: "https://moizzz.dev",
              description: siteConfig.description,
              author: {
                "@type": "Person",
                name: "Abdul Moizz Khan",
                url: "https://moizzz.dev/about",
              },
            }),
          }}
        />
        <Providers>
          <CursorFollower />
          <Navbar />
          <PageTransition>
            <main
              id="main-content"
              className="min-h-screen"
            >
              {children}
            </main>
          </PageTransition>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--color-surface)",
              color: "var(--color-text-bright)",
              border: "1px solid var(--color-border)",
            },
          }}
        />
      </body>
    </html>
  );
}
