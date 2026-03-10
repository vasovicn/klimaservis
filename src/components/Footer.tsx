import { COMPANY_NAME, PHONE_HREF, PHONE_DISPLAY } from "@/lib/constants";

const footerLinks = [
  { label: "Početna", href: "/#pocetna" },
  { label: "Servis klime Beograd", href: "/servis" },
  { label: "Cene", href: "/#cene" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Footer() {
  return (
    <footer aria-label="Footer" className="border-t border-gray-200 bg-white px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-4">
        {/* Branding */}
        <div>
          <p className="font-bold text-gray-900">{COMPANY_NAME}</p>
          <p className="mt-1 text-sm text-gray-500">
            Profesionalni servis klima uređaja u Beogradu
          </p>
        </div>

        {/* Navigacija */}
        <nav aria-label="Footer navigacija">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Navigacija
          </p>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-gray-500 transition-colors hover:text-brand-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Radno vreme */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Radno vreme
          </p>
          <ul className="space-y-2">
            <li className="text-sm text-gray-500">Ponedeljak – Subota</li>
            <li className="text-sm text-gray-500">08:00 – 22:00</li>
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Kontakt
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href={PHONE_HREF}
                className="text-sm text-gray-500 transition-colors hover:text-brand-600"
              >
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href="mailto:kontakt@beogradskiklimaservis.rs"
                className="text-sm text-gray-500 transition-colors hover:text-brand-600"
              >
                kontakt@beogradskiklimaservis.rs
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} {COMPANY_NAME}. Sva prava zadržana.
      </div>
    </footer>
  );
}
