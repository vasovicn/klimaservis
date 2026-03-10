"use client";

import BookingButton from "./booking/BookingButton";

const services = [
  {
    name: "Redovan godišnji servis",
    price: "4.000",
    features: [
      "Čišćenje filtera",
      "Dezinfekcija unutrašnje jedinice",
      "Provera nivoa freona",
      "Provera drenažnog sistema",
      "Vizuelna kontrola svih komponenti",
    ],
    featured: true,
  },
  {
    name: "Dubinski servis",
    price: "6.000",
    features: [
      "Kompletno čišćenje unutrašnje jedinice",
      "Čišćenje spoljašnje jedinice",
      "Dijagnostika uzroka problema",
      "Dezinfekcija i antibakterijski tretman",
      "Provera i čišćenje drenažnog sistema",
      "Testiranje rada sistema",
    ],
    featured: false,
  },
  {
    name: "Dopuna freona",
    price: "od 3.500",
    features: [
      "Merenje nivoa freona",
      "Provera curenja sistema",
      "Dopuna odgovarajuće količine freona",
      "Testiranje rada klime nakon dopune",
    ],
    featured: false,
  },
  {
    name: "Popravka kvara",
    price: "od 3.500",
    features: [
      "Dijagnostika kvara",
      "Zamena pokvarenog dela",
      "Popravka elektronike",
      "Testiranje sistema",
      "Garancija na izvršeni rad",
    ],
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section id="cene" aria-label="Cene klima servisa" className="bg-gray-50 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Cene klima servisa
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Transparentne cene bez skrivenih troškova. Servis klima uređaja u
            Beogradu po najpovoljnijim cenama.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.name}
              itemScope
              itemType="https://schema.org/Service"
              className={`relative flex flex-col rounded-2xl p-8 transition-shadow hover:shadow-xl ${
                service.featured
                  ? "scale-105 border-2 border-brand-500 bg-white shadow-xl"
                  : "border border-gray-200 bg-white shadow-md"
              }`}
            >
              <meta itemProp="areaServed" content="Beograd" />
              <meta itemProp="provider" content="Beogradski Klima Servis" />
              {service.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold tracking-wider text-white uppercase">
                  Najpopularniji
                </div>
              )}
              <h3 itemProp="name" className="mb-2 text-xl font-bold text-gray-900">
                {service.name}
              </h3>
              <div
                itemScope
                itemType="https://schema.org/PriceSpecification"
                className="mb-6"
              >
                <span itemProp="price" className="text-4xl font-extrabold text-brand-600">
                  {service.price}
                </span>
                <meta itemProp="priceCurrency" content="RSD" />
                <span className="ml-1 text-gray-500">RSD</span>
              </div>
              <ul className="mb-8 grow space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    itemProp="description"
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <BookingButton variant="card" featured={service.featured} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
