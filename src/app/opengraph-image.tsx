import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Beogradski Klima Servis – Servis klima uređaja u Beogradu";
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
        {/* Decorative circle top-right */}
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
        {/* Decorative circle bottom-left */}
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

        {/* Snowflake icon */}
        <div
          style={{
            fontSize: 72,
            marginBottom: 24,
            opacity: 0.9,
          }}
        >
          ❄️
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            letterSpacing: "-2px",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 20,
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          Beogradski Klima Servis
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: "rgba(180,210,255,1)",
            textAlign: "center",
            marginBottom: 40,
            letterSpacing: "0.5px",
          }}
        >
          Profesionalni servis klima uređaja u Beogradu
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

        {/* Pills row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 44,
          }}
        >
          {["Čišćenje klime", "Dezinfekcija", "Dopuna freona", "Popravka kvarova"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 50,
                padding: "10px 22px",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

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
