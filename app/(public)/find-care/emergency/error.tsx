"use client";

import Link from "next/link";
import { MapPinOff } from "lucide-react";
import Button from "@/components/shared/Button";

export default function EmergencyResultsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-1 items-center justify-center px-xl py-xl">
      <div className="w-full rounded-lg border border-gray-100 bg-white p-xl text-center">
        <div className="mx-auto mb-lg flex h-14 w-14 items-center justify-center rounded-full bg-emergency-light">
          <MapPinOff size={24} className="text-emergency" />
        </div>

        <h2 className="mb-sm font-display text-heading-md font-bold text-text-primary">
          Unable to detect your location
        </h2>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Please enable location services or enter your address manually. If
          location access was declined, you can change this in your browser or
          device settings.
        </p>

        <div className="flex flex-col gap-sm">
          <Link href="/find-care/emergency">
            <Button variant="primary" fullWidth onClick={() => reset()}>
              Enter Location Manually
            </Button>
          </Link>
          <a href="tel:112">
            <Button
              variant="outline"
              fullWidth
              className="border-emergency text-emergency hover:bg-emergency-light"
            >
              Emergency Helpline: 112
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
