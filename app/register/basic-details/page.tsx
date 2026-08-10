"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { REGISTRATION_STEPS } from "@/lib/registrationSteps";

const FACILITY_TYPES = [
  "Primary Health Centre",
  "General Hospital",
  "Specialist Hospital",
  "Tertiary Hospital",
];

const REQUIREMENTS = [
  "Facility's full registered name",
  "MOD/MDCN registration number",
  "Primary contact person details",
  "Official facility email and phone",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-sm font-body text-overline font-semibold uppercase tracking-wide text-green-700">
      {children}
    </p>
  );
}

export default function BasicDetailsPage() {
  const router = useRouter();
  const { basicDetails, setBasicDetails, completeStep } =
    useRegistrationStore();
  const [error, setError] = useState("");

  function handleContinue() {
    if (
      !basicDetails.facilityName ||
      !basicDetails.facilityType ||
      !basicDetails.registrationNumber ||
      !basicDetails.officialEmail ||
      !basicDetails.phoneNumber ||
      !basicDetails.contactName ||
      !basicDetails.contactRole ||
      !basicDetails.contactPhone ||
      !basicDetails.contactEmail ||
      !basicDetails.password ||
      !basicDetails.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (basicDetails.password !== basicDetails.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    completeStep(1);
    router.push(REGISTRATION_STEPS[1].path); // -> Location
  }

  return (
    <div className="grid gap-xl lg:grid-cols-[1fr_320px]">
      {/* Form */}
      <div className="rounded-lg bg-white p-xl">
        <h1 className="font-display text-heading-lg font-bold text-text-primary">
          Basic Details
        </h1>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Enter your facility&apos;s basic information and create login
          credentials
        </p>

        <div className="flex flex-col gap-lg">
          {/* Facility Identity */}
          <section>
            <SectionLabel>Facility Identity</SectionLabel>
            <div className="flex flex-col gap-base">
              <Input
                label="Facility Name"
                placeholder="e.g. Lagos General Hospital"
                value={basicDetails.facilityName ?? ""}
                onChange={(e) =>
                  setBasicDetails({ facilityName: e.target.value })
                }
                required
              />

              <div className="flex flex-col gap-xs">
                <label className="font-body text-body-sm font-medium text-text-primary">
                  Facility Type<span className="text-emergency"> *</span>
                </label>
                <select
                  value={basicDetails.facilityType ?? ""}
                  onChange={(e) =>
                    setBasicDetails({ facilityType: e.target.value })
                  }
                  className="h-tap-preferred w-full rounded-md border border-gray-200 bg-white px-base font-body text-body-md text-text-primary focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select facility type
                  </option>
                  {FACILITY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Registration / License Number"
                placeholder="MOD/NG/LAG/2024/XXXXX"
                value={basicDetails.registrationNumber ?? ""}
                onChange={(e) =>
                  setBasicDetails({ registrationNumber: e.target.value })
                }
                required
              />
            </div>
          </section>

          {/* Contact Details */}
          <section>
            <SectionLabel>Contact Details</SectionLabel>
            <div className="flex flex-col gap-base">
              <div className="grid gap-base sm:grid-cols-2">
                <Input
                  label="Official Email"
                  type="email"
                  placeholder="you@hospital.org"
                  value={basicDetails.officialEmail ?? ""}
                  onChange={(e) =>
                    setBasicDetails({ officialEmail: e.target.value })
                  }
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={basicDetails.phoneNumber ?? ""}
                  onChange={(e) =>
                    setBasicDetails({ phoneNumber: e.target.value })
                  }
                  required
                />
              </div>
              <Input
                label="Website (optional)"
                placeholder="www.yourhospital.ng"
                value={basicDetails.website ?? ""}
                onChange={(e) => setBasicDetails({ website: e.target.value })}
              />
            </div>
          </section>

          {/* Primary Contact Person */}
          <section>
            <SectionLabel>Primary Contact Person</SectionLabel>
            <div className="flex flex-col gap-base">
              <div className="grid gap-base sm:grid-cols-2">
                <Input
                  label="Full Name"
                  placeholder="Dr Jane Smith"
                  value={basicDetails.contactName ?? ""}
                  onChange={(e) =>
                    setBasicDetails({ contactName: e.target.value })
                  }
                  required
                />
                <Input
                  label="Role/Title"
                  placeholder="Medical Director"
                  value={basicDetails.contactRole ?? ""}
                  onChange={(e) =>
                    setBasicDetails({ contactRole: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-base sm:grid-cols-2">
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={basicDetails.contactPhone ?? ""}
                  onChange={(e) =>
                    setBasicDetails({ contactPhone: e.target.value })
                  }
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="jane.smith@hospital.ng"
                  value={basicDetails.contactEmail ?? ""}
                  onChange={(e) =>
                    setBasicDetails({ contactEmail: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </section>

          {/* Account Password */}
          <section>
            <SectionLabel>Account Password</SectionLabel>
            <div className="grid gap-base sm:grid-cols-2">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={basicDetails.password ?? ""}
                onChange={(e) => setBasicDetails({ password: e.target.value })}
                autoComplete="new-password"
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={basicDetails.confirmPassword ?? ""}
                onChange={(e) =>
                  setBasicDetails({ confirmPassword: e.target.value })
                }
                autoComplete="new-password"
                required
              />
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
            onClick={() => router.push("/")}
          >
            Cancel
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
            1
          </span>
          <span className="font-body text-body-sm font-semibold text-text-primary">
            Step 1 of 5
          </span>
        </div>

        <h2 className="mb-sm font-body text-body-md font-semibold text-text-primary">
          What you&apos;ll need
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
