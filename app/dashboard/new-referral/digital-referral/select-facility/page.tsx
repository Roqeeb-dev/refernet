"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/shared/Button";
import FacilityCard from "@/components/new-referral/FacilityCard";
import EmptyFacilityState from "@/components/new-referral/EmptyFacilityState";
import { FACILITY_TYPE_OPTIONS } from "@/lib/facility";
import { MOCK_FACILITIES } from "@/lib/data";
// import { useDigitalReferralDraftStore } from "@/store/useDraftId";

const STATES = Array.from(
  new Set(MOCK_FACILITIES.map((f) => f.address.split(",").pop()!.trim())),
);

export default function SelectFacilityPage() {
  const router = useRouter();

  // Hook for digital store (uncomment when store is ready)
  // const setReceivingFacility = useDigitalReferralDraftStore(
  //   (s) => s.setReceivingFacility,
  // );

  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredFacilities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return MOCK_FACILITIES.filter((facility) => {
      const matchesSearch =
        !query ||
        facility.name.toLowerCase().includes(query) ||
        facility.address.toLowerCase().includes(query);

      const matchesState =
        stateFilter === "all" || facility.address.includes(stateFilter);

      const matchesType = typeFilter === "all" || facility.type === typeFilter;

      return matchesSearch && matchesState && matchesType;
    });
  }, [search, stateFilter, typeFilter]);

  function clearFilters() {
    setSearch("");
    setStateFilter("all");
    setTypeFilter("all");
  }

  function handleNext() {
    const facility = MOCK_FACILITIES.find((f) => f.id === selectedId);
    if (!facility) return;

    // Save selected receiving facility to store
    // setReceivingFacility(facility);

    router.push("/dashboard/new-referral/digital-referral/review");
  }

  return (
    <div className="flex flex-col gap-base">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-base top-1/2 -translate-y-1/2 text-text-disabled"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by facility name, state, or LGA..."
          className="h-tap-preferred w-full rounded-md border border-gray-200 bg-white pl-[40px] pr-base font-body text-body-md text-text-primary placeholder:text-text-disabled focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Filter Options */}
      <div className="grid grid-cols-2 gap-base">
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="h-tap-preferred w-full rounded-md border border-gray-200 bg-white px-base font-body text-body-sm text-text-primary focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All States</option>
          {STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-tap-preferred w-full rounded-md border border-gray-200 bg-white px-base font-body text-body-sm text-text-primary focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Types</option>
          {FACILITY_TYPE_OPTIONS.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Facility Results Cards */}
      <div className="grid gap-base sm:grid-cols-2">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              selected={facility.id === selectedId}
              onSelect={setSelectedId}
            />
          ))
        ) : (
          <EmptyFacilityState onClearFilters={clearFilters} />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-base flex flex-wrap items-center justify-between gap-sm">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/new-referral/digital/clinical-info")}
        >
          Back
        </Button>
        <Button
          variant="primary"
          type="button"
          disabled={!selectedId}
          onClick={handleNext}
          className="bg-green-700 hover:bg-green-800 disabled:opacity-50"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
