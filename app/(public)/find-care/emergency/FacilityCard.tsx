import { Phone } from "lucide-react";
import Button from "@/components/shared/Button";

export type FacilityStatus =
  | "OPEN_ACCEPTING"
  | "LIMITED"
  | "EMERGENCY_ONLY"
  | "UNAVAILABLE";

export interface Facility {
  id: string;
  name: string;
  type: string;
  status: FacilityStatus;
  address: string;
  phone: string;
  distanceKm: number;
  lastUpdated: string;
}

const STATUS_CONFIG: Record<
  FacilityStatus,
  { label: string; badgeClass: string }
> = {
  OPEN_ACCEPTING: {
    label: "Open & Accepting",
    badgeClass: "bg-green-100 text-green-700",
  },
  LIMITED: {
    label: "Limited Capacity",
    badgeClass: "bg-urgent-light text-urgent",
  },
  EMERGENCY_ONLY: {
    label: "Emergency Only",
    badgeClass: "bg-[#FDECE0] text-status-emergency-only",
  },
  UNAVAILABLE: {
    label: "Unavailable",
    badgeClass: "bg-emergency-light text-emergency",
  },
};

export default function FacilityCard({ facility }: { facility: Facility }) {
  const status = STATUS_CONFIG[facility.status];

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-base">
      <div className="mb-sm flex items-start justify-between gap-sm">
        <span
          className={`inline-flex items-center rounded-full px-base py-xs font-body text-body-sm font-semibold ${status.badgeClass}`}
        >
          {status.label}
        </span>
        <span className="shrink-0 font-body text-body-sm text-text-secondary">
          {facility.distanceKm} km
        </span>
      </div>

      <h3 className="font-display text-heading-sm font-bold text-text-primary">
        {facility.name}
      </h3>
      <p className="mb-sm font-body text-overline uppercase tracking-wide text-text-secondary">
        {facility.type}
      </p>

      <p className="font-body text-body-sm text-text-secondary">
        {facility.address}
      </p>
      <a
        href={`tel:${facility.phone}`}
        className="font-body text-body-sm font-medium text-green-700 hover:underline"
      >
        {facility.phone}
      </a>
      <p className="mt-xs font-body text-caption text-text-disabled">
        Status updated: {facility.lastUpdated}
      </p>

      <div className="mt-base flex gap-sm">
        <Button variant="outline" size="sm" fullWidth>
          Directions
        </Button>
        <a href={`tel:${facility.phone}`} className="flex-1">
          <Button variant="outline" size="sm" fullWidth>
            <Phone size={14} />
            Call
          </Button>
        </a>
      </div>

      <Button
        variant="primary"
        fullWidth
        className="mt-sm bg-status-emergency-only hover:bg-emergency"
      >
        Alert Hospital
      </Button>
    </div>
  );
}
