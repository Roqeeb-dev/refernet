"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReferralFilterTabs from "@/components/dashboard/ReferralFilterTabs";
import ReferralsTable, {
  type ReferralRow,
} from "@/components/dashboard/ReferralsTable";
import ReferralEmptyState from "@/components/dashboard/ReferralEmptyState";
import ReferralLoadingState from "@/components/dashboard/ReferralLoadingState";
import ReferralErrorState from "@/components/dashboard/ReferralErrorState";
import { getIncomingReferrals } from "@/services/referral.service";

const CLOSED_GROUP: ReferralRow["status"][] = ["closed", "declined"];

export default function IncomingReferralsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [referrals, setReferrals] = useState<ReferralRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferrals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: fetchError } = await getIncomingReferrals();
    if (fetchError) {
      setError(fetchError);
    } else {
      setReferrals(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  const counts = useMemo(() => {
    return {
      all: referrals.length,
      new: referrals.filter((r) => r.status === "new").length,
      accepted: referrals.filter((r) => r.status === "accepted").length,
      arrived: referrals.filter((r) => r.status === "arrived").length,
      closed: referrals.filter((r) => CLOSED_GROUP.includes(r.status)).length,
    };
  }, [referrals]);

  const filteredReferrals = useMemo(() => {
    if (activeTab === "all") return referrals;
    if (activeTab === "closed") {
      return referrals.filter((r) => CLOSED_GROUP.includes(r.status));
    }
    return referrals.filter((r) => r.status === activeTab);
  }, [activeTab, referrals]);

  const newCount = counts.new;

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-sm">
        <h1 className="font-display text-heading-lg font-bold text-text-primary">
          Incoming Referrals
        </h1>
        {newCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-info-light px-base py-xs font-body text-caption font-semibold text-info">
            {newCount} New
          </span>
        )}
      </div>

      <ReferralFilterTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { value: "all", label: "All", count: counts.all },
          { value: "new", label: "New", count: counts.new },
          { value: "accepted", label: "Accepted", count: counts.accepted },
          { value: "arrived", label: "Arrived", count: counts.arrived },
          { value: "closed", label: "Closed", count: counts.closed },
        ]}
      />

      {isLoading ? (
        <ReferralLoadingState />
      ) : error ? (
        <ReferralErrorState message={error} onRetry={fetchReferrals} />
      ) : filteredReferrals.length === 0 ? (
        <ReferralEmptyState
          activeTab={activeTab}
          title="No incoming referrals"
          description={
            activeTab === "all"
              ? "There are no incoming referrals registered for your facility yet."
              : `There are currently no incoming referrals marked as "${activeTab}".`
          }
          onRefresh={fetchReferrals}
        />
      ) : (
        <ReferralsTable
          referrals={filteredReferrals}
          facilityColumnLabel="Referring Facility"
        />
      )}
    </div>
  );
}
