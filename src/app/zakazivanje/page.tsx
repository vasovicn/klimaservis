import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/booking/BookingWizard";
import { SITE_URL, COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online zakazivanje servisa klime | Beogradski Klima Servis",
  description:
    "Zakažite servis klime online – brzo i jednostavno. Odaberite uslugu, datum i termin koji vam odgovara. Beogradski Klima Servis dolazi na vašu adresu.",
  keywords: [
    "online zakazivanje servisa klime",
    "zakazivanje klima servis beograd",
    "zakazi servis klime online",
    "termin za servis klime",
    "online booking klima servis",
    "zakazivanje servisa klime beograd",
  ],
  alternates: {
    canonical: "/zakazivanje",
  },
  openGraph: {
    title: "Online zakazivanje servisa klime | Beogradski Klima Servis",
    description:
      "Zakažite servis klime online – odaberite uslugu, datum i termin. Dolazimo na vašu adresu u Beogradu.",
    url: `${SITE_URL}/zakazivanje`,
    siteName: COMPANY_NAME,
    locale: "sr_RS",
    type: "website",
  },
};

const reservationSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/zakazivanje#webpage`,
  name: "Online zakazivanje servisa klime",
  description:
    "Zakažite servis klime online. Odaberite uslugu, datum i termin koji vam odgovara.",
  url: `${SITE_URL}/zakazivanje`,
  isPartOf: { "@id": `${SITE_URL}/#business` },
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
};

export default function ZakazivanjeServisaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reservationSchema) }}
        />

        <div className="mx-auto max-w-2xl px-4 py-10">
          <div className="mb-8 mt-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Online zakazivanje servisa
            </h1>
            <p className="mt-2 text-gray-600">
              Odaberite uslugu, datum i termin – dolazimo na vašu adresu.
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow-lg">
            <BookingWizard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
