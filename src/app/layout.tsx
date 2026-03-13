import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COMPANY_NAME, PHONE_NUMBER, PHONE_DISPLAY, SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Klima Servis Beograd | Servis i popravka klima uređaja – Beogradski Klima Servis",
    template: "%s | Beogradski Klima Servis",
  },
  description:
    "Profesionalni klima servis u Beogradu. Online zakazivanje dostupno. Redovan servis 4.000 RSD, dubinski servis 6.000 RSD. Popravka, čišćenje i održavanje klima uređaja na teritoriji celog Beograda. Pozovite: 062 103 8009.",
  keywords: [
    "klima servis beograd",
    "servis klima uređaja beograd",
    "klima servis",
    "popravka klime beograd",
    "čišćenje klime beograd",
    "klima majstor beograd",
    "održavanje klima uređaja",
    "servis klime cena",
    "dopuna freona beograd",
    "dubinski servis klime",
    "redovan servis klime",
    "popravka klima uređaja beograd",
    "klima servis novi beograd",
    "klima servis zemun",
    "klima servis vracar",
    "klima servis palilula",
    "klima servis zvezdara",
    "klima servis cukarica",
    "klima servis vozdovac",
    "klima servis rakovica",
    "servis inverter klime",
    "klima ne hladi servis",
    "klima curi voda servis",
    "klima servis na licu mesta",
    "majstor za klime beograd",
    "servis klima uređaja cena",
    "hitna popravka klime beograd",
    "klima servis beograd 062",
    "beogradski klima servis",
    "online zakazivanje servisa klime",
    "zakazi servis klime online",
    "zakazivanje klima servis beograd",
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  category: "HVAC Service",
  applicationName: COMPANY_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Klima Servis Beograd | Servis i popravka klima uređaja",
    description:
      "Profesionalni klima servis u Beogradu. Redovan servis od 4.000 RSD. Brzo, pouzdano, sa garancijom na sav rad. Pozovite 062 103 8009.",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klima Servis Beograd | Servis i popravka klima uređaja",
    description:
      "Profesionalni klima servis u Beogradu. Popravka, čišćenje i održavanje klima uređaja. Pozovite 062 103 8009.",
  },
  other: {
    "theme-color": "#1a3a9a",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  verification: {
    google: "",   // dodati Google Search Console verifikacioni kod
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: COMPANY_NAME,
  alternateName: "Klima Servis Beograd",
  description:
    "Profesionalni servis klima uređaja u Beogradu – popravka, čišćenje, održavanje, dopuna freona. Dolazak na adresu na teritoriji celog Beograda.",
  url: SITE_URL,
  telephone: PHONE_NUMBER,
  email: "kontakt@beogradskiklimaservis.rs",
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beograd",
    addressRegion: "Beograd",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "44.8176",
    longitude: "20.4569",
  },
  hasMap: `https://www.google.com/maps/search/${encodeURIComponent("Beogradski Klima Servis Beograd")}`,
  areaServed: [
    { "@type": "City", name: "Beograd" },
    { "@type": "AdministrativeArea", name: "Novi Beograd" },
    { "@type": "AdministrativeArea", name: "Zemun" },
    { "@type": "AdministrativeArea", name: "Stari Grad" },
    { "@type": "AdministrativeArea", name: "Vračar" },
    { "@type": "AdministrativeArea", name: "Palilula" },
    { "@type": "AdministrativeArea", name: "Zvezdara" },
    { "@type": "AdministrativeArea", name: "Čukarica" },
    { "@type": "AdministrativeArea", name: "Rakovica" },
    { "@type": "AdministrativeArea", name: "Voždovac" },
    { "@type": "AdministrativeArea", name: "Savski Venac" },
    { "@type": "AdministrativeArea", name: "Bežanija" },
  ],
  priceRange: "3.500 – 12.000 RSD",
  currenciesAccepted: "RSD",
  paymentAccepted: "Cash, Card",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "22:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_NUMBER,
    contactType: "customer service",
    availableLanguage: "Serbian",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "22:00",
    },
  },
  potentialAction: {
    "@type": "ReserveAction",
    name: "Zakažite servis klime online",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/zakazivanje`,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Termin za servis klima uređaja",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usluge servisa klima uređaja",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Redovan godišnji servis klime",
        description:
          "Čišćenje filtera, dezinfekcija unutrašnje jedinice, provera nivoa freona, provera drenažnog sistema i vizuelna kontrola svih komponenti.",
        price: "4000",
        priceCurrency: "RSD",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: "Beograd" },
        itemOffered: {
          "@type": "Service",
          name: "Redovan godišnji servis klime",
          serviceType: "Air Conditioning Maintenance",
        },
      },
      {
        "@type": "Offer",
        name: "Dubinski servis klime",
        description:
          "Kompletno čišćenje unutrašnje i spoljašnje jedinice, dijagnostika uzroka problema, dezinfekcija i antibakterijski tretman.",
        price: "6000",
        priceCurrency: "RSD",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: "Beograd" },
        itemOffered: {
          "@type": "Service",
          name: "Dubinski servis klime",
          serviceType: "Air Conditioning Deep Cleaning",
        },
      },
      {
        "@type": "Offer",
        name: "Dopuna freona klime",
        description:
          "Merenje nivoa freona, provera curenja sistema i dopuna odgovarajuće količine freona.",
        lowPrice: "3500",
        highPrice: "6000",
        priceCurrency: "RSD",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: "Beograd" },
        itemOffered: {
          "@type": "Service",
          name: "Dopuna freona klima uređaja",
          serviceType: "Refrigerant Recharge",
        },
      },
      {
        "@type": "Offer",
        name: "Popravka kvara klime",
        description:
          "Dijagnostika i otklanjanje kvarova – popravka elektronike, zamena pokvarenih delova, garancija na izvršeni rad.",
        lowPrice: "3500",
        highPrice: "12000",
        priceCurrency: "RSD",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: "Beograd" },
        itemOffered: {
          "@type": "Service",
          name: "Popravka kvara klima uređaja",
          serviceType: "Air Conditioning Repair",
        },
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
    <html lang="sr" dir="ltr">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z2VMKLWYTM" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-Z2VMKLWYTM');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js');})}`,
          }}
        />
      </body>
    </html>
  );
}
