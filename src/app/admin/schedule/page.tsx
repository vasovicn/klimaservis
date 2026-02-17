"use client";

import { useState } from "react";
import DateCarousel from "@/components/admin/DateCarousel";
import ScheduleGrid from "@/components/admin/ScheduleGrid";
import BookingForm from "@/components/admin/BookingForm";

function todayStr() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function SchedulePage() {
  const [date, setDate] = useState(todayStr());
  const [showForm, setShowForm] = useState(false);
  const [prefill, setPrefill] = useState<{
    serviserId?: string;
    time?: string;
  }>({});
  const [key, setKey] = useState(0);

  const handleCellClick = (serviserId: string, time: string) => {
    setPrefill({ serviserId, time });
    setShowForm(true);
  };

  const handleCreated = () => {
    setShowForm(false);
    setPrefill({});
    setKey((k) => k + 1);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Raspored</h1>
        <button
          onClick={() => {
            setPrefill({});
            setShowForm(true);
          }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          + Novo zakazivanje
        </button>
      </div>

      <div className="mb-6">
        <DateCarousel selectedDate={date} onSelect={setDate} />
      </div>

      <ScheduleGrid
        key={`${date}-${key}`}
        date={date}
        onCellClick={handleCellClick}
      />

      {showForm && (
        <BookingForm
          onClose={() => setShowForm(false)}
          onCreated={handleCreated}
          prefillServiserId={prefill.serviserId}
          prefillDate={date}
          prefillTime={prefill.time}
        />
      )}
    </div>
  );
}
