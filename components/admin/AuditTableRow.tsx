"use client";

import { AdminAuditLog } from "@/types/admin-audit";

interface AuditTableRowProps {
  log: AdminAuditLog;
}

function getActionBadgeStyle(action: string): string {
  switch (action.toLowerCase()) {
    case "approval":
      return "bg-emerald-100 text-emerald-800";
    case "suspension":
      return "bg-amber-100 text-amber-800";
    case "rejection":
      return "bg-red-100 text-red-700";
    case "document request":
      return "bg-blue-100 text-blue-700";
    case "login event":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatTimestamp(isoString: string): string {
  if (!isoString) return "—";
  const date = new Date(isoString);
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}`;
}

export default function AuditTableRow({ log }: AuditTableRowProps) {
  return (
    <tr className="hover:bg-gray-50/40 border-b border-gray-100 transition-colors">
      <td className="py-md px-sm font-mono text-[11px] text-text-secondary whitespace-nowrap">
        {formatTimestamp(log.createdAt)}
      </td>

      <td className="py-md px-sm">
        <div className="font-bold text-text-primary text-[12px]">
          {log.adminProfile?.fullName || "Unknown Admin"}
        </div>
        <div className="text-[10px] text-text-disabled capitalize">
          {log.adminProfile?.role?.replace("_", " ") || "N/A"}
        </div>
      </td>

      <td className="py-md px-sm">
        <span
          className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-bold ${getActionBadgeStyle(
            log.action,
          )}`}
        >
          {log.action}
        </span>
      </td>

      <td className="py-md px-sm text-[11px] font-medium text-text-primary">
        {log.facilityName || "—"}
      </td>

      <td className="py-md px-sm text-[11px] text-text-secondary max-w-xs leading-relaxed">
        {log.description}
      </td>

      <td className="py-md px-sm font-mono text-[10px] text-text-disabled whitespace-nowrap">
        {log.ipAddress || "—"}
      </td>
    </tr>
  );
}
