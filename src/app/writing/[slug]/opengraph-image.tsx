import { ImageResponse } from "@vercel/og";
import { getAllPosts, getPost } from "@/lib/mdx";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "Article";
  let description = "";
  try {
    const { frontmatter } = getPost(slug);
    title = frontmatter.title;
    description = frontmatter.description ?? "";
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
          Article · moizzz.dev
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#FAFAFA",
            lineHeight: 1.15,
            marginBottom: 24,
            fontFamily: "sans-serif",
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              fontSize: 26,
              color: "#6B6B72",
              fontFamily: "sans-serif",
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
    ),
    size
  );
}
