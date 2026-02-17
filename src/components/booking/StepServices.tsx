"use client";

import { SERVICES } from "@/lib/services";
import type { BookingData } from "./BookingWizard";

export default function StepServices({
  data,
  update,
  next,
}: {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  next: () => void;
}) {
  const toggle = (id: string) => {
    const services = data.services.includes(id)
      ? data.services.filter((s) => s !== id)
      : [...data.services, id];
    update({ services });
  };

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold text-gray-900">
        Izaberite uslugu
      </h2>
      <p className="mb-4 text-sm text-gray-500">
        Možete izabrati jednu ili više usluga
      </p>

      <div className="space-y-3">
        {SERVICES.map((service) => {
          const selected = data.services.includes(service.id);
          return (
            <button
              key={service.id}
              onClick={() => toggle(service.id)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                selected
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {service.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {service.description}
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    ~{service.duration} min
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-brand-600">
                    {service.price} <span className="text-sm font-normal text-gray-400">RSD</span>
                  </span>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                      selected
                        ? "border-brand-500 bg-brand-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selected && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={next}
        disabled={data.services.length === 0}
        className="mt-6 w-full rounded-full bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Dalje
      </button>
    </div>
  );
}
