"use client";

import { useEffect, useState, useCallback } from "react";
import BookingBlock from "./BookingBlock";
import BookingEditModal from "./BookingEditModal";

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
                          onClick={() => setEditBooking(b)}
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

      {editBooking && (
        <BookingEditModal
          booking={{ ...editBooking, date }}
          bookingDate={date}
          onClose={() => setEditBooking(null)}
          onSaved={() => {
            setEditBooking(null);
            fetchData();
          }}
        />
      )}
    </>
  );
}
