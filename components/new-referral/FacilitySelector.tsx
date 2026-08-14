"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export interface Facility {
  id: string;
  name: string;
  status: "Accepting" | "Emergency Only" | "Unavailable";
  distance: string;
}

const MOCK_FACILITIES: Facility[] = [
  {
    id: "1",
    name: "Lagos Island General Hospital",
    status: "Accepting",
    distance: "2.3 km",
  },
  {
    id: "2",
    name: "Reddington Hospital",
    status: "Emergency Only",
    distance: "8.7 km",
  },
  {
    id: "3",
    name: "St Nicholas Hospital",
    status: "Accepting",
    distance: "12.4 km",
  },
  {
    id: "4",
    name: "UCH — University College Hospital",
    status: "Unavailable",
    distance: "134 km",
  },
  { id: "5", name: "Eko Hospital", status: "Accepting", distance: "3.9 km" },
];

interface FacilitySelectorProps {
  selectedFacilityId?: string;
  onSelectFacility: (facility: Facility) => void;
}

export default function FacilitySelector({
  selectedFacilityId,
  onSelectFacility,
}: FacilitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFacilities = MOCK_FACILITIES.filter((f) =>
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
          className="w-full rounded-lg border border-gray-200 bg-white py-xs pl-xl pr-sm font-body text-body-xs text-text-primary placeholder:text-text-disabled focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Facilities List */}
      <div className="mt-xs flex max-h-48 flex-col gap-xs overflow-y-auto pr-xs">
        {filteredFacilities.map((facility) => {
          const isSelected = selectedFacilityId === facility.id;
          const isUnavailable = facility.status === "Unavailable";

          let statusDotColor = "bg-emerald-500";
          let statusTextColor = "text-emerald-700";

          if (facility.status === "Emergency Only") {
            statusDotColor = "bg-amber-500";
            statusTextColor = "text-amber-700";
          } else if (isUnavailable) {
            statusDotColor = "bg-gray-300";
            statusTextColor = "text-gray-400";
          }

          return (
            <div
              key={facility.id}
              onClick={() => !isUnavailable && onSelectFacility(facility)}
              className={`flex items-center justify-between rounded-xl border p-sm transition-all ${
                isUnavailable
                  ? "cursor-not-allowed border-gray-100 bg-gray-50/50 opacity-60"
                  : isSelected
                    ? "cursor-pointer border-emerald-500 bg-emerald-50/40 shadow-xs"
                    : "cursor-pointer border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-xs">
                <span className={`h-2 w-2 rounded-full ${statusDotColor}`} />
                <div>
                  <p
                    className={`font-body text-body-xs font-bold ${
                      isUnavailable ? "text-text-disabled" : "text-text-primary"
                    }`}
                  >
                    {facility.name}
                  </p>
                  <p className={`font-body text-caption ${statusTextColor}`}>
                    {facility.status} · {facility.distance}
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
