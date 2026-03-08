"use client";

import { SERVICES, calculateDuration } from "@/lib/services";
import type { BookingData } from "./BookingWizard";

export default function StepSolutions({
  data,
  next,
}: {
  data: BookingData;
  next: () => void;
}) {
  const selectedServices = SERVICES.filter((s) => data.services.includes(s.id));
  const duration = calculateDuration(data.services);

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold text-gray-900">
        Moguća rešenja
      </h2>
      <p className="mb-4 text-sm text-gray-500">
        Na osnovu odabranih simptoma, jedna od sledećih usluga najverovatnije rešava vaš problem
      </p>

      <div className="space-y-3">
        {selectedServices.map((service) => (
          <div
            key={service.id}
            className="rounded-xl border-2 border-brand-200 bg-brand-50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-semibold text-gray-900">{service.name}</div>
                <div className="mt-0.5 text-sm text-gray-500">
                  {service.description}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-lg font-bold text-brand-600">
                  {service.price}{" "}
                  <span className="text-sm font-normal text-gray-400">RSD</span>
                </div>
                <div className="text-xs text-gray-400">~{service.duration} min</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-amber-800 leading-relaxed">
          Tačna usluga koja će rešiti vaš problem utvrđuje se na licu mesta. <span className="font-semibold">Nije potrebno da uradite sve navedene usluge</span> — tehničar će dijagnostikovati problem i preporučiti samo ono što je zaista potrebno.
        </p>
      </div>

      <div className="mt-3 rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Procenjeno trajanje posete
          </span>
          <span className="font-bold text-gray-900">~{duration} min</span>
        </div>
      </div>

      <button
        onClick={next}
        className="mt-6 w-full rounded-full bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
      >
        Dalje
      </button>
    </div>
  );
}
