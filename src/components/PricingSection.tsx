import { PHONE_HREF } from "@/lib/constants";

const services = [
  {
    name: "Mali servis",
    price: "4.000",
    features: [
      "Čišćenje filtera",
      "Provera nivoa freona",
      "Dezinfekcija unutrašnje jedinice",
      "Vizuelna kontrola sistema",
    ],
    featured: false,
  },
  {
    name: "Veliki servis",
    price: "7.000",
    features: [
      "Kompletno čišćenje unutrašnje jedinice",
      "Čišćenje spoljašnje jedinice",
      "Dopuna freona",
      "Dezinfekcija i antibakterijski tretman",
      "Provera svih komponenti",
    ],
    featured: true,
  },
  {
    name: "Zamena kondenzatora",
    price: "5.000",
    features: [
      "Dijagnostika kvara",
      "Zamena kondenzatora",
      "Testiranje sistema",
      "Garancija na rad",
    ],
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section id="cene" className="bg-gray-50 px-4 py-20 sm:py-28">
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

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className={`relative rounded-2xl p-8 transition-shadow hover:shadow-xl ${
                service.featured
                  ? "scale-105 border-2 border-brand-500 bg-white shadow-xl"
                  : "border border-gray-200 bg-white shadow-md"
              }`}
            >
              {service.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold tracking-wider text-white uppercase">
                  Najpopularniji
                </div>
              )}
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {service.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-brand-600">
                  {service.price}
                </span>
                <span className="ml-1 text-gray-500">RSD</span>
              </div>
              <ul className="mb-8 space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <svg
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
              <a
                href={PHONE_HREF}
                className={`block w-full rounded-full py-3 text-center font-semibold transition-colors ${
                  service.featured
                    ? "bg-brand-500 text-white hover:bg-brand-600"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                Zakažite servis
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
