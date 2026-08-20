import LegalPageLayout, {
  LegalSection,
} from "@/components/legal/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read our privacy policy regarding data collection and security on ReferNet Nigeria.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. What This Policy Covers",
    paragraphs: [
      "This Privacy Policy explains how ReferNet collects, uses, stores, and protects information when you use the Hospital Finder (including Emergency Mode and Guided Care Navigation) and the Healthcare Facility Referral Portal.",
      "By using ReferNet, you agree to the practices described here. If you're using ReferNet on behalf of a healthcare facility, this policy applies alongside any separate facility onboarding agreement.",
    ],
  },
  {
    heading: "2. Information We Collect",
    paragraphs: ["What we collect depends on how you use ReferNet:"],
    list: [
      "Hospital Finder (Emergency Mode): no account or registration is required. We request your device location only to show nearby facilities.",
      "Guided Care Navigation: your responses to guided questions, used to recommend an appropriate level of care.",
      "Referral Portal: facility account details, and — when a referral is created — patient name, age, sex, contact information, and clinical information (urgency, diagnosis, history, vitals, medications, and reason for referral) entered by the referring facility.",
      "Optional pre-arrival alerts: a reference code and basic arrival details shared with the selected facility, only if you choose to send one.",
    ],
  },
  {
    heading: "3. Location Data",
    paragraphs: [
      "Location data requested in Emergency Mode or Guided Care is used only to find and display nearby facilities. It is not stored after your session ends, and it is never sold or shared with third parties for advertising or any other purpose.",
    ],
  },
  {
    heading: "4. How Referral Information Is Shared",
    paragraphs: [
      "Clinical information entered into a referral is visible only to the referring facility and the specific receiving facility selected for that referral — never published, listed publicly, or shared with unrelated third parties.",
      "Every action on a referral (creation, facility selection, acceptance or decline, status changes, arrival, outcome, and closure) is recorded in a timestamped audit trail for accountability and safety review.",
    ],
  },
  {
    heading: "5. How We Protect Your Data",
    paragraphs: [
      "Patient and facility information is protected through authentication, role-based access control, encryption in transit and at rest, and audit logging. Access to clinical information is limited to the facilities directly involved in a given referral.",
    ],
  },
  {
    heading: "6. Data Retention",
    paragraphs: [
      "We retain referral records for as long as necessary to support continuity of care, audit and accountability requirements, and applicable regulatory obligations. Facility accounts and associated data are retained for the duration of the facility's participation on ReferNet, plus any additional period required by law.",
    ],
  },
  {
    heading: "7. Your Rights",
    paragraphs: [
      "Under the Nigeria Data Protection Act (NDPA), you have the right to know what personal data we hold about you, request corrections to inaccurate data, request deletion where legally permitted, and object to certain uses of your data. Facility administrators can request access, correction, or deletion of their facility's data by contacting us using the details below.",
    ],
  },
  {
    heading: "8. Children's Information",
    paragraphs: [
      "ReferNet may be used by caregivers on behalf of a minor seeking care. In such cases, the information provided is treated with the same protections described in this policy, and is used solely to facilitate access to appropriate care.",
    ],
  },
  {
    heading: "9. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy as ReferNet evolves. Material changes will be communicated through the platform before they take effect.",
    ],
  },
  {
    heading: "10. Contact Us",
    paragraphs: [
      "If you have questions about this Privacy Policy or how your data is handled, contact our data protection team at privacy@refernet.ng.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="[Insert date before publishing]"
      intro="ReferNet is built to help you find care and coordinate referrals safely. This page explains, in plain terms, what information we collect and how it's used and protected."
      sections={SECTIONS}
    />
  );
}
