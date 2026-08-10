"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import Button from "@/components/shared/Button";
import FindCareBackdrop from "@/components/emergency/FindCareBackdrop";

export default function EmergencyPage() {
  const router = useRouter();
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");

  function handleAllowLocation() {
    if (!navigator.geolocation) {
      setError("Location access isn't supported on this device.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        router.push(
          `/find-care/emergency/results?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        );
      },
      () => {
        setLocating(false);
        setError("Couldn't get your location. Try entering it manually.");
      },
    );
  }

  return (
    <FindCareBackdrop>
      <div className="rounded-lg bg-green-900/80 p-xl text-center shadow-floating backdrop-blur-md sm:p-2xl">
        <div className="mx-auto mb-lg flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
          <MapPin size={24} className="text-white" />
        </div>

        <h2 className="mb-sm font-display text-heading-lg font-bold text-white">
          Find Emergency Care Near You
        </h2>
        <p className="mb-lg font-body text-body-sm text-green-100">
          We need your location to show nearby facilities.
          <br />
          Your location is only used to find nearby hospitals and never stored.
        </p>

        {error && (
          <p
            role="alert"
            className="mb-base font-body text-body-sm text-urgent"
          >
            {error}
          </p>
        )}

        <Button
          variant="primary"
          fullWidth
          isLoading={locating}
          onClick={handleAllowLocation}
        >
          Allow Location Access
        </Button>

        <button
          type="button"
          className="mt-base font-body text-body-sm text-green-100 underline underline-offset-2 transition-colors hover:text-white"
        >
          Enter Location Manually
        </button>
      </div>
    </FindCareBackdrop>
  );
}
