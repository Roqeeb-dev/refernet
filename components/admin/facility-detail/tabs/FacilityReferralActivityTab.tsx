"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface FacilityReferralActivityTabProps {
  facilityId: string;
}

// TODO: query `referrals` filtered by referring_facility_id OR
// receiving_facility_id === facilityId once you're ready to wire
// this in — the referral.service.ts select shape from earlier
// work is the right starting point.
async function fetchReferralActivity(facilityId: string) {
  return { activity: [] as { id: string; summary: string }[], error: null };
}

export default function FacilityReferralActivityTab({
  facilityId,
}: FacilityReferralActivityTabProps) {
  const [activity, setActivity] = useState<{ id: string; summary: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReferralActivity(facilityId).then(({ activity }) => {
      setActivity(activity);
      setIsLoading(false);
    });
  }, [facilityId]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 p-lg text-center font-body text-body-sm text-text-secondary">
        Loading referral activity...
      </div>
    );
  }

  if (activity.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 p-xl text-center">
        <Activity className="h-8 w-8 text-text-disabled" />
        <p className="mt-sm font-body text-body-sm font-semibold text-text-primary">
          No referral activity yet
        </p>
        <p className="mt-1 font-body text-caption text-text-disabled">
          Referrals sent or received by this facility will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 p-base">
      <ul className="divide-y divide-gray-100">
        {activity.map((item) => (
          <li
            key={item.id}
            className="py-sm font-body text-body-sm text-text-primary"
          >
            {item.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}
