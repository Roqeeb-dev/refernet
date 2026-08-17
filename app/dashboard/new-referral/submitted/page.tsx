"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReferralSubmittedView from "@/components/new-referral/ReferralSubmittedView";
import { getReferralById } from "@/services/referral.service";
import type { DetailedReferral } from "@/lib/referral-types";

function SubmittedPageContent() {
  const searchParams = useSearchParams();
  const referralId = searchParams?.get("id");

  const [referral, setReferral] = useState<DetailedReferral | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!referralId) {
      setError("No referral ID provided.");
      setLoading(false);
      return;
    }

    async function fetchReferral() {
      try {
        setLoading(true);
        const data = await getReferralById(referralId!);
        if (!data) {
          setError("Referral record not found.");
        } else {
          setReferral(data);
        }
      } catch (err) {
        setError("Failed to fetch referral details.");
      } finally {
        setLoading(false);
      }
    }

    fetchReferral();
  }, [referralId]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6 text-sm text-gray-500">
        Loading referral details...
      </div>
    );
  }

  if (error || !referral) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 p-6 text-center text-sm text-red-600">
        <p className="font-semibold">{error || "Something went wrong."}</p>
      </div>
    );
  }

  // Determine paper vs digital by inspecting attachments array
  const hasAttachments =
    referral.attachments && referral.attachments.length > 0;
  const isPaper = hasAttachments;
  const firstAttachmentName = hasAttachments
    ? referral.attachments[0].name
    : undefined;

  // Format receivedTime safely
  const formattedDate = referral.receivedTime
    ? new Date(referral.receivedTime).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "N/A";

  const submittedData = {
    type: isPaper ? ("paper" as const) : ("digital" as const),
    referenceNumber: referral.referenceNumber,
    patientName: referral.patient.fullName,
    facilityName: referral.receivingFacility.name,
    submittedAt: formattedDate,
    fileName: firstAttachmentName,
    referralId: referral.id,
  };

  return <ReferralSubmittedView data={submittedData} />;
}

export default function SubmittedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center p-6 text-sm text-gray-500">
          Loading...
        </div>
      }
    >
      <SubmittedPageContent />
    </Suspense>
  );
}
