"use client";

import { useState, useMemo } from "react";
import { Search, Building2 } from "lucide-react";
import { useAdminFacilities } from "@/hooks/useAdminFacilities";
import {
  PageLoadingState,
  PageErrorState,
  PageEmptyState,
} from "@/components/admin/AdminPageStates";
import { PendingFacilityRow } from "@/components/admin/PendingFacilityRow";

export default function PendingFacilitiesListPage() {
  const { facilities, isLoading, errorMsg, reload } = useAdminFacilities();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter real data for Pending status
  const pendingFacilities = useMemo(() => {
    return facilities.filter((facility) => {
      const isPending = facility.status?.toLowerCase() === "pending";
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !q ||
        facility.name.toLowerCase().includes(q) ||
        facility.state.toLowerCase().includes(q) ||
        (facility.lga && facility.lga.toLowerCase().includes(q)) ||
        facility.id.toLowerCase().includes(q);

      return isPending && matchesSearch;
    });
  }, [facilities, searchQuery]);

  return (
    <div className="flex flex-col gap-md">
      {/* Header Bar */}
      <div className="flex flex-col gap-xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-xs">
            <h1 className="font-heading text-xl font-bold text-text-primary">
              Pending Approvals
            </h1>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
              {pendingFacilities.length}
            </span>
          </div>
          <p className="text-[13px] text-text-secondary">
            Review and verify incoming facility registrations to grant access.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search pending facility name, ID, or LGA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-sm py-2 text-xs outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Dynamic States */}
      {isLoading && (
        <PageLoadingState message="Fetching pending facility approvals..." />
      )}

      {!isLoading && errorMsg && (
        <PageErrorState
          title="Failed to load pending queue"
          errorMsg={errorMsg}
          onRetry={reload}
        />
      )}

      {!isLoading && !errorMsg && pendingFacilities.length === 0 && (
        <PageEmptyState
          title="No Pending Approvals"
          searchQuery={searchQuery}
          icon={Building2}
        />
      )}

      {/* Real Data Table */}
      {!isLoading && !errorMsg && pendingFacilities.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 uppercase tracking-wider text-text-disabled font-bold text-[10px]">
                  <th className="py-sm px-md">Facility</th>
                  <th className="py-sm px-md">Type</th>
                  <th className="py-sm px-md">Location</th>
                  <th className="py-sm px-md">Submitted</th>
                  <th className="py-sm px-md">Assigned Officer</th>
                  <th className="py-sm px-md">SLA Status</th>
                  <th className="py-sm px-md text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-text-primary">
                {pendingFacilities.map((facility) => (
                  <PendingFacilityRow key={facility.id} facility={facility} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
