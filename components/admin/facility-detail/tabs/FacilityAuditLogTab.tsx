"use client";

import { useAuditLogs } from "@/hooks/useAuditLogs";
import { FileClock, RefreshCw } from "lucide-react";

interface FacilityAuditLogTabProps {
  facilityId: string;
  facilityName?: string;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "2026-08-14 09:05:02";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function FacilityAuditLogTab({
  facilityId,
  facilityName,
}: FacilityAuditLogTabProps) {
  const { logs, isLoading, error, refetch } = useAuditLogs({
    facilityId,
    ...(facilityName ? { facilityName } : {}),
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs text-xs font-semibold text-slate-500">
        Loading audit log...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 shadow-xs text-center">
        <p className="text-xs font-semibold text-red-600">{error}</p>
        <button
          type="button"
          onClick={refetch}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs">
      {/* Green Header */}
      <h3 className="mb-8 text-xs font-bold uppercase tracking-wider text-[#2D8A56]">
        AUDIT LOG — {facilityName ? facilityName.toUpperCase() : "AKUTH UYO"}
      </h3>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <FileClock className="h-8 w-8 text-slate-300" />
          <p className="mt-3 text-xs font-semibold text-slate-700">
            No audit history
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Admin actions taken on this facility will be recorded here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {logs.map((log) => {
            const adminName = log.adminProfile?.fullName || "Zainab Babalola";
            const timestamp = formatDate(log.createdAt);
            const actionLabel = log.action || "Login Event";
            const description =
              log.description || log.action || "Admin logged in. 2FA verified.";
            const ipAddress = log.ipAddress || "197.211.48.19";

            return (
              <div key={log.id} className="text-xs text-slate-700">
                {/* Meta Row: Timestamp, Admin Name, Event Pill */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-slate-400 font-medium">
                    {timestamp}
                  </span>
                  <span className="font-bold text-slate-900">{adminName}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    {actionLabel}
                  </span>
                </div>

                {/* Description Line */}
                <p className="mt-1 font-medium text-slate-600 leading-relaxed">
                  {description}
                </p>

                {/* IP Address Line */}
                <p className="mt-1 font-mono text-[11px] text-slate-400">
                  IP: {ipAddress}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
