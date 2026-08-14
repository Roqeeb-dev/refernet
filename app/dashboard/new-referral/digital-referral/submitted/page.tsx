import ReferralSubmittedView from "@/components/new-referral/ReferralSubmittedView";

export default function DigitalSubmittedPage() {
  const mockDigitalData = {
    type: "digital" as const,
    referenceNumber: "RN-8304",
    patientName: "Babalola Zainab",
    facilityName: "Lagos University Teaching Hospital",
    submittedAt: "12 Aug 2026, 12:16",
    referralId: "8304",
  };

  return <ReferralSubmittedView data={mockDigitalData} />;
}
