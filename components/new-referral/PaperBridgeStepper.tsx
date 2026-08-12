import { Check } from "lucide-react";

export interface StepMeta {
  key: string;
  number: number;
  label: string;
}

export const PAPER_BRIDGE_STEPS: StepMeta[] = [
  { key: "upload", number: 1, label: "Upload Referral" },
  { key: "select-facility", number: 2, label: "Select Facility" },
  { key: "review", number: 3, label: "Review & Confirm" },
];

export default function PaperBridgeStepper({
  currentIndex,
}: {
  currentIndex: number;
}) {
  return (
    <div className="flex items-start">
      {PAPER_BRIDGE_STEPS.map((step, index) => {
        const status =
          index < currentIndex
            ? "completed"
            : index === currentIndex
              ? "current"
              : "upcoming";

        return (
          <div
            key={step.key}
            className="flex flex-1 items-start last:flex-none"
          >
            <div className="flex flex-col items-center gap-xs">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-body text-caption font-semibold ${
                  status === "upcoming"
                    ? "bg-gray-100 text-text-disabled"
                    : "bg-green-500 text-white"
                }`}
              >
                {status === "completed" ? <Check size={14} /> : step.number}
              </div>
              <span
                className={`whitespace-nowrap font-body text-caption font-semibold ${
                  status === "upcoming"
                    ? "text-text-disabled"
                    : "text-green-700"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < PAPER_BRIDGE_STEPS.length - 1 && (
              <div
                className={`mx-sm mt-[13px] h-px flex-1 ${
                  index < currentIndex ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
