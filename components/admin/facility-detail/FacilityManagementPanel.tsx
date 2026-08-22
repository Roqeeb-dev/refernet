"use client";

import { useState } from "react";
import { AdminFacility } from "@/services/admin-facilities.service";
import { toggleFacilitySuspension } from "@/services/admin-facilities.service";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface FacilityManagementPanelProps {
  facility: AdminFacility;
  onStatusChanged: () => void;
}

export default function FacilityManagementPanel({
  facility,
  onStatusChanged,
}: FacilityManagementPanelProps) {
  const { isSuperAdmin } = useAdminAuth();
  const [isSuspending, setIsSuspending] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const isSuspended = facility.status === "suspended";
  const canSuspend =
    facility.status === "approved" || facility.status === "suspended";

  async function handleSuspendToggle() {
    setIsSuspending(true);
    const { success, error } = await toggleFacilitySuspension(
      facility.id,
      facility.status,
    );
    setIsSuspending(false);

    if (!success) {
      alert(`Error: ${error}`);
      return;
    }
    onStatusChanged();
  }

  async function handleDeactivate() {
    const confirmed = window.confirm(
      `Permanently deactivate ${facility.name}? This cannot be undone.`,
    );
    if (!confirmed) return;

    setIsDeactivating(true);
    // TODO: wire to a real service call once a "deactivated" status
    // (or equivalent hard-deactivation flag) exists in the schema —
    // this currently has nowhere safe to write to.
    alert(
      "Permanent deactivation isn't wired to the database yet — needs a schema migration first.",
    );
    setIsDeactivating(false);
  }

  return (
    <aside className="h-fit rounded-xl border border-gray-100 bg-white p-base">
      <h3 className="font-heading text-body-sm font-bold text-text-primary">
        Facility Management
      </h3>

      <div className="mt-sm flex flex-col gap-xs">
        <button
          type="button"
          onClick={handleSuspendToggle}
          disabled={!canSuspend || isSuspending}
          className={`h-9 rounded-lg border px-sm font-body text-body-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            isSuspended
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              : "border-amber-200 bg-amber-50/60 text-amber-800 hover:bg-amber-100/80"
          }`}
        >
          {isSuspending
            ? "Working..."
            : isSuspended
              ? "Unsuspend Facility"
              : "Suspend Facility"}
        </button>

        <button
          type="button"
          onClick={handleDeactivate}
          disabled={!isSuperAdmin || isDeactivating}
          title={
            !isSuperAdmin
              ? "Only Super Admins can permanently deactivate a facility"
              : undefined
          }
          className="h-9 rounded-lg bg-red-700 px-sm font-body text-body-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeactivating ? "Working..." : "Permanently Deactivate"}
        </button>

        <p className="mt-1 font-body text-caption text-text-disabled">
          Suspension is temporary. Deactivation is permanent and requires Super
          Admin rights.
        </p>
      </div>
    </aside>
  );
}
