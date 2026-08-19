"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import ReferralHeader from "./ReferralHeader";
import PatientAndFacilityInfo from "./PatientAndFacilityInfo";
import ClinicalDetailsSection from "./ClinicalDetailsSection";
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

  const isReceivingFacility = referral.direction === "incoming";

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
    <div className="min-h-screen bg-[#F8FAFC] pb-[48px]">
      {/* Top Navigation Bar with Absolute Height */}
      <div className="sticky top-0 z-10 h-[56px] border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1024px] items-center justify-between px-[16px] sm:px-[24px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="group flex items-center gap-[8px] rounded-[8px] px-[10px] py-[6px] font-body text-[14px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-[16px] w-[16px] transition-transform group-hover:-translate-x-[2px]" />
            Back to Referrals
          </button>

          <div className="flex items-center gap-[8px] font-body text-[12px] font-semibold tracking-wider text-slate-400 uppercase">
            <FileText className="h-[16px] w-[16px] text-slate-400" />
            <span>Referral Details</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="mx-auto mt-[24px] flex max-w-[1024px] flex-col gap-[24px] px-[16px] sm:px-[24px]">
        {/* Header Card with Explicit Receiver Prop */}
        <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-sm">
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
            isReceiver={isReceivingFacility}
            onAccept={() => setIsAcceptModalOpen(true)}
            onDecline={() => setIsDeclineModalOpen(true)}
            onCancel={() => console.log("Cancelled referral:", referral.id)}
          />
        </div>

        {/* Details Sections */}
        <div className="flex flex-col gap-[24px]">
          <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-sm">
            <PatientAndFacilityInfo referral={referral} />
          </div>

          <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-sm">
            <ClinicalDetailsSection referral={referral} />
          </div>
        </div>
      </main>

      {/* Modals rendered conditionally for receiving facility */}
      {isReceivingFacility && (
        <>
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

          <DeclineReferralModal
            isOpen={isDeclineModalOpen}
            onClose={() => setIsDeclineModalOpen(false)}
            onConfirm={handleConfirmDecline}
            patientName={referral.patient.fullName}
            referenceNumber={referral.referenceNumber}
            referringFacilityName={referral.referringFacility.name}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </div>
  );
}
