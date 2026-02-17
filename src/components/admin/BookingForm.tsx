"use client";

import { useState, useEffect } from "react";
import { SERVICES } from "@/lib/services";

interface Serviser {
  id: string;
  firstName: string;
  lastName: string;
}

export default function BookingForm({
  onClose,
  onCreated,
  prefillServiserId,
  prefillDate,
  prefillTime,
}: {
  onClose: () => void;
  onCreated: () => void;
  prefillServiserId?: string;
  prefillDate?: string;
  prefillTime?: string;
}) {
  const [servisers, setServisers] = useState<Serviser[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [date, setDate] = useState(prefillDate || "");
  const [startTime, setStartTime] = useState(prefillTime || "");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [userId, setUserId] = useState(prefillServiserId || "");
  const [customDuration, setCustomDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  const hasOstalo = services.includes("ostalo");

  useEffect(() => {
    // Fetch current user info
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setCurrentUserRole(data.user.role);
          setCurrentUserId(data.user.id);
          // If serviser, force userId to self and populate servisers list
          if (data.user.role === "serviser") {
            setUserId(data.user.id);
            setServisers([{
              id: data.user.id,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
            }]);
          }
        }
      });
  }, []);

  useEffect(() => {
    if (currentUserRole === "serviser") {
      // Serviser doesn't have access to /api/admin/users, skip
      return;
    }
    fetch("/api/admin/users")
      .then((r) => {
        if (!r.ok) return { users: [] };
        return r.json();
      })
      .then((data) => {
        const s = (data.users || []).filter(
          (u: Serviser & { role: string; active: boolean }) =>
            u.role === "serviser" && u.active !== false
        );
        setServisers(s);
        if (!userId && s.length > 0) setUserId(s[0].id);
      });
  }, [userId, currentUserRole]);

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services,
          date,
          startTime,
          customerName,
          customerPhone,
          customerAddress,
          userId,
          ...(hasOstalo ? { customDuration } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Greška");
        return;
      }

      onCreated();
    } catch {
      setError("Greška pri povezivanju");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-bold text-gray-900">
          Novo zakazivanje
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Usluge
            </label>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleService(s.id)}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    services.includes(s.id)
                      ? "bg-brand-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s.name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => toggleService("ostalo")}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  hasOstalo
                    ? "bg-brand-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Ostalo
              </button>
            </div>
          </div>

          {hasOstalo && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Trajanje (minuti)
              </label>
              <input
                type="number"
                value={customDuration}
                onChange={(e) => setCustomDuration(Number(e.target.value))}
                min={15}
                step={15}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Datum
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Vreme
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                step="1800"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Serviser
            </label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={currentUserRole === "serviser"}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              {currentUserRole === "serviser"
                ? servisers
                    .filter((s) => s.id === currentUserId)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.firstName} {s.lastName}
                      </option>
                    ))
                : servisers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Ime i prezime
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Telefon
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Adresa
            </label>
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || services.length === 0}
              className="flex-1 rounded-lg bg-brand-500 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:bg-gray-300"
            >
              {loading ? "Čuvanje..." : "Zakaži"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200"
            >
              Otkaži
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
