import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CursorFollower } from "@/components/animation/CursorFollower";
import { constructMetadata } from "@/lib/seo";
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

export const metadata: Metadata = constructMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <CursorFollower />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
