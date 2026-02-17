"use client";

import { useEffect, useState, useCallback } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  sequence: number;
  active: boolean;
}

export default function UsersList({
  refreshKey,
  onEdit,
}: {
  refreshKey: number;
  onEdit?: (user: User) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => setUsers(data.users || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refreshKey]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Da li ste sigurni da želite da deaktivirate korisnika ${name}?`)) {
      return;
    }
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-500">Ime</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Prezime</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Email</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Telefon</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Uloga</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Redosled</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Aktivan</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Akcije</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium">{u.firstName}</td>
              <td className="px-4 py-3">{u.lastName}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3">{u.phone}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    u.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {u.role === "admin" ? "Admin" : "Serviser"}
                </span>
              </td>
              <td className="px-4 py-3">{u.sequence}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    u.active ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit?.(u)}
                    className="rounded bg-brand-100 px-2 py-1 text-xs font-medium text-brand-700 hover:bg-brand-200"
                  >
                    Izmeni
                  </button>
                  {u.active && (
                    <button
                      onClick={() =>
                        handleDelete(u.id, `${u.firstName} ${u.lastName}`)
                      }
                      className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                    >
                      Deaktiviraj
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
