"use client";

import { useState, useRef, useEffect } from "react";
import { useBooking } from "./BookingContext";
import { PHONE_HREF, PHONE_DISPLAY } from "@/lib/constants";

type Variant = "hero" | "header" | "card" | "contact";

const variantStyles: Record<Variant, { button: string; dropdown: string }> = {
  hero: {
    button:
      "inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-brand-700 shadow-xl transition-all hover:bg-brand-50 hover:shadow-2xl",
    dropdown: "mt-2 w-80",
  },
  header: {
    button:
      "rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-600 hover:shadow-lg whitespace-nowrap",
    dropdown: "mt-2 w-72 right-0",
  },
  card: {
    button:
      "block w-full rounded-full px-4 py-3.5 text-center font-semibold transition-colors",
    dropdown: "mt-2 w-full",
  },
  contact: {
    button:
      "inline-flex items-center gap-3 rounded-full bg-white px-12 py-5 text-xl font-extrabold text-brand-700 shadow-2xl transition-all hover:scale-105 hover:bg-brand-50 sm:text-2xl",
    dropdown: "mt-2 w-80",
  },
};

export default function BookingButton({
  variant = "card",
  featured = false,
}: {
  variant?: Variant;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { open: openBooking } = useBooking();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cardColors = featured
    ? "bg-brand-500 text-white hover:bg-brand-600"
    : "bg-brand-50 text-brand-700 hover:bg-brand-100";

  const buttonClass =
    variant === "card"
      ? `${variantStyles.card.button} ${cardColors}`
      : variantStyles[variant].button;

  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setOpen(!open)} className={buttonClass}>
        Zakažite servis
      </button>

      {open && (
        <div
          className={`absolute z-50 rounded-xl border border-gray-200 bg-white p-2 shadow-xl ${variantStyles[variant].dropdown}`}
        >
          <a
            href={PHONE_HREF}
            className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-gray-700 transition-colors hover:bg-brand-50"
            onClick={() => setOpen(false)}
          >
            <svg
              className="h-5 w-5 shrink-0 text-brand-500"
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
            <div className="min-w-0">
              <div className="text-sm font-semibold">Pozovite nas</div>
              <div className="text-xs text-gray-500">{PHONE_DISPLAY}</div>
            </div>
          </a>
          <button
            onClick={() => {
              setOpen(false);
              openBooking();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-gray-700 transition-colors hover:bg-brand-50"
          >
            <svg
              className="h-5 w-5 shrink-0 text-brand-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="min-w-0 text-left">
              <div className="text-sm font-semibold">Zakažite online</div>
              <div className="text-xs text-gray-500">Izaberite termin</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
