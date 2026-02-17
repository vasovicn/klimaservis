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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Korisnici</h1>
        <button
          onClick={() => {
            setEditUser(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
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
