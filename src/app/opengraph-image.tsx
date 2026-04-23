import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Moizz — AI Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ color: "#555", fontSize: 18, marginBottom: 16, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          AI Engineer & Full-Stack Developer
        </p>
        <h1 style={{ color: "#ededed", fontSize: 64, fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
          Building AI systems that actually ship.
        </h1>
        <p style={{ color: "#555", fontSize: 24, marginTop: 24 }}>moizz.dev</p>
      </div>
    ),
    size
  );
}
