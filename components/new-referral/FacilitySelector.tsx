"use client";

import { useState } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { useFacilities } from "@/hooks/useFacility";
import { Facility, getFacilityAvailabilityOption } from "@/lib/facility";

interface FacilitySelectorProps {
  selectedFacilityId?: string;
  onSelectFacility: (facility: Facility) => void;
}

export default function FacilitySelector({
  selectedFacilityId,
  onSelectFacility,
}: FacilitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { facilities, isLoading, error, refetch } = useFacilities();

  const filteredFacilities = facilities.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="mt-base flex flex-col gap-xs rounded-xl border border-gray-100 bg-gray-50/40 p-sm">
      <label className="font-body text-caption font-bold text-text-primary">
        Select Receiving Facility
      </label>

      {/* Search Input */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-sm top-1/2 -translate-y-1/2 text-text-disabled"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search facilities..."
          disabled={isLoading || !!error}
          className="w-full rounded-lg border border-gray-200 bg-white py-xs pl-xl pr-sm font-body text-body-xs text-text-primary placeholder:text-text-disabled focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      {/* Facilities List Container */}
      <div className="mt-xs flex max-h-48 min-h-[100px] flex-col justify-center gap-xs overflow-y-auto pr-xs">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center gap-xs py-md text-body-xs text-text-secondary">
            <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
            <span>Fetching live facilities...</span>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/50 p-sm text-center text-red-600">
            <AlertCircle className="mb-1 h-4 w-4" />
            <p className="text-caption font-bold">Failed to load facilities</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-xs text-[11px] font-semibold text-emerald-700 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredFacilities.length === 0 && (
          <div className="p-md text-center font-body text-caption text-text-disabled">
            No facilities found matching "{searchQuery}".
          </div>
        )}

        {/* Live List Rendering */}
        {!isLoading &&
          !error &&
          filteredFacilities.map((facility) => {
            const isSelected = selectedFacilityId === facility.id;

            // Fetch matching style options directly from the type helper
            const statusOption = getFacilityAvailabilityOption(facility.status);
            const isSelectable = statusOption.selectable;

            return (
              <div
                key={facility.id}
                onClick={() => isSelectable && onSelectFacility(facility)}
                className={`flex items-center justify-between rounded-xl border p-sm transition-all ${
                  !isSelectable
                    ? "cursor-not-allowed border-gray-100 bg-gray-50/50 opacity-60"
                    : isSelected
                      ? "cursor-pointer border-emerald-500 bg-emerald-50/40 shadow-xs"
                      : "cursor-pointer border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-xs">
                  <span
                    className={`h-2 w-2 rounded-full ${statusOption.dotColor}`}
                  />
                  <div>
                    <p
                      className={`font-body text-body-xs font-bold ${
                        !isSelectable
                          ? "text-text-disabled"
                          : "text-text-primary"
                      }`}
                    >
                      {facility.name}
                    </p>
                    <p
                      className={`font-body text-caption ${statusOption.textColor}`}
                    >
                      {statusOption.label}
                      {facility.distanceKm !== undefined
                        ? ` · ${facility.distanceKm} km`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
