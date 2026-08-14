import { Check } from "lucide-react";

export interface StepMeta {
  key: string;
  number: number;
  label: string;
}

export const DIGITAL_REFERRAL_STEPS: StepMeta[] = [
  { key: "patient-info", number: 1, label: "Patient Info" },
  { key: "clinical-info", number: 2, label: "Clinical Info" },
  { key: "select-facility", number: 3, label: "Select Facility" },
  { key: "review", number: 4, label: "Review & Confirm" },
];

export default function DigitalReferralStepper({
  currentIndex,
}: {
  currentIndex: number;
}) {
  return (
    <div className="flex items-start">
      {DIGITAL_REFERRAL_STEPS.map((step, index) => {
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

            {index < DIGITAL_REFERRAL_STEPS.length - 1 && (
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
