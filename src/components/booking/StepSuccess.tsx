"use client";

import { SERVICES } from "@/lib/services";
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

  const serviceNames = data.services
    .map((id) => SERVICES.find((s) => s.id === id)?.name ?? id)
    .join(", ");

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

      <h2 className="mb-2 text-xl font-bold text-gray-900">
        Uspešno ste zakazali servis!
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        Potvrda termina biće poslata telefonom.
      </p>

      <div className="mx-auto max-w-xs space-y-2 rounded-xl bg-gray-50 p-4 text-left text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Usluge:</span>
          <span className="font-medium text-gray-900">{serviceNames}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Datum:</span>
          <span className="font-medium text-gray-900">{data.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Vreme:</span>
          <span className="font-medium text-gray-900">{data.startTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Ime:</span>
          <span className="font-medium text-gray-900">
            {data.customerName}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Telefon:</span>
          <span className="font-medium text-gray-900">
            {data.customerPhone}
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          reset();
          close();
        }}
        className="mt-6 rounded-full bg-brand-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
      >
        Zatvori
      </button>
    </div>
  );
}
