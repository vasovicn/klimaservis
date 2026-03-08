"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BookingButton from "./booking/BookingButton";

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
        scrolled || menuOpen
          ? "bg-[#1a3a9a]/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Glavna navigacija" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#pocetna" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Beogradski Klima Servis"
            width={980}
            height={336}
            className="h-[100px] w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-400 ${
                scrolled ? "text-white/90" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <BookingButton variant="header" />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
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
        <div className="border-t border-[#1a3a9a] bg-[#1a3a9a] px-4 py-4 shadow-lg md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-white hover:text-brand-200"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2">
            <BookingButton variant="mobile" />
          </div>
        </div>
      )}
    </header>
  );
}
