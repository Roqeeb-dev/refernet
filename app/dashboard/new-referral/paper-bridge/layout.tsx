"use client";

import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import PaperBridgeStepper, {
  PAPER_BRIDGE_STEPS,
} from "@/components/new-referral/PaperBridgeStepper";
import PaperBridgeSidebar from "@/components/new-referral/PaperBridgeSidebar";

const STEP_TITLES: Record<string, string> = {
  upload: "Upload Paper Referral",
  "select-facility": "Select Receiving Facility",
  review: "Review & Confirm",
};

function getCurrentStepKey(pathname: string): string {
  const match = PAPER_BRIDGE_STEPS.find((step) =>
    pathname.includes(`/${step.key}`),
  );
  return match?.key ?? PAPER_BRIDGE_STEPS[0].key;
}

export default function PaperBridgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStepKey = getCurrentStepKey(pathname!);
  const currentIndex = PAPER_BRIDGE_STEPS.findIndex(
    (step) => step.key === currentStepKey,
  );
  const title = STEP_TITLES[currentStepKey] ?? "New Referral";

  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-gray-100 bg-white px-base py-base">
        <div className="mb-xs flex items-center gap-sm">
          <span className="font-body text-caption text-text-secondary">
            New Referral
          </span>
          <span className="inline-flex items-center gap-xs rounded-full bg-info-light px-sm py-[2px] font-body text-caption font-semibold text-info">
            <FileText size={11} />
            Paper Bridge
          </span>
        </div>
        <h1 className="mb-base font-display text-heading-md font-bold text-text-primary">
          {title}
        </h1>

        <PaperBridgeStepper currentIndex={currentIndex} />
      </div>

      <div className="flex flex-1 flex-wrap gap-lg bg-gray-50 p-lg">
        <div className="min-w-[320px] flex-[2_1_480px]">{children}</div>
        <PaperBridgeSidebar step={currentStepKey} />
      </div>
    </div>
  );
}
