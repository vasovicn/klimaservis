import { COMPANY_NAME, PHONE_HREF, PHONE_DISPLAY } from "@/lib/constants";

const footerLinks = [
  { label: "Početna", href: "#pocetna" },
  { label: "Cene", href: "#cene" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-bold text-gray-900">{COMPANY_NAME}</p>
          <p className="mt-1 text-sm text-gray-500">
            Profesionalni servis klima uređaja u Beogradu
          </p>
        </div>
        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PHONE_HREF}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} {COMPANY_NAME}. Sva prava zadržana.
      </div>
    </footer>
  );
}
