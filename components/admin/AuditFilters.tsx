"use client";

import { Search } from "lucide-react";

interface AuditFiltersProps {
  selectedAdminId: string;
  setSelectedAdminId: (val: string) => void;
  selectedAction: string;
  setSelectedAction: (val: string) => void;
  facilityQuery: string;
  setFacilityQuery: (val: string) => void;
  adminOptions: { id: string; name: string }[];
}

export default function AuditFilters({
  selectedAdminId,
  setSelectedAdminId,
  selectedAction,
  setSelectedAction,
  facilityQuery,
  setFacilityQuery,
  adminOptions,
}: AuditFiltersProps) {
  return (
    <div className="mb-md flex flex-wrap items-center gap-sm">
      <select
        value={selectedAdminId}
        onChange={(e) => setSelectedAdminId(e.target.value)}
        className="h-9 rounded-xl border border-gray-200 bg-white px-sm text-[11px] text-text-primary outline-none focus:border-emerald-700 min-w-[140px]"
      >
        <option value="all">All Admins</option>
        {adminOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>

      <select
        value={selectedAction}
        onChange={(e) => setSelectedAction(e.target.value)}
        className="h-9 rounded-xl border border-gray-200 bg-white px-sm text-[11px] text-text-primary outline-none focus:border-emerald-700 min-w-[140px]"
      >
        <option value="all">All Actions</option>
        <option value="Approval">Approval</option>
        <option value="Suspension">Suspension</option>
        <option value="Document Request">Document Request</option>
        <option value="Rejection">Rejection</option>
        <option value="Login Event">Login Event</option>
        <option value="Account Updated">Account Updated</option>
      </select>

      <div className="relative flex items-center min-w-[200px]">
        <Search className="absolute left-3 h-3.5 w-3.5 text-text-disabled" />
        <input
          type="text"
          placeholder="Facility name..."
          value={facilityQuery}
          onChange={(e) => setFacilityQuery(e.target.value)}
          className="h-9 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-sm text-[11px] text-text-primary outline-none focus:border-emerald-700"
        />
      </div>
    </div>
  );
}
