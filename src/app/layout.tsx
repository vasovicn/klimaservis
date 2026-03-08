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
    "Profesionalni klima servis u Beogradu. Redovan servis 4.000 RSD, dubinski servis 6.000 RSD. Popravka, čišćenje i održavanje klima uređaja na teritoriji celog Beograda. Pozovite: 062 103 8009.",
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beogradski Klima Servis – Profesionalni servis klima uređaja u Beogradu",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klima Servis Beograd | Servis i popravka klima uređaja",
    description:
      "Profesionalni klima servis u Beogradu. Popravka, čišćenje i održavanje klima uređaja. Pozovite 062 103 8009.",
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
  image: `${SITE_URL}/og-image.jpg`,
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
        areaServed: "Beograd",
        itemOffered: {
          "@type": "Service",
          name: "Redovan godišnji servis klime",
          serviceType: "HVAC Maintenance",
        },
      },
      {
        "@type": "Offer",
        name: "Dubinski servis klime",
        description:
          "Kompletno čišćenje unutrašnje i spoljašnje jedinice, dijagnostika uzroka problema, dezinfekcija i antibakterijski tretman.",
        price: "6000",
        priceCurrency: "RSD",
        areaServed: "Beograd",
        itemOffered: {
          "@type": "Service",
          name: "Dubinski servis klime",
          serviceType: "HVAC Deep Cleaning",
        },
      },
      {
        "@type": "Offer",
        name: "Dopuna freona",
        description:
          "Merenje nivoa freona, provera curenja sistema i dopuna odgovarajuće količine freona.",
        lowPrice: "3500",
        highPrice: "6000",
        priceCurrency: "RSD",
        areaServed: "Beograd",
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
        areaServed: "Beograd",
        itemOffered: {
          "@type": "Service",
          name: "Popravka kvara klima uređaja",
          serviceType: "HVAC Repair",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Koliko košta servis klima uređaja u Beogradu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Redovan godišnji servis klime košta 4.000 RSD, a dubinski servis 6.000 RSD. Dopuna freona kreće se od 3.500 do 6.000 RSD u zavisnosti od količine freona. Popravka kvara kreće se od 3.500 do 12.000 RSD.",
      },
    },
    {
      "@type": "Question",
      name: "Koliko traje servis klima uređaja?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Redovan godišnji servis traje oko 30 minuta, dok dubinski servis, dopuna freona i popravka kvara traju oko 45 minuta, u zavisnosti od tipa i stanja uređaja.",
      },
    },
    {
      "@type": "Question",
      name: "Kada treba uraditi servis klime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Preporučuje se jednom godišnje, idealno pre letnje sezone. Servis je hitno potreban ako klima slabo hladi, curi voda, ima neprijatne mirise, neobične zvukove ili preveliku potrošnju struje.",
      },
    },
    {
      "@type": "Question",
      name: "Da li dolazite na adresu u celom Beogradu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Da, vršimo servis klima uređaja na teritoriji celog Beograda – Novi Beograd, Zemun, Vračar, Palilula, Zvezdara, Čukarica, Voždovac, Rakovica i svi ostali delovi grada. Pozovite nas na ${PHONE_DISPLAY}.`,
      },
    },
    {
      "@type": "Question",
      name: "Šta uključuje redovan godišnji servis klime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Redovan godišnji servis uključuje čišćenje filtera, dezinfekciju unutrašnje jedinice, proveru nivoa freona, proveru drenažnog sistema i vizuelnu kontrolu svih komponenti.",
      },
    },
    {
      "@type": "Question",
      name: "Da li dajete garanciju na servis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Da, dajemo garanciju na sav izvršeni rad. Koristimo originalne i kvalitetne rezervne delove.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
