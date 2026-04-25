import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          Full-Stack AI Engineer
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#FAFAFA",
            lineHeight: 1.1,
            marginBottom: 32,
            fontFamily: "sans-serif",
          }}
        >
          Moizz K
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6B6B72",
            fontFamily: "sans-serif",
          }}
        >
          RAG systems · AI agents · LLM products
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 20,
            color: "#1F1F22",
            fontFamily: "sans-serif",
          }}
        >
          moizzz.dev
        </div>
      </div>
    ),
    size
  );
}
