"use client";

import { useState, useEffect } from "react";
import { COMPANY_NAME, PHONE_HREF, PHONE_DISPLAY } from "@/lib/constants";

const navLinks = [
  { label: "Početna", href: "#pocetna" },
  { label: "Usluge", href: "#cene" },
  { label: "Cene", href: "#cene" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#pocetna"
          className={`text-lg font-bold transition-colors ${
            scrolled ? "text-brand-700" : "text-white"
          }`}
        >
          {COMPANY_NAME}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-400 ${
                scrolled ? "text-gray-700" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={PHONE_HREF}
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-600 hover:shadow-lg"
          >
            Pozovite nas
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ${scrolled ? "text-gray-700" : "text-white"}`}
          aria-label="Meni"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PHONE_HREF}
            className="mt-2 block rounded-full bg-brand-500 px-5 py-2 text-center text-sm font-semibold text-white"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </header>
  );
}
