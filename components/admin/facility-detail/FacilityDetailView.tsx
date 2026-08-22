"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getFacilityById,
  AdminFacility,
} from "@/services/admin-facilities.service";
import FacilityDetailHeader from "./FacilityDetailHeader";
import FacilityDetailTabs, { FacilityTabKey } from "./FacilityDetailTabs";
import FacilityManagementPanel from "./FacilityManagementPanel";
import FacilityProfileTab from "./tabs/FacilityProfileTab";
import FacilityDocumentsTab from "./tabs/FacilityDocumentsTab";
import FacilityReferralActivityTab from "./tabs/FacilityReferralActivityTab";
import FacilityDeclineHistoryTab from "./tabs/FacilityDeclineHistoryTab";
import FacilityAdminNotesTab from "./tabs/FacilityAdminNotesTab";
import FacilityAuditLogTab from "./tabs/FacilityAuditLogTab";
import {
  PageLoadingState,
  PageErrorState,
} from "@/components/admin/AdminPageStates";

interface FacilityDetailViewProps {
  facilityId: string;
}

export default function FacilityDetailView({
  facilityId,
}: FacilityDetailViewProps) {
  const [facility, setFacility] = useState<AdminFacility | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FacilityTabKey>("profile");

  async function loadFacility() {
    setIsLoading(true);
    setErrorMsg(null);

    const { facility: data, error } = await getFacilityById(facilityId);

    if (error || !data) {
      setErrorMsg(error ?? "Facility not found.");
    } else {
      setFacility(data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadFacility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-8">
        <PageLoadingState message="Loading facility..." />
      </div>
    );
  }

  if (errorMsg || !facility) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-8">
        <PageErrorState
          title="Failed to load facility"
          errorMsg={errorMsg ?? "Unknown error."}
          onRetry={loadFacility}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-3 font-sans">
      {/* Navigation Link */}
      <Link
        href="/admin/facilities"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Facilities
      </Link>

      {/* Header Info */}
      <FacilityDetailHeader facility={facility} />

      {/* Navigation Tabs */}
      <FacilityDetailTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Main Content Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          {activeTab === "profile" && (
            <FacilityProfileTab
              facility={facility}
              onFacilityUpdated={loadFacility}
            />
          )}
          {activeTab === "documents" && (
            <FacilityDocumentsTab facilityId={facility.id} />
          )}
          {activeTab === "referral-activity" && (
            <FacilityReferralActivityTab facilityId={facility.id} />
          )}
          {activeTab === "decline-history" && (
            <FacilityDeclineHistoryTab facilityId={facility.id} />
          )}
          {activeTab === "admin-notes" && (
            <FacilityAdminNotesTab facilityId={facility.id} />
          )}
          {activeTab === "audit-log" && (
            <FacilityAuditLogTab facilityId={facility.id} />
          )}
        </div>

        {/* Right Action Panel */}
        <FacilityManagementPanel
          facility={facility}
          onStatusChanged={loadFacility}
        />
      </div>
    </div>
  );
}
