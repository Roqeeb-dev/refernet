"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { REGISTRATION_STEPS } from "@/lib/registrationSteps";

const REQUIREMENTS = [
  "Full street address with LGA",
  "State of operation",
  "Optional GPS coordinates",
  "Nearest landmark for easy discovery",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-sm font-body text-overline font-semibold uppercase tracking-wide text-green-700">
      {children}
    </p>
  );
}

export default function LocationPage() {
  const router = useRouter();
  const { location, setLocation, completeStep } = useRegistrationStore();
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);

  function handleAllowLocationAccess() {
    if (!navigator.geolocation) {
      setError("Location access isn't supported on this device/browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocating(false);
      },
      () => {
        setError("Couldn't get your location. You can leave this blank.");
        setLocating(false);
      },
    );
  }

  function handleContinue() {
    if (!location.streetAddress || !location.lga || !location.state) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    completeStep(2);
    router.push(REGISTRATION_STEPS[2].path);
  }

  const hasCoordinates = Boolean(location.latitude && location.longitude);

  return (
    <div className="grid gap-xl lg:grid-cols-[1fr_320px]">
      {/* Form */}
      <div className="rounded-lg bg-white p-xl">
        <h1 className="font-display text-heading-lg font-bold text-text-primary">
          Location
        </h1>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Tell us where your facility is located.
        </p>

        <div className="flex flex-col gap-lg">
          {/* Physical Address */}
          <section>
            <SectionLabel>Physical Address</SectionLabel>
            <div className="flex flex-col gap-base">
              <Input
                label="Street Address"
                placeholder="1 Hospital Road, Ikeja"
                value={location.streetAddress ?? ""}
                onChange={(e) => setLocation({ streetAddress: e.target.value })}
                required
              />

              <div className="grid gap-base sm:grid-cols-2">
                <Input
                  label="Local Government Area (LGA)"
                  placeholder="e.g. Ikeja"
                  value={location.lga ?? ""}
                  onChange={(e) => setLocation({ lga: e.target.value })}
                  required
                />
                <Input
                  label="State"
                  placeholder="e.g. Lagos"
                  value={location.state ?? ""}
                  onChange={(e) => setLocation({ state: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Nearest Landmark (optional)"
                placeholder="e.g. Opposite Lagos State Secretariat"
                value={location.landmark ?? ""}
                onChange={(e) => setLocation({ landmark: e.target.value })}
              />
            </div>
          </section>

          {/* GPS Coordinates */}
          <section>
            <SectionLabel>GPS Coordinates</SectionLabel>
            <p className="mb-base font-body text-body-sm text-text-secondary">
              Adding coordinates improves how quickly patients find your
              facility on the map. You can leave this blank if unsure.
            </p>

            <Button
              variant="outline"
              type="button"
              onClick={handleAllowLocationAccess}
              isLoading={locating}
              className="!w-auto"
            >
              {hasCoordinates ? (
                <>
                  <CheckCircle2 size={16} className="text-green-700" />
                  Location Captured
                </>
              ) : (
                <>
                  <MapPin size={16} />
                  Allow Location Access
                </>
              )}
            </Button>
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
            onClick={() => router.push(REGISTRATION_STEPS[0].path)}
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
            2
          </span>
          <span className="font-body text-body-sm font-semibold text-text-primary">
            Step 2 of 5
          </span>
        </div>

        <h2 className="mb-sm font-body text-body-md font-semibold text-text-primary">
          Location details
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
