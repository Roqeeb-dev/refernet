"use client";

import { useEffect, useState, useCallback } from "react";
import { Download, Bell, ScrollText } from "lucide-react";
import Button from "@/components/shared/Button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { getAuditLogs } from "@/services/admin-audit.service";
import { AdminAuditLog } from "@/types/admin-audit";
import AuditTableRow from "@/components/admin/AuditTableRow";
import AuditFilters from "@/components/admin/AuditFilters";
import {
  PageLoadingState,
  PageErrorState,
  PageEmptyState,
} from "@/components/admin/AdminPageStates";

function getInitials(name: string): string {
  if (!name) return "AD";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

export default function AuditLogPage() {
  const { admin: currentAdmin } = useAdminAuth();

  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedAdminId, setSelectedAdminId] = useState("all");
  const [selectedAction, setSelectedAction] = useState("all");
  const [facilityQuery, setFacilityQuery] = useState("");

  const loadLogs = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    const { logs: data, error } = await getAuditLogs({
      adminId: selectedAdminId,
      action: selectedAction,
      facilityQuery: facilityQuery.trim(),
    });

    if (error) {
      setErrorMsg(error);
    } else {
      setLogs(data);
    }
    setIsLoading(false);
  }, [selectedAdminId, selectedAction, facilityQuery]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  // Unique admin options mapped by ID
  const adminOptions = Array.from(
    new Map(
      logs
        .filter((l) => l.adminId && l.adminProfile?.fullName)
        .map((l) => [l.adminId, l.adminProfile!.fullName]),
    ).entries(),
  ).map(([id, name]) => ({ id, name }));

  const handleExportCSV = () => {
    if (!logs.length) return;

    const headers = [
      "Timestamp",
      "Admin",
      "Role",
      "Action",
      "Facility",
      "Description",
      "IP Address",
    ];
    const rows = logs.map((l) => [
      `"${l.createdAt}"`,
      `"${l.adminProfile?.fullName || ""}"`,
      `"${l.adminProfile?.role || ""}"`,
      `"${l.action}"`,
      `"${l.facilityName || ""}"`,
      `"${l.description.replace(/"/g, '""')}"`,
      `"${l.ipAddress || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `refernet_audit_log_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-md font-body">
      <div className="mb-md flex items-center justify-between border-b border-gray-200 pb-sm">
        <h1 className="font-heading text-body-md font-bold text-text-primary">
          Audit Log
        </h1>
        <div className="flex items-center gap-sm">
          <button
            type="button"
            className="relative rounded-xl border border-gray-200 bg-white p-xs text-text-secondary hover:bg-gray-50"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 font-bold text-white text-[11px]">
            {getInitials(currentAdmin?.fullName || "Admin")}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-md shadow-xs">
        <div className="mb-md flex items-center justify-between">
          <div>
            <h2 className="font-heading text-body-lg font-bold text-text-primary">
              Audit Log
            </h2>
            <p className="mt-2xs text-[12px] text-text-secondary">
              Complete record of all admin actions on the ReferNet platform.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleExportCSV}
            disabled={isLoading || logs.length === 0}
            className="flex items-center gap-xs rounded-xl border border-gray-200 px-md py-2 text-[11px] font-bold text-text-primary hover:bg-gray-50 disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>

        <AuditFilters
          selectedAdminId={selectedAdminId}
          setSelectedAdminId={setSelectedAdminId}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          facilityQuery={facilityQuery}
          setFacilityQuery={setFacilityQuery}
          adminOptions={adminOptions}
        />

        {isLoading && (
          <PageLoadingState message="Loading Audit Logs Entries..." />
        )}
        {!isLoading && errorMsg && (
          <PageErrorState
            title="Failed to load audit log"
            errorMsg={errorMsg}
            onRetry={loadLogs}
          />
        )}
        {!isLoading && !errorMsg && logs.length === 0 && (
          <PageEmptyState
            title="No Audit Logs Found"
            searchQuery={facilityQuery}
            icon={ScrollText}
          />
        )}

        {!isLoading && !errorMsg && logs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  <th className="py-2xs px-sm">TIMESTAMP</th>
                  <th className="py-2xs px-sm">ADMIN</th>
                  <th className="py-2xs px-sm">ACTION</th>
                  <th className="py-2xs px-sm">FACILITY</th>
                  <th className="py-2xs px-sm">DESCRIPTION</th>
                  <th className="py-2xs px-sm">IP ADDRESS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log) => (
                  <AuditTableRow key={log.id} log={log} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
