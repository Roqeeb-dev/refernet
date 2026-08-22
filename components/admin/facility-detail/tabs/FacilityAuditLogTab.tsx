"use client";

import { useEffect, useState } from "react";
import { FileClock } from "lucide-react";

interface FacilityAuditLogTabProps {
  facilityId: string;
}

// TODO: query an audit_log table (facility_id, admin_id, action,
// timestamp) once it exists — reviewed_by/reviewed_at on
// facility_registrations only captures the most recent review action,
// not a full history, so a dedicated log table is worth adding if you
// want this tab to be meaningful.
async function fetchAuditLog(facilityId: string) {
  return {
    entries: [] as { id: string; action: string; timestamp: string }[],
    error: null,
  };
}

export default function FacilityAuditLogTab({
  facilityId,
}: FacilityAuditLogTabProps) {
  const [entries, setEntries] = useState<
    { id: string; action: string; timestamp: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAuditLog(facilityId).then(({ entries }) => {
      setEntries(entries);
      setIsLoading(false);
    });
  }, [facilityId]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 p-lg text-center font-body text-body-sm text-text-secondary">
        Loading audit log...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 p-xl text-center">
        <FileClock className="h-8 w-8 text-text-disabled" />
        <p className="mt-sm font-body text-body-sm font-semibold text-text-primary">
          No audit history
        </p>
        <p className="mt-1 font-body text-caption text-text-disabled">
          Admin actions taken on this facility will be recorded here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 p-base">
      <ul className="divide-y divide-gray-100">
        {entries.map((entry) => (
          <li key={entry.id} className="py-sm">
            <p className="font-body text-body-sm text-text-primary">
              {entry.action}
            </p>
            <p className="mt-0.5 font-body text-caption text-text-disabled">
              {entry.timestamp}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
