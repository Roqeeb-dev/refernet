"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import FacilityCard, {
  type Facility,
} from "@/components/emergency/FacilityCard";

const STATUS_FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Open & Accepting", value: "OPEN_ACCEPTING" },
  { label: "Limited Capacity", value: "LIMITED" },
  { label: "Emergency Only", value: "EMERGENCY_ONLY" },
] as const;

const TYPE_FILTERS = [
  { label: "All Types", value: "ALL" },
  { label: "PHC", value: "Primary Health Centre" },
  { label: "General Hospital", value: "General Hospital" },
  { label: "Specialist", value: "Specialist Hospital" },
  { label: "Tertiary", value: "Tertiary Hospital" },
] as const;

function FilterPill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-base py-xs font-body text-body-sm font-medium transition-colors ${
        active
          ? "bg-green-700 text-white"
          : "border border-gray-200 bg-white text-text-primary hover:border-green-200"
      }`}
    >
      {children}
    </button>
  );
}

export default function FacilityResultsClient({
  initialFacilities,
}: {
  initialFacilities: Facility[];
}) {
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_FILTERS)[number]["value"]>("ALL");
  const [typeFilter, setTypeFilter] =
    useState<(typeof TYPE_FILTERS)[number]["value"]>("ALL");
  const [search, setSearch] = useState("");

  const filteredFacilities = useMemo(() => {
    return initialFacilities.filter((facility) => {
      const matchesStatus =
        statusFilter === "ALL" || facility.status === statusFilter;
      const matchesType = typeFilter === "ALL" || facility.type === typeFilter;
      const matchesSearch = facility.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [initialFacilities, statusFilter, typeFilter, search]);

  return (
    <div className="mx-auto w-full max-w-6xl px-base py-xl sm:px-xl">
      <div className="rounded-lg border border-gray-100 bg-white p-base sm:p-lg">
        <div className="mb-base flex items-start justify-between gap-base">
          <div>
            <h2 className="font-display text-heading-md font-bold text-text-primary">
              Nearby Emergency Facilities
            </h2>
            <p className="font-body text-body-sm text-text-secondary">
              Showing {filteredFacilities.length} facilities near you
            </p>
          </div>
          <Link
            href="/find-care/emergency"
            className="shrink-0 font-body text-body-sm font-semibold text-green-700 hover:underline"
          >
            Change Location
          </Link>
        </div>

        <div className="mb-sm flex flex-wrap items-center gap-sm">
          <span className="mr-xs font-body text-overline font-semibold uppercase tracking-wide text-text-secondary">
            Status
          </span>
          {STATUS_FILTERS.map((filter) => (
            <FilterPill
              key={filter.value}
              active={statusFilter === filter.value}
              onClick={() => setStatusFilter(filter.value)}
            >
              {filter.label}
            </FilterPill>
          ))}
        </div>

        <div className="mb-base flex flex-wrap items-center gap-sm">
          <span className="mr-xs font-body text-overline font-semibold uppercase tracking-wide text-text-secondary">
            Type
          </span>
          {TYPE_FILTERS.map((filter) => (
            <FilterPill
              key={filter.value}
              active={typeFilter === filter.value}
              onClick={() => setTypeFilter(filter.value)}
            >
              {filter.label}
            </FilterPill>
          ))}
        </div>

        <div className="flex items-center gap-sm rounded-md border border-gray-200 py-xs pl-base pr-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="flex-1 bg-transparent font-body text-body-md text-text-primary placeholder:text-text-disabled focus:outline-none"
          />
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-900 text-white">
            <Search size={16} />
          </span>
        </div>
      </div>

      <div className="mt-lg flex flex-col gap-base">
        {filteredFacilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>
    </div>
  );
}
