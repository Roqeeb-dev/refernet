"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReferralHeader from "./ReferralHeader";
import PatientAndFacilityInfo from "./PatientAndFacilityInfo";
import ClinicalDetailsSection from "./ClinicalDetailsSection";
import ReferralTimelineSidebar from "./ReferralTimelineSidebar";
import AcceptReferralModal from "./AcceptReferralModal";
import DeclineReferralModal from "./DeclineReferralModal";
import { DetailedReferral } from "@/lib/referral-types";
import { acceptReferral, declineReferral } from "@/services/referral.service";

export default function ReferralDetailView({
  referral: initialReferral,
}: {
  referral: DetailedReferral;
}) {
  const router = useRouter();
  const [referral, setReferral] = useState<DetailedReferral>(initialReferral);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Accept Confirmation
  const handleConfirmAccept = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await acceptReferral(referral.id);

      if (error) {
        window.alert(`Failed to accept referral: ${error}`);
        return;
      }

      if (data) {
        setReferral(data);
      }
      setIsAcceptModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Decline Confirmation
  const handleConfirmDecline = async (
    reason: string,
    actionType: "return" | "re-refer",
  ) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await declineReferral(
        referral.id,
        reason,
        actionType,
      );

      if (error) {
        window.alert(`Failed to decline referral: ${error}`);
        return;
      }

      if (data) {
        setReferral(data);
      }
      setIsDeclineModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-base bg-gray-100 p-2 md:p-6">
      {/* 1. Header Card with Action Trigger Handlers */}
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
        onAccept={() => setIsAcceptModalOpen(true)}
        onDecline={() => setIsDeclineModalOpen(true)}
        onCancel={() => console.log("Cancelled referral:", referral.id)}
      />

      {/* 2. Main Details & Sidebar Grid */}
      <div className="grid grid-cols-1 gap-base lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-base">
          <PatientAndFacilityInfo referral={referral} />
          <ClinicalDetailsSection referral={referral} />
        </div>
        <div>
          <ReferralTimelineSidebar timeline={referral.timeline} />
        </div>
      </div>

      {/* 3. Accept Modal */}
      <AcceptReferralModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        onConfirm={handleConfirmAccept}
        patientName={referral.patient.fullName}
        patientAge={referral.patient.age}
        patientSex={referral.patient.sex}
        urgency={referral.urgency}
        referenceNumber={referral.referenceNumber}
        isSubmitting={isSubmitting}
      />

      {/* 4. Decline Modal */}
      <DeclineReferralModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onConfirm={handleConfirmDecline}
        patientName={referral.patient.fullName}
        referenceNumber={referral.referenceNumber}
        referringFacilityName={referral.referringFacility.name}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
