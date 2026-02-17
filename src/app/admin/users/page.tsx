"use client";

import { useState } from "react";
import UsersList from "@/components/admin/UsersList";
import UserForm from "@/components/admin/UserForm";

interface EditUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  sequence: number;
}

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<EditUser | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (user: EditUser) => {
    setEditUser(user);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditUser(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3 md:mb-6">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Korisnici</h1>
        <button
          onClick={() => {
            setEditUser(null);
            setShowForm(true);
          }}
          className="shrink-0 rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-600 md:px-4"
        >
          + Novi korisnik
        </button>
      </div>

      <UsersList refreshKey={refreshKey} onEdit={handleEdit} />

      {showForm && (
        <UserForm
          onClose={() => {
            setShowForm(false);
            setEditUser(null);
          }}
          onSaved={handleSaved}
          editUser={editUser}
        />
      )}
    </div>
  );
}
