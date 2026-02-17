"use client";

import { useEffect, useState } from "react";
import type { BookingData } from "./BookingWizard";

export default function StepTime({
  data,
  update,
  next,
}: {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  next: () => void;
}) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(
      `/api/slots?date=${data.date}&services=${data.services.join(",")}`
    )
      .then((r) => r.json())
      .then((d) => {
        setSlots(d.slots || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Greška pri učitavanju termina");
        setLoading(false);
      });
  }, [data.date, data.services]);

  // Generate all possible time slots for display (07:00–22:00)
  const allSlots: string[] = [];
  for (let h = 7; h < 22; h++) {
    allSlots.push(`${String(h).padStart(2, "0")}:00`);
    allSlots.push(`${String(h).padStart(2, "0")}:30`);
  }

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold text-gray-900">
        Izaberite termin
      </h2>
      <p className="mb-4 text-sm text-gray-500">{data.date}</p>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
        </div>
      ) : error ? (
        <p className="py-8 text-center text-red-500">{error}</p>
      ) : slots.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          Nema slobodnih termina za ovaj datum. Pokušajte drugi datum.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {allSlots.map((slot) => {
            const available = slots.includes(slot);
            const selected = data.startTime === slot;
            return (
              <button
                key={slot}
                onClick={() => available && update({ startTime: slot })}
                disabled={!available}
                className={`rounded-lg border-2 py-2.5 text-sm font-medium transition-all ${
                  selected
                    ? "border-brand-500 bg-brand-500 text-white"
                    : available
                      ? "border-brand-200 bg-white text-gray-700 hover:border-brand-400"
                      : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={next}
        disabled={!data.startTime}
        className="mt-6 w-full rounded-full bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Dalje
      </button>
    </div>
  );
}
