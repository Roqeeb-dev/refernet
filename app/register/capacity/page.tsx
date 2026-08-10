"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Button from "@/components/shared/Button";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { REGISTRATION_STEPS } from "@/lib/registrationSteps";

const OPERATING_HOURS_OPTIONS = [
  "24/7 (Always Open)",
  "Weekdays (Mon–Fri)",
  "Custom hours",
];

const REQUIREMENTS = [
  "Total bed count",
  "ICU and emergency bay count",
  "Number of operating theatres",
  "Operating hours",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-sm font-body text-overline font-semibold uppercase tracking-wide text-green-700">
      {children}
    </p>
  );
}

export default function CapacityPage() {
  const router = useRouter();
  const { capacity, setCapacity, completeStep } = useRegistrationStore();
  const [error, setError] = useState("");

  function handleContinue() {
    if (!capacity.operatingHours) {
      setError("Please select your operating hours.");
      return;
    }
    setError("");
    completeStep(3);
    router.push(REGISTRATION_STEPS[3].path); // -> Services
  }

  return (
    <div className="grid gap-xl lg:grid-cols-[1fr_320px]">
      {/* Form */}
      <div className="rounded-lg bg-white p-xl">
        <h1 className="font-display text-heading-lg font-bold text-text-primary">
          Capacity
        </h1>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Help patients and staff understand your facility&apos;s scale.
        </p>

        <div className="flex flex-col gap-lg">
          {/* Operating Hours */}
          <section>
            <SectionLabel>Operating Hours</SectionLabel>
            <div className="flex flex-col gap-xs">
              <label className="font-body text-body-sm font-medium text-text-primary">
                When is your facility open?
                <span className="text-emergency"> *</span>
              </label>
              <select
                value={capacity.operatingHours ?? ""}
                onChange={(e) =>
                  setCapacity({ operatingHours: e.target.value })
                }
                className="h-tap-preferred w-full rounded-md border border-gray-200 bg-white px-base font-body text-body-md text-text-primary focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select operating hours
                </option>
                {OPERATING_HOURS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {error && (
            <p role="alert" className="font-body text-body-sm text-emergency">
              {error}
            </p>
          )}
        </div>

        <div className="mt-xl flex items-center justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push(REGISTRATION_STEPS[1].path)}
          >
            Back
          </Button>
          <Button variant="primary" type="button" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="h-fit rounded-lg bg-green-50 p-lg">
        <div className="mb-base flex items-center gap-xs">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 font-body text-caption font-semibold text-text-inverse">
            3
          </span>
          <span className="font-body text-body-sm font-semibold text-text-primary">
            Step 3 of 5
          </span>
        </div>

        <h2 className="mb-sm font-body text-body-md font-semibold text-text-primary">
          Capacity Information
        </h2>
        <ul className="flex flex-col gap-sm">
          {REQUIREMENTS.map((item) => (
            <li key={item} className="flex items-start gap-xs">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
              <span className="font-body text-body-sm text-text-secondary">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-base flex items-start gap-xs rounded-md border border-green-100 bg-white p-sm">
          <ShieldCheck size={16} className="mt-[2px] shrink-0 text-green-700" />
          <p className="font-body text-caption text-text-secondary">
            Your data is encrypted and only shared with the ReferNet
            verification team.
          </p>
        </div>
      </aside>
    </div>
  );
}
