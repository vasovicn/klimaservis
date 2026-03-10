import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beogradski Klima Servis",
    short_name: "Klima Servis",
    description:
      "Profesionalni servis klima uređaja u Beogradu. Popravka, čišćenje i održavanje.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a3a9a",
    lang: "sr",
    categories: ["utilities", "business"],
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
