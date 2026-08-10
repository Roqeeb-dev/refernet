import LegalPageLayout, {
  LegalSection,
} from "@/components/legal/LegalPageLayout";

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing or using ReferNet — including the Hospital Finder and the Healthcare Facility Referral Portal — you agree to these Terms of Service. If you're using ReferNet on behalf of a healthcare facility, you confirm you have the authority to bind that facility to these terms.",
    ],
  },
  {
    heading: "2. Emergency Disclaimer",
    paragraphs: [
      "ReferNet helps you find nearby facilities and, where available, contact them directly. ReferNet is not an emergency response service and does not dispatch ambulances.",
      "If you believe you are experiencing a medical emergency, call your local emergency services or go to the nearest emergency facility immediately. Do not rely solely on ReferNet to determine whether a situation is an emergency.",
    ],
  },
  {
    heading: "3. Not a Diagnostic Service",
    paragraphs: [
      "Guided Care Navigation provides care-navigation and decision support to help you identify an appropriate level of care. It does not diagnose any medical condition and is not a substitute for professional clinical assessment. Recommendations are informational and should be confirmed by a qualified healthcare provider.",
    ],
  },
  {
    heading: "4. Facility Accuracy of Information",
    paragraphs: [
      "Facility availability status, contact details, and services shown on ReferNet are provided and maintained by participating facilities. While we display the last-updated timestamp for facility status, ReferNet cannot guarantee that a facility's real-time capacity matches what is shown at the moment you view it.",
    ],
  },
  {
    heading: "5. Referral Portal — Facility Responsibilities",
    paragraphs: ["Facilities using the Referral Portal agree to:"],
    list: [
      "Provide accurate facility identification, contact information, and operational status.",
      "Enter complete and accurate patient and clinical information for each referral, to the best of their knowledge at the time.",
      "Respond to incoming referrals in a timely manner — accepting, declining, and updating status as the patient's care progresses.",
      "Use referral data only for the purposes of coordinating that patient's care, not for any unrelated purpose.",
    ],
  },
  {
    heading: "6. Referral Coordinators",
    paragraphs: [
      "A referral coordinator creating a referral on behalf of a facility must clearly indicate this within the referral, and is subject to the same accuracy and confidentiality obligations as facility staff.",
    ],
  },
  {
    heading: "7. Account Security",
    paragraphs: [
      "Facilities are responsible for maintaining the confidentiality of their account credentials and for all activity that occurs under their account. Notify us immediately if you suspect unauthorized access to a facility account.",
    ],
  },
  {
    heading: "8. Limitation of Liability",
    paragraphs: [
      "ReferNet is a coordination and navigation tool. To the fullest extent permitted by law, ReferNet is not liable for clinical decisions made by healthcare providers, the accuracy of facility-reported information, or outcomes arising from a patient's choice of facility or route of care. ReferNet does not replace the professional judgment of treating clinicians.",
    ],
  },
  {
    heading: "9. Suspension and Termination",
    paragraphs: [
      "We may suspend or terminate a facility's access to the Referral Portal for providing materially inaccurate information, misusing patient data, or violating these Terms. Individuals using the Hospital Finder may lose access for misuse of the platform, including submitting false alerts to facilities.",
    ],
  },
  {
    heading: "10. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict-of-law principles.",
    ],
  },
  {
    heading: "11. Changes to These Terms",
    paragraphs: [
      "We may update these Terms as ReferNet evolves. Continued use of ReferNet after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "12. Contact Us",
    paragraphs: [
      "Questions about these Terms can be sent to legal@refernet.ng.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="[Insert date before publishing]"
      intro="These Terms govern your use of ReferNet's Hospital Finder and Healthcare Facility Referral Portal. Please read them carefully, particularly the emergency disclaimer in Section 2."
      sections={SECTIONS}
    />
  );
}
