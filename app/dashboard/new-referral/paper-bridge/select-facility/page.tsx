"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/shared/Button";
import FacilityCard, {
  type Facility,
} from "@/components/new-referral/FacilityCard";
import EmptyFacilityState from "@/components/new-referral/EmptyFacilityState";

// TODO: replace with a real facility search query (Supabase) once the
// facility directory exists. Distances/status/timestamps are all mock.
const MOCK_FACILITIES: Facility[] = [
  {
    id: "1",
    name: "Lagos Island General Hospital",
    type: "General Hospital",
    distanceKm: 2.3,
    address: "Lagos Island, Lagos",
    updatedMinutesAgo: 8,
    status: "accepting",
  },
  {
    id: "2",
    name: "Lagos University Teaching Hospital",
    type: "Teaching Hospital",
    distanceKm: 5.1,
    address: "Idi-Araba, Lagos",
    updatedMinutesAgo: 12,
    status: "limited",
    note: "Limited beds — confirm before sending",
  },
  {
    id: "3",
    name: "Reddington Hospital",
    type: "Private Hospital",
    distanceKm: 8.7,
    address: "Victoria Island, Lagos",
    updatedMinutesAgo: 3,
    status: "emergency-only",
    note: "Only emergency cases accepted",
  },
  {
    id: "4",
    name: "St Nicholas Hospital",
    type: "Private Hospital",
    distanceKm: 12.4,
    address: "Lagos Island, Lagos",
    updatedMinutesAgo: 6,
    status: "accepting",
  },
  {
    id: "5",
    name: "UCH — University College Hospital",
    type: "Teaching Hospital",
    distanceKm: 134,
    address: "Ibadan North, Oyo",
    updatedMinutesAgo: 60,
    status: "unavailable",
  },
  {
    id: "6",
    name: "Eko Hospital",
    type: "Private Hospital",
    distanceKm: 3.9,
    address: "Surulere, Lagos",
    updatedMinutesAgo: 2,
    status: "accepting",
  },
];

const STATES = Array.from(
  new Set(MOCK_FACILITIES.map((f) => f.address.split(",").pop()!.trim())),
);
const TYPES = Array.from(new Set(MOCK_FACILITIES.map((f) => f.type)));

export default function SelectFacilityPage() {
  const router = useRouter();

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
    if (!selectedId) return;
    // TODO: persist selectedId onto the referral draft (see
    // usePaperReferralDraftStore) before advancing to Review & Confirm.
    router.push("/dashboard/referrals/new/paper-bridge/review");
  }

  return (
    <div className="flex flex-col gap-base">
      {/* Search */}
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

      {/* Filters */}
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
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
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

      {/* Footer actions */}
      <div className="mt-base flex flex-wrap items-center justify-between gap-sm">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          variant="primary"
          type="button"
          disabled={!selectedId}
          onClick={handleNext}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
