"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReferralSubmittedView from "@/components/new-referral/ReferralSubmittedView";

function SubmittedPageContent() {
  const searchParams = useSearchParams();

  const typeParam = searchParams?.get("type");
  const type: "paper" | "digital" = typeParam === "paper" ? "paper" : "digital";
  const refNumber = searchParams?.get("ref") || "RN-8304";

  const submittedData = {
    type,
    referenceNumber: refNumber,
    patientName: type === "digital" ? "Babalola Zainab" : undefined,
    facilityName: "Lagos University Teaching Hospital",
    submittedAt: "12 Aug 2026, 12:16",
    fileName: type === "paper" ? "rejoice isaiah.pdf" : undefined,
    referralId: refNumber,
  };

  return <ReferralSubmittedView data={submittedData} />;
}

export default function SubmittedPage() {
  return (
    <Suspense fallback={<div className="p-base text-center">Loading...</div>}>
      <SubmittedPageContent />
    </Suspense>
  );
}
