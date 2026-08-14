"use client";

import ReferralHeader from "./ReferralHeader";
import PatientAndFacilityInfo from "./PatientAndFacilityInfo";
import ClinicalDetailsSection from "./ClinicalDetailsSection";
import ReferralTimelineSidebar from "./ReferralTimelineSidebar";
import { DetailedReferral } from "@/lib/referral-types";

export default function ReferralDetailView({
  referral,
}: {
  referral: DetailedReferral;
}) {
  return (
    <div className="flex flex-col gap-base">
      {/* 1. Header Card */}
      <ReferralHeader
        referenceNumber={referral.referenceNumber}
        direction={referral.direction}
        status={referral.status}
        urgency={referral.urgency}
        facilityName={
          referral.direction === "incoming"
            ? referral.referringFacility.name
            : referral.receivingFacility.name
        }
        receivedTime={referral.receivedTime}
        onAccept={() => console.log("Accepting referral:", referral.id)}
        onDecline={() => console.log("Declined referral:", referral.id)}
        onCancel={() => console.log("Cancelled referral:", referral.id)}
      />

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 gap-base lg:grid-cols-[1fr_320px]">
        {/* Left Column: Details */}
        <div className="flex flex-col gap-base">
          <PatientAndFacilityInfo referral={referral} />
          <ClinicalDetailsSection referral={referral} />
        </div>

        {/* Right Column: Timeline Sidebar */}
        <div>
          <ReferralTimelineSidebar timeline={referral.timeline} />
        </div>
      </div>
    </div>
  );
}
