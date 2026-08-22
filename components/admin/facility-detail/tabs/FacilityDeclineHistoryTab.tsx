"use client";

import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";

interface FacilityDeclineHistoryTabProps {
  facilityId: string;
}

// TODO: query referrals where this facility declined, using the
// decline reason/actionType fields from your referral decline flow
// (see declineReferral in referral.service.ts).
async function fetchDeclineHistory(facilityId: string) {
  return { declines: [] as { id: string; reason: string }[], error: null };
}

export default function FacilityDeclineHistoryTab({
  facilityId,
}: FacilityDeclineHistoryTabProps) {
  const [declines, setDeclines] = useState<{ id: string; reason: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchDeclineHistory(facilityId).then(({ declines }) => {
      setDeclines(declines);
      setIsLoading(false);
    });
  }, [facilityId]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 p-lg text-center font-body text-body-sm text-text-secondary">
        Loading decline history...
      </div>
    );
  }

  if (declines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 p-xl text-center">
        <XCircle className="h-8 w-8 text-text-disabled" />
        <p className="mt-sm font-body text-body-sm font-semibold text-text-primary">
          No declined referrals
        </p>
        <p className="mt-1 font-body text-caption text-text-disabled">
          Referrals this facility has declined will be listed here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 p-base">
      <ul className="divide-y divide-gray-100">
        {declines.map((item) => (
          <li
            key={item.id}
            className="py-sm font-body text-body-sm text-text-primary"
          >
            {item.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
