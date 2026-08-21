"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { AdminProfile, AdminRole, AdminStatus } from "@/types/admin";
import { updateAdminProfile } from "@/services/admin-management.service";

interface EditAdminModalProps {
  admin: AdminProfile;
  currentAdminId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  getInitials: (name: string) => string;
}

export default function EditAdminModal({
  admin,
  currentAdminId,
  isOpen,
  onClose,
  onSuccess,
  getInitials,
}: EditAdminModalProps) {
  const [fullName, setFullName] = useState(admin.fullName);
  const [role, setRole] = useState<AdminRole>(admin.role);
  const [status, setStatus] = useState<AdminStatus>(admin.status);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const { success, error: apiError } = await updateAdminProfile({
      adminId: admin.id,
      fullName,
      role,
      status,
    });

    if (!success) {
      setError(apiError || "Failed to update profile.");
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-[480px] rounded-2xl bg-white p-lg shadow-xl border border-gray-100 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 font-bold text-white text-[12px]">
              {getInitials(admin.fullName)}
            </div>
            <div>
              <h3 className="font-heading text-body-md font-bold text-text-primary">
                Edit Admin Account
              </h3>
              <p className="font-mono text-[11px] text-text-disabled">
                {admin.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-xs text-text-disabled hover:bg-gray-100 hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="mt-sm rounded-xl bg-red-50 p-xs border border-red-200 text-caption font-bold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-md space-y-base">
          <div className="grid grid-cols-2 gap-sm">
            <div>
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="Email"
                value={admin.email}
                disabled
                className="bg-gray-50 text-text-disabled cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div>
              <label className="mb-2xs block font-body text-caption font-bold text-text-primary">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as AdminRole)}
                className="w-full rounded-xl border border-gray-200 bg-white p-xs font-body text-caption text-text-primary outline-none focus:border-emerald-800"
              >
                <option value="super_admin">Super Admin</option>
                <option value="verification_officer">
                  Verification Officer
                </option>
                <option value="support_officer">Support Officer</option>
              </select>
            </div>

            <div>
              <label className="mb-2xs block font-body text-caption font-bold text-text-primary">
                Status
              </label>
              <select
                value={status}
                disabled={admin.id === currentAdminId}
                onChange={(e) => setStatus(e.target.value as AdminStatus)}
                className="w-full rounded-xl border border-gray-200 bg-white p-xs font-body text-caption text-text-primary outline-none focus:border-emerald-800 disabled:bg-gray-50 disabled:text-text-disabled"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="deactivated">Deactivated</option>
              </select>
              {admin.id === currentAdminId && (
                <p className="mt-2xs text-[10px] text-text-disabled">
                  Cannot change your own status.
                </p>
              )}
            </div>
          </div>

          <div className="mt-lg flex items-center justify-end gap-sm border-t border-gray-100 pt-md">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="px-md text-[11px] font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSaving}
              className="bg-emerald-800 hover:bg-emerald-900 px-md text-[11px] font-bold text-white rounded-xl"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
