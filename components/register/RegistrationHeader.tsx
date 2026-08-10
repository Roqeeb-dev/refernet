"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import Logo from "@/components/shared/Logo";
import {
  REGISTRATION_STEPS,
  TOTAL_REGISTRATION_STEPS,
} from "@/lib/registrationSteps";

export default function RegistrationHeader() {
  const pathname = usePathname();

  const activeIndex = REGISTRATION_STEPS.findIndex((step) =>
    pathname?.startsWith(step.path),
  );
  const currentStep =
    activeIndex === -1 ? 1 : REGISTRATION_STEPS[activeIndex].number;

  const progressPercent =
    ((currentStep - 1) / (TOTAL_REGISTRATION_STEPS - 1)) * 100;

  return (
    <div className="border-b border-gray-200 bg-white">
      {/* Title row */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-base py-sm md:px-xl">
        <div className="flex items-center gap-sm">
          <Logo />
          <span className="font-body text-body-sm text-text-secondary">
            Create Facility Account
          </span>
        </div>
        <span className="font-body text-body-sm text-text-disabled">
          Step {currentStep}/{TOTAL_REGISTRATION_STEPS}
        </span>
      </div>

      {/* Step tracker */}
      <div className="mx-auto max-w-5xl px-base pb-base md:px-xl">
        <div className="relative">
          {/* Background line */}
          <div className="absolute left-0 right-0 top-3 h-px bg-gray-200" />
          {/* Completed portion of the line */}
          <div
            className="absolute left-0 top-3 h-px bg-green-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />

          <ol className="relative flex justify-between">
            {REGISTRATION_STEPS.map((step) => {
              const isCompleted = step.number < currentStep;
              const isActive = step.number === currentStep;

              return (
                <li
                  key={step.number}
                  className="flex flex-col items-center gap-xs"
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full font-body text-caption font-semibold ${
                      isCompleted
                        ? "bg-green-500 text-text-inverse"
                        : isActive
                          ? "bg-green-500 text-text-inverse"
                          : "bg-gray-100 text-text-disabled"
                    }`}
                  >
                    {isCompleted ? <Check size={14} /> : step.number}
                  </div>
                  <span
                    className={`whitespace-nowrap font-body text-caption ${
                      isActive
                        ? "font-semibold text-text-primary"
                        : "text-text-disabled"
                    }`}
                  >
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
