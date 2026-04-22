"use client";

import { useEffect } from "react";
import { SERVICES } from "@/lib/services";
import { trackEvent } from "@/lib/analytics";
import { useBooking } from "./BookingContext";
import type { BookingData } from "./BookingWizard";

export default function StepSuccess({
  data,
  reset,
}: {
  data: BookingData;
  reset: () => void;
}) {
  const { close } = useBooking();

  const selectedServices = data.services
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter(Boolean) as typeof SERVICES;

  useEffect(() => {
    const totalValue = selectedServices.reduce(
      (sum, s) => sum + (Number(s.price) || 0),
      0,
    );
    trackEvent("book_appointment", {
      value: totalValue,
      currency: "RSD",
      services: data.services.join(","),
      date: data.date,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="py-6 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-8 w-8 text-green-500"
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
      </div>

      <h2 className="mb-1 text-xl font-bold text-gray-900">
        Termin uspešno zakazan!
      </h2>
      <div className="mb-6" />

      <div className="rounded-xl bg-gray-50 p-4 text-left text-sm space-y-3">
        {/* Date & time */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Datum i vreme</span>
          <span className="font-semibold text-gray-900">
            {data.date} u {data.startTime}
          </span>
        </div>

        <div className="border-t border-gray-200" />

        {/* Services */}
        <div>
          <span className="text-gray-500">
            {selectedServices.length === 1 ? "Usluga" : "Potencijalna rešenja problema"}
          </span>
          <div className="mt-1.5 space-y-1">
            {selectedServices.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm"
              >
                <span className="font-medium text-gray-900">{s.name}</span>
                <span className="text-xs text-brand-600 font-semibold">{s.price} RSD</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* Contact */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Ime</span>
          <span className="font-semibold text-gray-900">{data.customerName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Telefon</span>
          <span className="font-semibold text-gray-900">{data.customerPhone}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Adresa</span>
          <span className="font-semibold text-gray-900 text-right">{data.customerAddress}</span>
        </div>
      </div>

      <button
        onClick={() => {
          reset();
          close();
        }}
        className="mt-6 w-full rounded-full bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
      >
        Zatvori
      </button>
    </div>
  );
}
