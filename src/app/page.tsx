import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { StackShowcase } from "@/components/sections/StackShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/seo";

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <div className="content-wrapper px-8 md:px-16 lg:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      <Pillars />
      <FeaturedWork />
      <StackShowcase />
      <CTASection />
    </div>
  );
}
