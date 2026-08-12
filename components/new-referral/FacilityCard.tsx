"use client";

import { Check } from "lucide-react";
import {
  getFacilityAvailabilityOption,
  type FacilityAvailability,
} from "@/lib/facilityStatus";

export interface Facility {
  id: string;
  name: string;
  type: string;
  distanceKm: number;
  address: string;
  updatedMinutesAgo: number;
  status: FacilityAvailability;
  note?: string;
}

interface FacilityCardProps {
  facility: Facility;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function FacilityCard({
  facility,
  selected,
  onSelect,
}: FacilityCardProps) {
  const statusOption = getFacilityAvailabilityOption(facility.status);
  const disabled = !statusOption.selectable;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onSelect(facility.id)}
      className={`relative flex flex-col gap-sm rounded-xl border p-base text-left transition-colors ${
        disabled
          ? "cursor-not-allowed border-gray-100 bg-gray-50 opacity-60"
          : selected
            ? "border-green-500 bg-green-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-green-200 hover:bg-green-50/30"
      }`}
    >
      {selected && (
        <span className="absolute right-base top-base flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
          <Check size={12} className="text-white" />
        </span>
      )}

      <span
        className={`inline-flex w-fit items-center gap-xs rounded-full px-sm py-[2px] font-body text-caption font-semibold ${statusOption.bg} ${statusOption.text}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${statusOption.dotColor}`} />
        {statusOption.label}
      </span>

      <div>
        <p className="font-body text-body-md font-bold text-text-primary">
          {facility.name}
        </p>
        <p className="font-body text-caption text-text-secondary">
          {facility.type} · {facility.distanceKm} km
        </p>
        <p className="font-body text-caption text-text-disabled">
          {facility.address} · Updated {facility.updatedMinutesAgo} min ago
        </p>
      </div>

      {facility.note && (
        <p
          className={`rounded-md px-sm py-xs font-body text-caption font-medium ${statusOption.bg} ${statusOption.text}`}
        >
          {facility.note}
        </p>
      )}

      {disabled && (
        <span className="font-body text-caption text-text-disabled">
          Cannot be selected
        </span>
      )}
    </button>
  );
}
