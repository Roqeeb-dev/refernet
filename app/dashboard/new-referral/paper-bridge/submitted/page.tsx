import ReferralSubmittedView from "@/components/new-referral/ReferralSubmittedView";

export default function PaperSubmittedPage() {
  const mockPaperData = {
    type: "paper" as const,
    referenceNumber: "RN-PAPER-8257",
    facilityName: "Lagos Island General Hospital",
    submittedAt: "11 Aug 2026, 13:54",
    fileName: "rejoice isaiah.pdf",
    referralId: "8257",
  };

  return <ReferralSubmittedView data={mockPaperData} />;
}
