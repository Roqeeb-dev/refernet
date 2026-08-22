"use client";

import { useState, useMemo } from "react";
import { Search, Bell, Building2 } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAdminFacilities } from "@/hooks/useAdminFacilities";
import { FacilityRow } from "@/components/admin/FacilityRow";
import { getInitials } from "@/lib/utils";

import {
  PageLoadingState,
  PageErrorState,
  PageEmptyState,
} from "@/components/admin/AdminPageStates";

export default function FacilitiesPage() {
  const { admin: currentAdmin } = useAdminAuth();
  const {
    facilities,
    isLoading,
    errorMsg,
    actionLoadingId,
    reload,
    toggleSuspend,
  } = useAdminFacilities();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const availableTypes = useMemo(() => {
    const types = new Set(facilities.map((f) => f.type).filter(Boolean));
    return Array.from(types) as string[];
  }, [facilities]);

  const filteredFacilities = useMemo(() => {
    return facilities.filter((f) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        (f.state ?? "").toLowerCase().includes(q) ||
        (f.lga ?? "").toLowerCase().includes(q) ||
        (f.phone && f.phone.includes(q));

      const matchesType = selectedType === "all" || f.type === selectedType;
      const matchesStatus =
        selectedStatus === "all" || f.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [facilities, searchQuery, selectedType, selectedStatus]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-md font-body">
      {/* Top Header */}
      <div className="mb-md flex items-center justify-between border-b border-gray-200 pb-sm">
        <h1 className="font-heading text-body-md font-bold text-text-primary">
          All Facilities
        </h1>
        <div className="flex items-center gap-sm">
          <button
            type="button"
            className="rounded-xl border border-gray-200 bg-white p-xs text-text-secondary hover:bg-gray-50"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="relative rounded-xl border border-gray-200 bg-white p-xs text-text-secondary hover:bg-gray-50"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 font-bold text-white text-[11px]">
            {getInitials(currentAdmin?.fullName || "Admin")}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
        <div className="mb-md flex items-center gap-xs">
          <h2 className="font-heading text-body-lg font-bold text-text-primary">
            All Facilities
          </h2>
          <span className="rounded-full bg-emerald-100/70 px-2.5 py-0.5 text-body-xs font-bold text-emerald-800">
            {filteredFacilities.length}
          </span>
        </div>

        {/* Filter Controls */}
        <div className="mb-md space-y-sm">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-text-disabled" />
            <input
              type="text"
              placeholder="Search by name, phone, facility ID, LGA, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-sm text-[12px] text-text-primary placeholder:text-text-disabled outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-sm">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-9 rounded-xl border border-gray-200 bg-white px-sm text-[11px] font-medium text-text-primary outline-none focus:border-emerald-600"
            >
              <option value="all">All Types</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 rounded-xl border border-gray-200 bg-white px-sm text-[11px] font-medium text-text-primary outline-none focus:border-emerald-600"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Active</option>
              <option value="pending_review">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Dynamic States */}
        {isLoading && <PageLoadingState message="Loading facilities..." />}
        {!isLoading && errorMsg && (
          <PageErrorState
            title="Failed to load facilities"
            errorMsg={errorMsg}
            onRetry={reload}
          />
        )}
        {!isLoading && !errorMsg && filteredFacilities.length === 0 && (
          <PageEmptyState
            title="No Facilities Found"
            searchQuery={searchQuery}
            icon={Building2}
          />
        )}

        {/* Table View */}
        {!isLoading && !errorMsg && filteredFacilities.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  <th className="py-2xs px-sm">FACILITY NAME</th>
                  <th className="py-2xs px-sm">TYPE</th>
                  <th className="py-2xs px-sm">STATE / LGA</th>
                  <th className="py-2xs px-sm">REGISTERED</th>
                  <th className="py-2xs px-sm">STATUS</th>
                  <th className="py-2xs px-sm text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[11px]">
                {filteredFacilities.map((facility) => (
                  <FacilityRow
                    key={facility.id}
                    facility={facility}
                    actionLoadingId={actionLoadingId}
                    onToggleSuspend={toggleSuspend}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
