"use client";

import { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

interface AddStaffModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (member: { name: string; role: string; email: string }) => void;
}

export default function StaffAdditionModal({
  open,
  onClose,
  onAdd,
}: AddStaffModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !role || !email) {
      setError("Please fill in all fields.");
      return;
    }
    onAdd({ name, role, email });
    setName("");
    setRole("");
    setEmail("");
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-base">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add Staff"
        className="w-full max-w-[500px] rounded-2xl bg-white p-xl shadow-floating"
      >
        <h2 className="mb-lg font-display text-heading-lg font-bold text-green-900">
          Add Staff
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-base">
          <Input
            label="Full Name"
            placeholder="Dr Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Role / Title"
            placeholder="Medical Director"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="jane.smith@hospital.ng"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && (
            <p role="alert" className="font-body text-body-sm text-emergency">
              {error}
            </p>
          )}

          <div className="mt-xs flex items-center gap-sm">
            <Button variant="outline" type="button" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" fullWidth>
              Add Staff
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
