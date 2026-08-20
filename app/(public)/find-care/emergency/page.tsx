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
    setError("");
    if (!navigator.geolocation) {
      setError("Location access isn't supported on this device.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        router.push(
          `/find-care/emergency/results?lat=${latitude}&lng=${longitude}`,
        );
      },
      (geoError) => {
        setLocating(false);
        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            setError(
              "Location permission was denied. Please allow access or enter location manually.",
            );
            break;
          case geoError.POSITION_UNAVAILABLE:
            setError("Location information is unavailable. Try again.");
            break;
          case geoError.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("Couldn't get your location. Try entering it manually.");
            break;
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  }

  function handleManualLocation() {
    // Navigate to manual search or default location (e.g. Lagos default coordinates)
    router.push(
      "/find-care/emergency/results?lat=6.5244&lng=3.3792&manual=true",
    );
  }

  return (
    <FindCareBackdrop>
      <div className="mx-auto max-w-[500px] rounded-xl border border-white/20 bg-white/10 p-2xl text-center shadow-floating backdrop-blur-2xl">
        <div className="mx-auto mb-lg flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10">
          <MapPin size={24} className="text-white" />
        </div>

        <h2 className="mb-sm font-display text-heading-xl font-bold text-white">
          Find Emergency Care Near You
        </h2>
        <p className="mb-lg font-body text-body-sm text-white/80">
          We need your location to show nearby facilities.
          <br />
          Your location is only used to find nearby hospitals and never stored.
        </p>

        {error && (
          <p
            role="alert"
            className="mb-base font-body text-body-sm font-medium text-urgent"
          >
            {error}
          </p>
        )}

        <Button
          variant="primary"
          fullWidth
          isLoading={locating}
          disabled={locating}
          onClick={handleAllowLocation}
        >
          {locating ? "Locating..." : "Allow Location Access"}
        </Button>

        <div className="my-base flex items-center gap-sm">
          <span className="h-px flex-1 bg-white/20" />
          <span className="font-body text-caption text-white/50">or</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>

        <button
          type="button"
          onClick={handleManualLocation}
          className="font-body text-body-sm text-white/90 underline underline-offset-2 transition-colors hover:text-white"
        >
          Enter Location Manually
        </button>
      </div>
    </FindCareBackdrop>
  );
}
