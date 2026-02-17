import { PHONE_HREF, PHONE_DISPLAY } from "@/lib/constants";

export default function ContactSection() {
  return (
    <section
      id="kontakt"
      className="bg-gradient-to-br from-brand-700 to-brand-900 px-4 py-20 text-center text-white sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Potreban vam je klima servis?
        </h2>
        <p className="mb-10 text-lg text-brand-100">
          Pozovite nas i zakažite termin. Brz dolazak, profesionalna usluga i
          garancija na sav rad.
        </p>
        <a
          href={PHONE_HREF}
          className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-2xl font-extrabold text-brand-700 shadow-2xl transition-all hover:scale-105 hover:bg-brand-50 sm:text-3xl"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {PHONE_DISPLAY}
        </a>
        <div className="mt-10 text-brand-200">
          <p className="text-sm font-medium uppercase tracking-wider">
            Radno vreme
          </p>
          <p className="mt-2 text-lg">
            Ponedeljak - Subota: 08:00 - 20:00
          </p>
        </div>
      </div>
    </section>
  );
}
