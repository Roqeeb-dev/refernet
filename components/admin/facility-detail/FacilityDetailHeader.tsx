import { AdminFacility } from "@/services/admin-facilities.service";

interface FacilityDetailHeaderProps {
  facility: AdminFacility;
}

export default function FacilityDetailHeader({
  facility,
}: FacilityDetailHeaderProps) {
  const isApproved = facility.status === "approved";

  return (
    <div className="mb-6">
      {/* Facility Name */}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        {facility.name}
      </h2>

      {/* Badges and Subtext */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium">
        {/* Status Badge */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isApproved
              ? "bg-[#E8F5E9] text-[#2E7D32]"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isApproved ? "bg-[#2E7D32]" : "bg-amber-500"
            }`}
          />
          {isApproved ? "Active" : facility.status}
        </span>

        {/* Tier Badge */}
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700">
          {facility.tier ? facility.tier : "Tier 3 — MoH"}
        </span>

        {/* ID Code */}
        <span className="text-slate-400 font-mono">
          {facility.id.startsWith("F1-")
            ? facility.id
            : `F1-${facility.id.slice(0, 4).toUpperCase()}`}
        </span>

        {/* Last Active */}
        <span className="text-slate-400">
          Last active: {facility.lastActive ?? "2 hours ago"}
        </span>
      </div>
    </div>
  );
}
