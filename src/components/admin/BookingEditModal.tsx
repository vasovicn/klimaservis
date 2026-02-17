"use client";

import { useState, useEffect } from "react";

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
  date: string;
  user?: { firstName: string; lastName: string };
}

interface Serviser {
  id: string;
  firstName: string;
  lastName: string;
}

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

const statusLabel: Record<string, string> = {
  confirmed: "Potvrđeno",
  completed: "Završeno",
  cancelled: "Otkazano",
};

export default function BookingEditModal({
  booking,
  bookingDate,
  onClose,
  onSaved,
}: {
  booking: Booking;
  bookingDate: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [editName, setEditName] = useState(booking.customerName);
  const [editPhone, setEditPhone] = useState(booking.customerPhone);
  const [editAddress, setEditAddress] = useState(booking.customerAddress);
  const [editUserId, setEditUserId] = useState(booking.userId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [currentUserRole, setCurrentUserRole] = useState("");
  const [servisers, setServisers] = useState<Serviser[]>([]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setCurrentUserRole(data.user.role);
          if (data.user.role === "admin") {
            fetch("/api/admin/users")
              .then((r) => r.ok ? r.json() : { users: [] })
              .then((d) => {
                const s = (d.users || []).filter(
                  (u: Serviser & { role: string; active: boolean }) =>
                    u.role === "serviser" && u.active !== false
                );
                setServisers(s);
              });
          }
        }
      });
  }, []);

  const handleSave = async () => {
    setError("");
    setSaving(true);

    // If admin changed the serviser, check availability first
    if (currentUserRole === "admin" && editUserId !== booking.userId) {
      try {
        const checkRes = await fetch(
          `/api/admin/bookings/${booking.id}/check-availability`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: editUserId }),
          }
        );
        const checkData = await checkRes.json();
        if (!checkData.available) {
          const serviser = servisers.find((s) => s.id === editUserId);
          const name = serviser
            ? `${serviser.firstName} ${serviser.lastName}`
            : "Izabrani serviser";
          setError(
            `${name} nije dostupan u terminu ${booking.startTime} - ${booking.endTime}. Izaberite drugog servisera.`
          );
          setSaving(false);
          return;
        }
      } catch {
        setError("Greška pri proveri dostupnosti");
        setSaving(false);
        return;
      }
    }

    const body: Record<string, string> = {
      customerName: editName,
      customerPhone: editPhone,
      customerAddress: editAddress,
    };

    if (currentUserRole === "admin" && editUserId !== booking.userId) {
      body.userId = editUserId;
    }

    await fetch(`/api/admin/bookings/${booking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    onSaved();
  };

  const handleCancel = async () => {
    await fetch(`/api/admin/bookings/${booking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    onSaved();
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const canCancel = booking.status === "confirmed" && bookingDate >= todayStr;

  return (
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
              <span className="font-medium">{parseServices(booking.services)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vreme:</span>
              <span className="font-medium">
                {booking.startTime} - {booking.endTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Trajanje:</span>
              <span className="font-medium">{booking.duration} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className={`font-medium ${
                booking.status === "confirmed" ? "text-brand-600" :
                booking.status === "completed" ? "text-green-600" : "text-gray-500"
              }`}>
                {statusLabel[booking.status] || booking.status}
              </span>
            </div>
          </div>

          {/* Serviser dropdown - admin only */}
          {currentUserRole === "admin" && servisers.length > 0 && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Serviser
              </label>
              <select
                value={editUserId}
                onChange={(e) => {
                  setEditUserId(e.target.value);
                  setError("");
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
              >
                {servisers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </select>
            </div>
          )}

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

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-lg bg-brand-500 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:bg-gray-300"
          >
            {saving ? "Čuvanje..." : "Sačuvaj"}
          </button>
          {canCancel && (
            <button
              onClick={handleCancel}
              className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
            >
              Otkaži termin
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200"
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
}
