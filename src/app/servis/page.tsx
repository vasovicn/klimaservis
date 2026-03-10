export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/booking/BookingContext";
import BookingModal from "@/components/booking/BookingModal";
import { PHONE_HREF, PHONE_DISPLAY, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Servis klime Beograd | Čišćenje i održavanje klima uređaja",
  description:
    "Profesionalan servis klime u Beogradu. Čišćenje klime, dezinfekcija, dopuna freona i provera instalacija za sve tipove split klima uređaja. Pozovite: 062 103 8009.",
  keywords: [
    "servis klime Beograd",
    "servis klima uređaja Beograd",
    "čišćenje klime Beograd",
    "dopuna freona klime Beograd",
    "servis klime",
    "čišćenje klima uređaja Beograd",
    "dezinfekcija klime Beograd",
    "održavanje klima uređaja Beograd",
    "servis split klime Beograd",
    "dopuna freona Beograd",
    "servis klime cena Beograd",
    "klima servis Beograd",
  ],
  alternates: {
    canonical: "/servis",
  },
  openGraph: {
    title: "Servis klime Beograd | Čišćenje i održavanje klima uređaja",
    description:
      "Profesionalan servis klime u Beogradu. Čišćenje, dezinfekcija, dopuna freona. Brz dolazak na adresu. Pozovite 062 103 8009.",
    url: `${SITE_URL}/servis`,
    siteName: "Beogradski Klima Servis",
    type: "website",
    locale: "sr_RS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servis klime Beograd | Čišćenje i održavanje klima uređaja",
    description:
      "Profesionalan servis klima uređaja u Beogradu. Čišćenje, dezinfekcija i dopuna freona. Pozovite 062 103 8009.",
  },
};

const faqItems = [
  {
    question: "Koliko košta servis klime u Beogradu?",
    answer:
      "Redovan godišnji servis klime košta 4.000 RSD. Dubinski servis klima uređaja u Beogradu košta 6.000 RSD. Dopuna freona u klimi kreće se od 3.500 do 6.000 RSD, u zavisnosti od količine i tipa freona.",
  },
  {
    question: "Koliko često treba raditi servis klime?",
    answer:
      "Preporučuje se servis klime najmanje jednom godišnje, idealno pre sezone hlađenja (april – maj). Ako se klima koristi i za grejanje, servis je preporučljiv i pred zimu (septembar – oktobar). U poslovnim prostorima u Beogradu gde klima radi svakodnevno, servis je poželjno raditi više puta godišnje.",
  },
  {
    question: "Šta uključuje servis klima uređaja u Beogradu?",
    answer:
      "Naš servis klima uređaja u Beogradu obuhvata: temeljno pranje i čišćenje spoljne i unutrašnje jedinice, bakteriološku dezinfekciju, proveru količine freona i dopunu freona po potrebi, te pregled i kontrolu instalacija.",
  },
  {
    question: "Da li vršite čišćenje klime na adresi u celom Beogradu?",
    answer: `Da, vršimo čišćenje klime i servis klima uređaja na teritoriji celog Beograda – Novi Beograd, Zemun, Vračar, Palilula, Zvezdara, Čukarica, Voždovac, Rakovica i svi ostali delovi grada. Pozovite nas na ${PHONE_DISPLAY}.`,
  },
  {
    question: "Kada je potrebna dopuna freona u klimi?",
    answer:
      "Dopuna freona u klimi je potrebna kada uređaj slabo hladi ili greje, kada se pojavi led na unutrašnjoj ili spoljašnjoj jedinici, ili kada sistem radi ali temperatura prostora ne opada. Tokom svakog servisa proveravamo pritisak i količinu freona i radimo dopunu po potrebi.",
  },
  {
    question: "Zašto klima ima neprijatan miris?",
    answer:
      "Neprijatan miris iz klime najčešće je znak razvoja bakterija, plesni ili gljivica na filteru i izmenjivačima toplote. Bakteriološka dezinfekcija klima uređaja, koja je deo našeg servisa, eliminiše uzročnike neprijatnih mirisa i poboljšava kvalitet vazduha.",
  },
  {
    question: "Da li dajete garanciju na servis klime?",
    answer:
      "Da, dajemo garanciju na sav izvršeni rad. Koristimo originalne i kvalitetne rezervne delove. Naš tim iskusnih majstora odgovara za kvalitet svakog servisa klime u Beogradu.",
  },
];

const serviceFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Početna",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Servis klime Beograd",
      item: `${SITE_URL}/servis`,
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Servis klima uređaja Beograd",
  description:
    "Profesionalan servis klime u Beogradu – čišćenje klime, bakteriološka dezinfekcija, dopuna freona i kontrola instalacija za sve tipove split klima uređaja.",
  provider: {
    "@type": "LocalBusiness",
    name: "Beogradski Klima Servis",
    telephone: "+381621038009",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beograd",
      addressCountry: "RS",
    },
  },
  areaServed: { "@type": "City", name: "Beograd" },
  url: `${SITE_URL}/servis`,
};

export default function ServisPage() {
  return (
    <BookingProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main>
        {/* BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="bg-gray-100 px-4 py-3 pt-24">
          <ol className="mx-auto flex max-w-4xl flex-wrap items-center gap-1 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-brand-600 transition-colors">Početna</a>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li className="font-medium text-gray-800" aria-current="page">Servis klime Beograd</li>
          </ol>
        </nav>

        {/* HERO */}
        <section
          aria-label="Servis klime Beograd"
          className="relative bg-gradient-to-br from-brand-800 to-brand-950 px-4 pb-20 pt-16 text-white"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Servis klime Beograd
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-brand-100 sm:text-2xl">
              Profesionalan servis klima uređaja u Beogradu – čišćenje,
              dezinfekcija, dopuna freona i kontrola instalacija.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xl font-extrabold text-brand-700 shadow-xl transition-all hover:scale-105 hover:bg-brand-50"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE_DISPLAY}
              </a>
              <a
                href="/#cene"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                Pogledajte cene
              </a>
            </div>
          </div>
        </section>

        {/* UVOD */}
        <section className="bg-white px-4 py-16 sm:py-20" aria-label="O servisu klima uređaja">
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 text-lg leading-relaxed text-gray-700 sm:text-xl">
              Nudimo profesionalan <strong>servis klime u Beogradu</strong> za sve tipove split klima uređaja. Naš tim vrši kompletno{" "}
              <strong>čišćenje klime</strong>, dezinfekciju, proveru instalacija i{" "}
              <strong>dopunu freona</strong>, kako bi Vaš klima uređaj radio efikasno i bezbedno tokom cele godine.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
              Servis klime je važan za pravilan rad, duži vek trajanja i kvalitet vazduha u prostoru. Redovno
              održavanje sprečava kvarove, neprijatne mirise i smanjenje efikasnosti hlađenja ili grejanja.
            </p>
          </div>
        </section>

        {/* ŠTA OBUHVATA SERVIS */}
        <section className="bg-gray-50 px-4 py-16 sm:py-20" aria-label="Šta obuhvata servis klima uređaja">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Šta obuhvata servis klima uređaja u Beogradu
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              Naš <strong>servis klima uređaja u Beogradu</strong> obuhvata sve što je potrebno za siguran i efikasan rad Vašeg uređaja:
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Pranje i čišćenje jedinica",
                  desc: "Temeljno pranje i čišćenje spoljne i unutrašnje jedinice – uklanjamo prljavštinu, prašinu i naslage koje smanjuju efikasnost klime.",
                },
                {
                  title: "Bakteriološka dezinfekcija",
                  desc: "Tretman koji uništava bakterije, gljivice i mikroorganizme koji uzrokuju neprijatne mirise i loš kvalitet vazduha.",
                },
                {
                  title: "Provera i dopuna freona",
                  desc: "Merenje pritiska u sistemu i provera količine freona. Dopuna freona u klimi radi se po potrebi, uz korišćenje originalnih rashladnih sredstava.",
                },
                {
                  title: "Pregled instalacija",
                  desc: "Kontrola svih instalacija, drenažnog sistema i vizuelna provera svih komponenti klima uređaja.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100">
                    <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KADA RADITI SERVIS */}
        <section className="bg-white px-4 py-16 sm:py-20" aria-label="Kada raditi servis klime">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Kada je potrebno raditi servis klime
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Preporučuje se da se <strong>servis klime</strong> radi najmanje jednom godišnje, najčešće pre
                početka sezone hlađenja (april – maj).
              </p>
              <p>
                Ukoliko se klima uređaj koristi i za grejanje, preporučljivo je uraditi{" "}
                <strong>servis klima uređaja u Beogradu</strong> i pred zimsku sezonu (septembar – oktobar).
              </p>
              <p>
                U poslovnim prostorima, prodavnicama, kancelarijama i čekaonicama, gde klima uređaji rade gotovo
                svakodnevno, <strong>servis klima uređaja</strong> je poželjno raditi i više puta tokom godine.
              </p>
            </div>
          </div>
        </section>

        {/* ZAŠTO JE VAŽAN SERVIS */}
        <section className="bg-brand-900 px-4 py-16 text-white sm:py-20" aria-label="Zašto je važan servis klime">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
              Zašto je redovan servis klime važan
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Zdraviji vazduh", desc: "Sprečava se razvoj bakterija i mikroorganizama koji narušavaju kvalitet vazduha u prostoru." },
                { title: "Tiši i efikasniji rad", desc: "Klima uređaj radi tiše i postiže bolje rezultate hlađenja i grejanja." },
                { title: "Manja potrošnja struje", desc: "Čist i dobro servisiran uređaj troši manje električne energije." },
                { title: "Duži vek uređaja", desc: "Redovnim servisiranjem produžava se vek trajanja klima uređaja i odlaže skupo servisiranje." },
                { title: "Bez neprijatnih mirisa", desc: "Dezinfekcija uklanja uzročnike neprijatnih mirisa koji nastaju usled nakupljanja bakterija i gljivica." },
                { title: "Ispravna dopuna freona", desc: "Tokom servisa proveravamo pritisak u sistemu i vršimo dopunu freona u klimi po potrebi." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                  <h3 className="mb-2 font-semibold text-brand-100">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DODATNE USLUGE */}
        <section className="bg-gray-50 px-4 py-16 sm:py-20" aria-label="Dodatne usluge klima servisa">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Dodatne usluge
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Pored standardnog servisa klima uređaja u Beogradu, nudimo i:
            </p>
            <ul className="mb-8 space-y-4">
              {[
                "Zamenu izolacije na instalacijama",
                "Kontrolu i proveru instalacija",
                "Otklanjanje kvarova na klima uređajima",
                "Sve ostale zahteve u vezi sa radom klima uređaja",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg text-gray-700">
                  <svg className="h-6 w-6 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-lg leading-relaxed text-gray-700">
              Kombinacijom svih ovih provera i radova dobija se kompletan servis split klima uređaja, koji
              obezbeđuje maksimalnu efikasnost i pouzdan rad.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-4 py-16 sm:py-20" aria-label="Često postavljana pitanja o servisu klime">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Često postavljana pitanja
            </h2>
            <p className="mb-10 text-lg text-gray-500">
              Odgovori na najčešća pitanja o servisu klima uređaja u Beogradu.
            </p>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-gray-200 bg-gray-50 open:bg-white open:shadow-md"
                >
                  <summary className="flex cursor-pointer select-none items-center justify-between px-6 py-5 font-semibold text-gray-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <svg
                      className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-label="Zakazivanje servisa klime Beograd"
          className="bg-gradient-to-br from-brand-700 to-brand-900 px-4 py-20 text-center text-white sm:py-28"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Zakažite servis klime u Beogradu
            </h2>
            <p className="mb-10 text-lg text-brand-100">
              Pozovite nas i zakažite termin. Brz dolazak na adresu, profesionalna usluga i garancija na sav rad.
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-2xl font-extrabold text-brand-700 shadow-2xl transition-all hover:scale-105 hover:bg-brand-50 sm:text-3xl"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <div className="mt-10 text-brand-200">
              <p className="text-sm font-medium uppercase tracking-wider">Radno vreme</p>
              <p className="mt-2 text-lg">Ponedeljak - Subota: 08:00 - 22:00</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal />
    </BookingProvider>
  );
}
