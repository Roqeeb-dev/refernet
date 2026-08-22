"use client";

import { AdminFacility } from "@/services/admin-facilities.service";

interface FacilityProfileTabProps {
  facility: AdminFacility;
  onFacilityUpdated: () => void;
}

function formatDate(value: string): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function FacilityProfileTab({
  facility,
}: FacilityProfileTabProps) {
  const rows = [
    { label: "Facility Name", value: facility.name },
    { label: "Type", value: facility.type ?? "—" },
    { label: "State", value: facility.state ?? "—" },
    { label: "LGA", value: facility.lga ?? "—" },
    { label: "Status", value: facility.status },
    { label: "Registered", value: formatDate(facility.registeredAt) },
    { label: "Tier", value: facility.tier ?? "Not yet assigned" },
    {
      label: "Decline Rate",
      value:
        facility.declineRate !== null && facility.declineRate !== undefined
          ? `${facility.declineRate}%`
          : "Not yet tracked",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-100 p-base">
      <div className="mb-md flex items-center justify-between">
        <h3 className="font-heading text-body-sm font-bold text-text-primary">
          Facility Profile
        </h3>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-sm py-1 font-body text-caption font-semibold text-text-secondary hover:bg-gray-50"
        >
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 gap-y-sm sm:grid-cols-2 sm:gap-x-lg">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="font-body text-caption font-semibold uppercase tracking-wide text-text-disabled">
              {row.label}
            </p>
            <p className="mt-0.5 font-body text-body-sm font-medium text-text-primary">
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
