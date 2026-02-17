"use client";

import { useState } from "react";
import BookingsList from "@/components/admin/BookingsList";
import BookingForm from "@/components/admin/BookingForm";

export default function BookingsPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Zakazivanja</h1>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          + Novo zakazivanje
        </button>
      </div>

      <BookingsList refreshKey={refreshKey} />

      {showForm && (
        <BookingForm
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
}
