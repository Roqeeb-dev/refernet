export interface CareRecommendation {
  type: "phc" | "tertiary";
  badge: string;
  title: string;
  subtitle: string;
  reason: string;
  accordionQuestion: string;
  accordionAnswer: string[];
  services: string[];
  whatToExpect: string;
  higherLevelCare: string;
  primaryButtonText: string;
  accentBg: string;
  accentBadgeBg: string;
  accentText: string;
}

export const RECOMMENDATIONS: Record<"phc" | "tertiary", CareRecommendation> = {
  phc: {
    type: "phc",
    badge: "PRIMARY HEALTH CENTRE",
    title: "Primary Health Centre",
    subtitle: "Primary care is the right starting point",
    reason:
      "Based on your responses, your concern can be appropriately assessed and managed at a Primary Health Centre. A PHC is staffed by trained nurses and doctors equipped for exactly this kind of presentation.",
    accordionQuestion: "Why not go straight to a hospital?",
    accordionAnswer: [
      "PHCs are staffed and equipped for exactly your type of concern. Going straight to a General Hospital or Teaching Hospital means longer waits, more crowded facilities, and care resources being used by people who need them for more complex conditions.",
      "Starting at a PHC is not settling for less — it is using the system the way it was designed, which means you get seen faster and the right resources remain available for serious emergencies.",
    ],
    services: [
      "Assessment & consultation",
      "Basic treatment & medication",
      "Wound care & dressings",
      "Maternal & child health",
      "Immunisation & preventive care",
      "Referral onward if needed",
    ],
    whatToExpect:
      "A healthcare worker will assess you, provide treatment or medication, and refer you to a General Hospital if your condition needs further investigation.",
    higherLevelCare:
      "If your PHC doctor determines you need more advanced care, they will refer you to the right facility. This is how the referral system is designed to work — and it works.",
    primaryButtonText: "Find Nearby PHCs",
    accentBg: "bg-[#EAF5EF]",
    accentBadgeBg: "bg-white/80",
    accentText: "text-[#1B5E3A]",
  },
  tertiary: {
    type: "tertiary",
    badge: "TERTIARY / SPECIALIST",
    title: "Specialist / Teaching Hospital",
    subtitle: "Specialist-level care is recommended",
    reason:
      "Your responses suggest a condition that may need specialist assessment, advanced diagnostics, or procedures beyond what a General Hospital can provide.",
    accordionQuestion: "Why is tertiary care recommended?",
    accordionAnswer: [
      "Your reported symptoms indicate specific red flags or complexities that require immediate specialized evaluation or advanced diagnostic infrastructure available at tertiary facilities.",
    ],
    services: [
      "Specialist consultations",
      "Advanced diagnostics (MRI, CT)",
      "Surgery & complex procedures",
      "Intensive care",
      "Sub-specialist units",
    ],
    whatToExpect:
      "Expect referrals for advanced imaging (MRI, CT, ultrasound), specialist consultations, and possible admission for monitoring or treatment.",
    higherLevelCare:
      "In some cases, a referral letter from a General Hospital or GP may be required. Call ahead to confirm.",
    primaryButtonText: "Find Specialist Hospitals",
    accentBg: "bg-[#EBF3FF]",
    accentBadgeBg: "bg-white/80",
    accentText: "text-[#1E40AF]",
  },
};
