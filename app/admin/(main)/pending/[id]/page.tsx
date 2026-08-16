"use client";

import FacilityHeader from "@/components/admin/FacilityHeader";
import FacilityDetailsCard from "@/components/admin/FacilityDetailsCard";
import AccountHolderCard from "@/components/admin/AccountHolderCard";
import VerificationDocCard from "@/components/admin/VerificationDocCard";
import AutomatedChecksCard from "@/components/admin/AutomatedChecksCard";
import AdminNotesCard from "@/components/admin/AdminNotesCard";
import ReviewActionCard from "@/components/admin/ReviewActionCard";

export default function PendingDetailPage() {
  return (
    <div className="flex flex-col gap-md">
      {/* Dynamic Header */}
      <FacilityHeader />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        {/* Main Column */}
        <div className="flex flex-col gap-md lg:col-span-2">
          <FacilityDetailsCard />
          <AccountHolderCard />
          <VerificationDocCard />
          <AutomatedChecksCard />
          <AdminNotesCard />
        </div>

        {/* Sticky Action Sidebar */}
        <div className="lg:col-span-1">
          <ReviewActionCard />
        </div>
      </div>
    </div>
  );
}
