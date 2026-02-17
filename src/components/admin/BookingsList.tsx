"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  services: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  user: { firstName: string; lastName: string };
}

const statusBadge: Record<string, string> = {
  confirmed: "bg-brand-100 text-brand-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

const statusLabel: Record<string, string> = {
  confirmed: "Potvrđeno",
  completed: "Završeno",
  cancelled: "Otkazano",
};

const DAYS_SERBIAN = ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"];
const MONTHS_SERBIAN = [
  "januar", "februar", "mart", "april", "maj", "jun",
  "jul", "avgust", "septembar", "oktobar", "novembar", "decembar",
];

function todayStr() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dayName = DAYS_SERBIAN[d.getDay()];
  const day = d.getDate();
  const month = MONTHS_SERBIAN[d.getMonth()];
  const year = d.getFullYear();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  let label = `${dayName}, ${day}. ${month} ${year}`;
  if (diff === 0) label += " (Danas)";
  else if (diff === 1) label += " (Sutra)";
  else if (diff === -1) label += " (Juče)";

  return label;
}

export default function BookingsList({ refreshKey }: { refreshKey: number }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPast, setShowPast] = useState(false);
  const [pastDate, setPastDate] = useState("");
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [pastLoading, setPastLoading] = useState(false);

  const fetchBookings = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings, refreshKey]);

  const fetchPastBookings = useCallback(() => {
    if (!pastDate) return;
    setPastLoading(true);
    fetch(`/api/admin/bookings?showPast=true&pastDate=${pastDate}`)
      .then((r) => r.json())
      .then((data) => setPastBookings(data.bookings || []))
      .finally(() => setPastLoading(false));
  }, [pastDate]);

  useEffect(() => {
    if (showPast && pastDate) {
      fetchPastBookings();
    }
  }, [showPast, pastDate, fetchPastBookings, refreshKey]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Greška");
      return;
    }
    fetchBookings();
    if (showPast && pastDate) fetchPastBookings();
  };

  const parseServices = (s: string) => {
    try {
      const ids = JSON.parse(s) as string[];
      const map: Record<string, string> = {
        mali: "Mali",
        veliki: "Veliki",
        kondenzator: "Kondenzator",
        ostalo: "Ostalo",
      };
      return ids.map((id) => map[id] || id).join(", ");
    } catch {
      return s;
    }
  };

  // Group bookings by date - ascending (nearest first)
  const grouped = useMemo(() => {
    const groups: Record<string, Booking[]> = {};
    for (const b of bookings) {
      if (!groups[b.date]) groups[b.date] = [];
      groups[b.date].push(b);
    }
    const sortedDates = Object.keys(groups).sort((a, b) => a.localeCompare(b));
    return sortedDates.map((date) => ({
      date,
      label: formatDateLabel(date),
      bookings: groups[date].sort((a, b) => a.startTime.localeCompare(b.startTime)),
    }));
  }, [bookings]);

  const pastGrouped = useMemo(() => {
    if (!pastBookings.length) return [];
    const groups: Record<string, Booking[]> = {};
    for (const b of pastBookings) {
      if (!groups[b.date]) groups[b.date] = [];
      groups[b.date].push(b);
    }
    const sortedDates = Object.keys(groups).sort((a, b) => a.localeCompare(b));
    return sortedDates.map((date) => ({
      date,
      label: formatDateLabel(date),
      bookings: groups[date].sort((a, b) => a.startTime.localeCompare(b.startTime)),
    }));
  }, [pastBookings]);

  const today = todayStr();

  const renderTable = (group: { date: string; label: string; bookings: Booking[] }, isPast: boolean) => (
    <div key={group.date}>
      <h3 className="mb-2 text-sm font-semibold text-gray-700">
        {group.label}
      </h3>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-2.5 text-left font-medium text-gray-500">Vreme</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500">Klijent</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500">Telefon</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500">Adresa</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500">Usluge</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500">Serviser</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500">Status</th>
              {!isPast && (
                <th className="px-4 py-2.5 text-left font-medium text-gray-500">Akcije</th>
              )}
            </tr>
          </thead>
          <tbody>
            {group.bookings.map((b) => (
              <tr key={b.id} className="border-b border-gray-100">
                <td className="px-4 py-2.5 whitespace-nowrap">
                  {b.startTime} - {b.endTime}
                </td>
                <td className="px-4 py-2.5 font-medium">{b.customerName}</td>
                <td className="px-4 py-2.5">{b.customerPhone}</td>
                <td className="px-4 py-2.5 max-w-[200px] truncate">{b.customerAddress}</td>
                <td className="px-4 py-2.5">{parseServices(b.services)}</td>
                <td className="px-4 py-2.5">
                  {b.user.firstName} {b.user.lastName}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      statusBadge[b.status] || ""
                    }`}
                  >
                    {statusLabel[b.status] || b.status}
                  </span>
                </td>
                {!isPast && (
                  <td className="px-4 py-2.5">
                    {b.status === "confirmed" && b.date >= today && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateStatus(b.id, "completed")}
                          className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                        >
                          Završi
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, "cancelled")}
                          className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                        >
                          Otkaži
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current/future bookings */}
      {bookings.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          Nema predstojećih zakazivanja.
        </div>
      ) : (
        grouped.map((group) => renderTable(group, false))
      )}

      {/* Past bookings section */}
      <div className="border-t border-gray-200 pt-4">
        {!showPast ? (
          <button
            onClick={() => setShowPast(true)}
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Prikaži prošle termine
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Prošli termini za datum:</label>
              <input
                type="date"
                value={pastDate}
                max={today}
                onChange={(e) => setPastDate(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
              />
              <button
                onClick={() => {
                  setShowPast(false);
                  setPastDate("");
                  setPastBookings([]);
                }}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                Sakrij
              </button>
            </div>

            {pastLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
              </div>
            ) : pastDate && pastBookings.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                Nema termina za izabrani datum.
              </div>
            ) : (
              pastGrouped.map((group) => renderTable(group, true))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
