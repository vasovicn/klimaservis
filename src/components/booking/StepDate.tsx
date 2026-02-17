"use client";

import { useState } from "react";
import type { BookingData } from "./BookingWizard";

const DAYS = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];
const MONTHS = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun",
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar",
];

function formatDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function isToday(y: number, m: number, d: number) {
  const t = new Date();
  return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
}

function isPast(y: number, m: number, d: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const check = new Date(y, m, d);
  return check < today;
}

export default function StepDate({
  data,
  update,
  next,
}: {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  next: () => void;
}) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // Monday-based: convert Sunday(0) to 6, others shift -1
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const canGoPrev =
    viewYear > now.getFullYear() ||
    (viewYear === now.getFullYear() && viewMonth > now.getMonth());

  const selectDate = (day: number) => {
    if (isPast(viewYear, viewMonth, day)) return;
    update({ date: formatDate(viewYear, viewMonth, day), startTime: "" });
  };

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold text-gray-900">
        Izaberite datum
      </h2>
      <p className="mb-4 text-sm text-gray-500">Ponedeljak - Subota</p>

      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-semibold text-gray-900">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-gray-400">
        {DAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDate(viewYear, viewMonth, day);
          const past = isPast(viewYear, viewMonth, day);
          const today = isToday(viewYear, viewMonth, day);
          const selected = data.date === dateStr;
          // Sunday check (day of week)
          const dow = new Date(viewYear, viewMonth, day).getDay();
          const isSunday = dow === 0;

          return (
            <button
              key={day}
              onClick={() => !isSunday && selectDate(day)}
              disabled={past || isSunday}
              className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                selected
                  ? "bg-brand-500 text-white"
                  : past || isSunday
                    ? "cursor-not-allowed text-gray-300"
                    : today
                      ? "border border-brand-500 text-brand-600 hover:bg-brand-50"
                      : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <button
        onClick={next}
        disabled={!data.date}
        className="mt-6 w-full rounded-full bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Dalje
      </button>
    </div>
  );
}
