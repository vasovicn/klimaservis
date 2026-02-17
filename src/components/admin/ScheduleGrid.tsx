"use client";

import { useEffect, useState, useCallback } from "react";
import BookingBlock from "./BookingBlock";

interface Serviser {
  id: string;
  firstName: string;
  lastName: string;
}

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  services: string;
  startTime: string;
  endTime: string;
  status: string;
  duration: number;
  userId: string;
}

const TIME_SLOTS: string[] = [];
for (let h = 7; h < 22; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

const ROW_HEIGHT = 40; // px per 30-min slot

export default function ScheduleGrid({
  date,
  onCellClick,
}: {
  date: string;
  onCellClick?: (serviserId: string, time: string) => void;
}) {
  const [servisers, setServisers] = useState<Serviser[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);

  // Editable form state
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`/api/admin/schedule?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        setServisers(data.servisers || []);
        setBookings(data.bookings || []);
      })
      .finally(() => setLoading(false));
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openEditModal = (b: Booking) => {
    setEditBooking(b);
    setEditName(b.customerName);
    setEditPhone(b.customerPhone);
    setEditAddress(b.customerAddress);
  };

  const handleSave = async () => {
    if (!editBooking) return;
    setEditSaving(true);
    await fetch(`/api/admin/bookings/${editBooking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: editName,
        customerPhone: editPhone,
        customerAddress: editAddress,
      }),
    });
    setEditSaving(false);
    setEditBooking(null);
    fetchData();
  };

  const handleCancel = async () => {
    if (!editBooking) return;
    await fetch(`/api/admin/bookings/${editBooking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    setEditBooking(null);
    fetchData();
  };

  const parseServices = (s: string) => {
    try {
      const ids = JSON.parse(s) as string[];
      const map: Record<string, string> = {
        mali: "Mali servis",
        veliki: "Veliki servis",
        kondenzator: "Kondenzator",
        ostalo: "Ostalo",
      };
      return ids.map((id) => map[id] || id).join(", ");
    } catch {
      return s;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="w-20 px-3 py-2 text-left text-xs font-medium text-gray-500">
                Vreme
              </th>
              {servisers.map((s) => (
                <th
                  key={s.id}
                  className="px-3 py-2 text-center text-xs font-medium text-gray-500"
                >
                  {s.firstName} {s.lastName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((time, rowIdx) => (
              <tr
                key={time}
                className={`border-b border-gray-100 ${
                  rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <td
                  className="px-3 text-xs text-gray-500 whitespace-nowrap"
                  style={{ height: `${ROW_HEIGHT}px` }}
                >
                  {time}
                </td>
                {servisers.map((s) => {
                  const cellBookings = bookings.filter(
                    (b) => b.userId === s.id && b.startTime === time
                  );
                  return (
                    <td
                      key={s.id}
                      className="relative cursor-pointer px-1"
                      style={{ height: `${ROW_HEIGHT}px` }}
                      onClick={() =>
                        cellBookings.length === 0 &&
                        onCellClick?.(s.id, time)
                      }
                    >
                      {cellBookings.map((b) => (
                        <BookingBlock
                          key={b.id}
                          booking={b}
                          rowHeight={ROW_HEIGHT}
                          onClick={() => openEditModal(b)}
                        />
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editable booking modal */}
      {editBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Detalji zakazivanja
            </h3>

            <div className="space-y-3">
              {/* Read-only info */}
              <div className="rounded-lg bg-gray-50 p-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Usluge:</span>
                  <span className="font-medium">{parseServices(editBooking.services)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vreme:</span>
                  <span className="font-medium">
                    {editBooking.startTime} - {editBooking.endTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trajanje:</span>
                  <span className="font-medium">{editBooking.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-medium ${
                    editBooking.status === "confirmed" ? "text-brand-600" : "text-green-600"
                  }`}>
                    {editBooking.status === "confirmed" ? "Potvrđeno" : "Završeno"}
                  </span>
                </div>
              </div>

              {/* Editable fields */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Adresa
                </label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={handleSave}
                disabled={editSaving}
                className="flex-1 rounded-lg bg-brand-500 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:bg-gray-300"
              >
                {editSaving ? "Čuvanje..." : "Sačuvaj"}
              </button>
              {editBooking.status === "confirmed" && (() => {
                const t = new Date();
                const todayStr = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
                return date >= todayStr;
              })() && (
                <button
                  onClick={handleCancel}
                  className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Otkaži termin
                </button>
              )}
              <button
                onClick={() => setEditBooking(null)}
                className="flex-1 rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
