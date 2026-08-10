"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Button from "@/components/shared/Button";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { REGISTRATION_STEPS } from "@/lib/registrationSteps";

const SERVICES = [
  "Emergency Medicine",
  "Cardiology",
  "Neurology",
  "Neurosurgery",
  "Orthopaedics",
  "General Surgery",
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "Neonatology",
  "Internal Medicine",
  "Nephrology",
  "Urology",
  "Ophthalmology",
  "ENT",
  "Dermatology",
  "Psychiatry / Mental Health",
  "Oncology",
  "Haematology",
  "Endocrinology",
  "Gastroenterology",
  "Pulmonology / Chest Medicine",
  "Rheumatology",
  "Infectious Disease",
  "Radiology / Imaging",
  "Pathology / Lab",
  "Physiotherapy",
  "Dialysis / Renal Unit",
  "Blood Bank",
  "ICU / Critical Care",
  "Burns Unit",
  "Dental / Maxillofacial",
];

const REQUIREMENTS = [
  "Select all applicable specialities",
  "Be accurate — referring facilities rely on this",
  "You can update these anytime from your profile",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-sm font-body text-overline font-semibold uppercase tracking-wide text-green-700">
      {children}
    </p>
  );
}

export default function ServicesPage() {
  const router = useRouter();
  const { services, toggleService, completeStep } = useRegistrationStore();
  const [error, setError] = useState("");

  const selectedServices = services.services ?? [];
  const selectedCount = selectedServices.length;

  function handleContinue() {
    if (selectedCount === 0) {
      setError("Please select at least one service.");
      return;
    }
    setError("");
    completeStep(4);
    router.push(REGISTRATION_STEPS[4].path); // -> Documents
  }

  return (
    <div className="grid gap-xl lg:grid-cols-[1fr_320px]">
      {/* Form */}
      <div className="rounded-lg bg-white p-xl">
        <h1 className="font-display text-heading-lg font-bold text-text-primary">
          Services
        </h1>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Select every service your facility currently provides.
        </p>

        <section>
          <SectionLabel>
            Select All Services Your Facility Provides
          </SectionLabel>
          <p className="mb-base font-body text-body-sm text-text-secondary">
            Be accurate — referring facilities will use this to send you the
            right patients. You can edit this anytime from your profile.
          </p>

          <div className="grid gap-sm sm:grid-cols-2">
            {SERVICES.map((service) => {
              const checked = selectedServices.includes(service);
              return (
                <label
                  key={service}
                  className={`flex min-h-[44px] cursor-pointer items-center gap-sm rounded-md border px-base py-sm font-body text-body-sm text-text-primary transition-colors ${
                    checked
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(service)}
                    className="h-4 w-4 shrink-0 rounded border-gray-200 text-green-700 focus:ring-green-500"
                  />
                  {service}
                </label>
              );
            })}
          </div>

          <p className="mt-base font-body text-body-sm text-text-secondary">
            {selectedCount} service{selectedCount === 1 ? "" : "s"} selected
          </p>

          {error && (
            <p
              role="alert"
              className="mt-sm font-body text-body-sm text-emergency"
            >
              {error}
            </p>
          )}
        </section>

        <div className="mt-xl flex items-center justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push(REGISTRATION_STEPS[2].path)}
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
            4
          </span>
          <span className="font-body text-body-sm font-semibold text-text-primary">
            Step 4 of 5
          </span>
        </div>

        <h2 className="mb-sm font-body text-body-md font-semibold text-text-primary">
          Services you offer
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
