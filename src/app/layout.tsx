import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COMPANY_NAME, PHONE_NUMBER, SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Klima Servis Beograd | Servis klima uređaja - Ice Beograd",
    template: "%s | Klima Servis Ice Beograd",
  },
  description:
    "Profesionalni klima servis u Beogradu. Mali servis 4.000 RSD, veliki servis 7.000 RSD. Popravka, čišćenje i održavanje klima uređaja. Pozovite: 064 078 5469.",
  keywords: [
    "klima servis",
    "klima servis beograd",
    "servis klima uređaja",
    "popravka klime",
    "čišćenje klime",
    "klima majstor beograd",
    "održavanje klima uređaja",
    "zamena kondenzatora",
    "klima beograd",
    "mali servis klime",
    "veliki servis klime",
    "klima popravka beograd",
    "servis klime cena",
    "klima majstor",
    "popravka klima uređaja",
  ],
  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Klima Servis Beograd | Profesionalni servis klima uređaja",
    description:
      "Profesionalni klima servis u Beogradu. Mali servis od 4.000 RSD. Brzo, pouzdano, sa garancijom. Pozovite 064 078 5469.",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    locale: "sr_RS",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Klima Servis Ice Beograd - Profesionalni servis klima uređaja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klima Servis Beograd | Servis klima uređaja",
    description:
      "Profesionalni klima servis u Beogradu. Popravka, čišćenje i održavanje klima uređaja. Pozovite 064 078 5469.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY_NAME,
  description:
    "Profesionalni servis klima uređaja u Beogradu - popravka, čišćenje, održavanje i zamena kondenzatora.",
  url: SITE_URL,
  telephone: PHONE_NUMBER,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beograd",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "44.7866",
    longitude: "20.4489",
  },
  areaServed: {
    "@type": "City",
    name: "Beograd",
  },
  priceRange: "4000-7000 RSD",
  openingHours: "Mo-Sa 08:00-20:00",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Klima servis usluge",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mali servis klime",
          description:
            "Čišćenje filtera, provera freona, dezinfekcija unutrašnje jedinice",
        },
        price: "4000",
        priceCurrency: "RSD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Veliki servis klime",
          description:
            "Kompletno čišćenje unutrašnje i spoljašnje jedinice, dopuna freona, dezinfekcija",
        },
        price: "7000",
        priceCurrency: "RSD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Zamena kondenzatora",
          description:
            "Dijagnostika i zamena kondenzatora klima uređaja",
        },
        price: "5000",
        priceCurrency: "RSD",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
