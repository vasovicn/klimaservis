import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Servis klime Beograd – Beogradski Klima Servis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f2166 0%, #1a3a9a 50%, #1e50c8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />

        {/* Breadcrumb */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(180,210,255,0.8)",
            marginBottom: 16,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          beogradskiklimaservis.rs
        </div>

        {/* Icon */}
        <div style={{ fontSize: 64, marginBottom: 20, opacity: 0.9 }}>🔧</div>

        {/* Main H1 */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: "-2px",
            textAlign: "center",
            lineHeight: 1.05,
            marginBottom: 20,
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          Servis klime Beograd
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "rgba(180,210,255,1)",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Čišćenje · Dezinfekcija · Dopuna freona · Popravka
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "rgba(255,255,255,0.4)",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Phone CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "white",
            color: "#1a3a9a",
            borderRadius: 60,
            padding: "16px 40px",
            fontSize: 32,
            fontWeight: 900,
          }}
        >
          📞 062 103 8009
        </div>
      </div>
    ),
    { ...size }
  );
}
