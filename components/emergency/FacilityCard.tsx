import { Phone, Navigation } from "lucide-react";
import Button from "@/components/shared/Button";
import type { Facility, FacilityStatus } from "@/lib/facility";

const STATUS_CONFIG: Record<
  FacilityStatus,
  { label: string; badgeClass: string }
> = {
  accepting: {
    label: "Open & Accepting",
    badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  limited: {
    label: "Limited Capacity",
    badgeClass: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  emergency_only: {
    label: "Emergency Only",
    badgeClass: "bg-orange-50 text-orange-700 border border-orange-200",
  },
  unavailable: {
    label: "Unavailable",
    badgeClass: "bg-rose-50 text-rose-700 border border-rose-200",
  },
};

export default function FacilityCard({ facility }: { facility: Facility }) {
  const statusKey = STATUS_CONFIG[facility.status]
    ? facility.status
    : "accepting";
  const status = STATUS_CONFIG[statusKey];

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">
      <div>
        {/* Top Meta: Badge & Distance */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 font-body text-xs font-semibold ${status.badgeClass}`}
          >
            {status.label}
          </span>
          <span className="shrink-0 font-body text-xs font-medium text-gray-500">
            {facility.distanceKm} km
          </span>
        </div>

        {/* Facility Details */}
        <h3 className="font-display text-lg font-bold text-gray-900 leading-snug">
          {facility.name}
        </h3>
        <p className="mt-0.5 mb-2 font-body text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {facility.type}
        </p>

        <p className="font-body text-sm text-gray-600 leading-relaxed">
          {facility.address}
        </p>
        <a
          href={`tel:${facility.phone}`}
          className="mt-1 inline-block font-body text-sm font-medium text-emerald-700 hover:underline"
        >
          {facility.phone}
        </a>
        <p className="mt-2 font-body text-xs text-gray-400">
          Status updated: {facility.lastUpdated}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center gap-1.5 text-xs font-medium border-gray-300"
          >
            <Navigation size={14} />
            Directions
          </Button>
          <a href={`tel:${facility.phone}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium border-gray-300"
            >
              <Phone size={14} />
              Call
            </Button>
          </a>
        </div>

        <Button
          variant="primary"
          fullWidth
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-sm"
        >
          Alert Hospital
        </Button>
      </div>
    </div>
  );
}
