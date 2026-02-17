import { PHONE_HREF, PHONE_DISPLAY } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id="pocetna"
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-4 text-center text-white"
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Profesionalni klima servis
          <span className="block text-brand-200">u Beogradu</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-brand-100 sm:text-xl">
          Servis, popravka i čišćenje klima uređaja. Brzo, pouzdano i po
          najpovoljnijim cenama. Vaš klima majstor u Beogradu.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-700 shadow-xl transition-all hover:bg-brand-50 hover:shadow-2xl"
          >
            <svg
              className="h-5 w-5"
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
            Zakažite servis: {PHONE_DISPLAY}
          </a>
          <a
            href="#cene"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            Pogledajte cene
          </a>
        </div>
      </div>
    </section>
  );
}
