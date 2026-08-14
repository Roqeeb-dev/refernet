"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Laptop } from "lucide-react";
import DigitalReferralStepper, {
  DIGITAL_REFERRAL_STEPS,
} from "@/components/new-referral/DigitalReferralStepper";
import DigitalReferralSidebar from "@/components/new-referral/DigitalReferralSidebar";

const STEP_TITLES: Record<string, string> = {
  "patient-info": "Patient Information",
  "clinical-info": "Clinical Information",
  "select-facility": "Select Receiving Facility",
  review: "Review & Confirm",
};

function getCurrentStepKey(pathname: string): string {
  const match = DIGITAL_REFERRAL_STEPS.find((step) =>
    pathname.includes(`/${step.key}`),
  );
  return match?.key ?? DIGITAL_REFERRAL_STEPS[0].key;
}

export default function DigitalReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStepKey = getCurrentStepKey(pathname!);
  const currentIndex = DIGITAL_REFERRAL_STEPS.findIndex(
    (step) => step.key === currentStepKey,
  );
  const title = STEP_TITLES[currentStepKey] ?? "New Referral";

  return (
    <div className="flex min-h-full flex-col">
      {/* Header Banner & Stepper */}
      <div className="border-b border-gray-100 bg-white px-base py-base">
        <div className="mb-xs flex items-center gap-sm">
          <span className="font-body text-caption text-text-secondary">
            New Referral
          </span>
          <span className="inline-flex items-center gap-xs rounded-full bg-emerald-50 px-sm py-[2px] font-body text-caption font-semibold text-emerald-700">
            <Laptop size={11} />
            Digital
          </span>
        </div>
        <h1 className="mb-base font-display text-heading-md font-bold text-text-primary">
          {title}
        </h1>

        <DigitalReferralStepper currentIndex={currentIndex} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 justify-center bg-gray-50 p-lg">
        <div className="flex w-full max-w-6xl flex-wrap gap-lg">
          <div className="min-w-[320px] flex-[2_1_480px] max-w-[800px]">
            {children}
          </div>
          <DigitalReferralSidebar step={currentStepKey} />
        </div>
      </div>
    </div>
  );
}
