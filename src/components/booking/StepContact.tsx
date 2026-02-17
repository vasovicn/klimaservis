"use client";

import { useState } from "react";
import type { BookingData } from "./BookingWizard";

export default function StepContact({
  data,
  update,
  next,
  goToStep,
}: {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  next: () => void;
  goToStep: (step: number) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    data.customerName.trim() &&
    data.customerPhone.trim() &&
    data.customerAddress.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: data.services,
          date: data.date,
          startTime: data.startTime,
          customerName: data.customerName.trim(),
          customerPhone: data.customerPhone.trim(),
          customerAddress: data.customerAddress.trim(),
        }),
      });

      if (res.status === 409) {
        setError("Izabrani termin je upravo zauzet. Izaberite drugi termin.");
        setTimeout(() => goToStep(2), 2000);
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Došlo je do greške. Pokušajte ponovo.");
        return;
      }

      next();
    } catch {
      setError("Greška pri povezivanju. Proverite internet i pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold text-gray-900">Vaši podaci</h2>
      <p className="mb-4 text-sm text-gray-500">
        Unesite podatke za kontakt
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Ime i prezime
          </label>
          <input
            type="text"
            value={data.customerName}
            onChange={(e) => update({ customerName: e.target.value })}
            placeholder="Petar Petrović"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Telefon
          </label>
          <input
            type="tel"
            value={data.customerPhone}
            onChange={(e) => update({ customerPhone: e.target.value })}
            placeholder="064 123 4567"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Adresa
          </label>
          <input
            type="text"
            value={data.customerAddress}
            onChange={(e) => update({ customerAddress: e.target.value })}
            placeholder="Bulevar Mihajla Pupina 10, Novi Beograd"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit || loading}
        className="mt-6 w-full rounded-full bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Zakazivanje...
          </span>
        ) : (
          "Zakaži"
        )}
      </button>
    </div>
  );
}
