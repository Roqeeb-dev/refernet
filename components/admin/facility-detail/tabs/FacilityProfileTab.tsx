"use client";

import { AdminFacility } from "@/services/admin-facilities.service";

interface FacilityProfileTabProps {
  facility: AdminFacility;
  onFacilityUpdated?: () => void;
}

function formatDate(value?: string | null): string {
  if (!value) return "14 Jan 2025";
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
  const fields = [
    {
      label: "FACILITY NAME",
      value: facility.name,
    },
    {
      label: "TYPE",
      value: facility.type ?? "Teaching Hospital",
    },
    {
      label: "STATE",
      value: facility.state ?? "Akwa Ibom",
    },
    {
      label: "LGA",
      value: facility.lga ?? "Uyo",
    },
    {
      label: "STATUS",
      value: facility.status ?? "active",
    },
    {
      label: "REGISTERED",
      value: formatDate(facility.registeredAt),
    },
    {
      label: "TIER",
      value: facility.tier ?? "Tier 3",
    },
    {
      label: "DECLINE RATE",
      value:
        facility.declineRate !== null && facility.declineRate !== undefined
          ? `${facility.declineRate}%`
          : "4%",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs">
      {/* Header Bar */}
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D8A56]">
          Facility Profile
        </h3>
        <button
          type="button"
          className="rounded-sm border border-[#2D8A56] px-4 py-1.5 text-xs font-semibold text-[#2D8A56] transition-colors hover:bg-emerald-50"
        >
          Edit
        </button>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {field.label}
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
