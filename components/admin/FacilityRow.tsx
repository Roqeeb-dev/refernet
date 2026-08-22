import {
  AdminFacility,
  FacilityStatus,
} from "@/services/admin-facilities.service";
import { getStatusBadgeStyles } from "@/lib/utils";
import Link from "next/link";
import Button from "../shared/Button";

interface FacilityRowProps {
  facility: AdminFacility;
  actionLoadingId: string | null;
  onToggleSuspend: (facility: AdminFacility) => void;
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

function formatDate(value: string): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function FacilityRow({
  facility,
  actionLoadingId,
  onToggleSuspend,
}: FacilityRowProps) {
  const statusLabel = getStatusLabel(facility.status);
  const isSuspended = facility.status === "suspended";

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="py-sm px-sm font-bold text-text-primary font-heading">
        {facility.name}
      </td>
      <td className="py-sm px-sm text-text-secondary">
        {facility.type ?? "—"}
      </td>
      <td className="py-sm px-sm text-text-primary">
        {facility.state ?? "—"}
        {facility.lga && (
          <span className="text-text-secondary font-normal">
            {" · "}
            {facility.lga}
          </span>
        )}
      </td>
      <td className="py-sm px-sm text-text-secondary">
        {formatDate(facility.registeredAt)}
      </td>
      <td className="py-sm px-sm">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${getStatusBadgeStyles(
            statusLabel,
          )}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabel}
        </span>
      </td>
      <td className="py-sm px-sm">
        <div className="flex items-center justify-center gap-xs">
          <Link href={`/admin/facilities/${facility.id}`}>
            <Button
              variant="secondary"
              className="h-7 rounded-lg bg-emerald-800 px-3 text-[11px] font-semibold text-white hover:bg-emerald-900 border-none"
            >
              View
            </Button>
          </Link>

          {(facility.status === "approved" || isSuspended) && (
            <Button
              variant="secondary"
              onClick={() => onToggleSuspend(facility)}
              disabled={actionLoadingId === facility.id}
              className={`h-7 rounded-lg border px-3 text-[11px] font-semibold transition-colors ${
                isSuspended
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                  : "border-amber-200 bg-amber-50/60 text-amber-800 hover:bg-amber-100/80"
              }`}
            >
              {actionLoadingId === facility.id
                ? "..."
                : isSuspended
                  ? "Unsuspend"
                  : "Suspend"}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
