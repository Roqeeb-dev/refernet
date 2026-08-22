import {
  AdminFacility,
  FacilityStatus,
} from "@/services/admin-facilities.service";
import { getStatusBadgeStyles } from "@/lib/utils";

interface FacilityDetailHeaderProps {
  facility: AdminFacility;
}

function getStatusLabel(status: FacilityStatus): string {
  switch (status) {
    case "approved":
      return "Active";
    case "pending_review":
      return "Pending";
    case "suspended":
      return "Suspended";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

export default function FacilityDetailHeader({
  facility,
}: FacilityDetailHeaderProps) {
  const statusLabel = getStatusLabel(facility.status);

  return (
    <div className="border-b border-gray-100 pb-md">
      <h1 className="font-heading text-heading-md font-bold text-text-primary">
        {facility.name}
      </h1>

      <div className="mt-xs flex flex-wrap items-center gap-xs">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-body text-caption font-medium ${getStatusBadgeStyles(
            statusLabel,
          )}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabel}
        </span>

        {/* Tier has no schema column yet — only render the badge
            once tier data actually exists. */}
        {facility.tier && (
          <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 font-body text-caption font-semibold text-text-secondary">
            {facility.tier}
          </span>
        )}

        <span className="font-body text-caption text-text-disabled">
          {facility.id.slice(0, 8).toUpperCase()}
        </span>

        <span className="font-body text-caption text-text-disabled">
          {facility.lastActive
            ? `Last active: ${facility.lastActive}`
            : "Last active: —"}
        </span>
      </div>
    </div>
  );
}
