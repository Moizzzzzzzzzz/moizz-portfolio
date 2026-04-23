import { notFound } from "next/navigation";
import { getAllProjects, getProject } from "@/lib/mdx";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { StackList } from "@/components/case-study/StackList";
import { MetricCard } from "@/components/case-study/MetricCard";
import { CTASection } from "@/components/sections/CTASection";
import { constructMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { frontmatter } = getProject(slug);
    return constructMetadata({ title: `${frontmatter.title} — Moizz`, description: frontmatter.description });
  } catch {
    return {};
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = getProject(slug);
  } catch {
    notFound();
  }
  const { frontmatter } = data;

  return (
    <>
      <CaseStudyHero frontmatter={frontmatter} />

      <CaseStudySection title="Problem">
        <p className="text-foreground/70 leading-relaxed">{frontmatter.problem}</p>
      </CaseStudySection>

      <CaseStudySection title="Approach">
        <p className="text-foreground/70 leading-relaxed">{frontmatter.approach}</p>
      </CaseStudySection>

      <CaseStudySection title="Stack">
        <StackList stack={frontmatter.stack} />
      </CaseStudySection>

      {frontmatter.metrics.length > 0 && (
        <CaseStudySection title="Results">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {frontmatter.metrics.map((m, i) => (
              <MetricCard key={m.label} label={m.label} value={m.value} index={i} />
            ))}
          </div>
        </CaseStudySection>
      )}

      <CTASection title="Like what you see?" primaryLabel="Work with me" />
    </>
  );
}
