import { ImageResponse } from "@vercel/og";
import { getAllProjects, getProject } from "@/lib/mdx";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "Case Study";
  let tagline = "";
  try {
    const { frontmatter } = getProject(slug);
    title = frontmatter.title;
    tagline = frontmatter.tagline ?? frontmatter.description ?? "";
  } catch {
    // fall through to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#7C3AED",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
            fontFamily: "sans-serif",
          }}
        >
          Case Study · moizzz.dev
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#FAFAFA",
            lineHeight: 1.1,
            marginBottom: 24,
            fontFamily: "sans-serif",
          }}
        >
          {title}
        </div>
        {tagline ? (
          <div
            style={{
              fontSize: 28,
              color: "#6B6B72",
              fontFamily: "sans-serif",
            }}
          >
            {tagline}
          </div>
        ) : null}
      </div>
    ),
    size
  );
}
