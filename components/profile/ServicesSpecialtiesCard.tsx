"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Button from "@/components/shared/Button";
import { FACILITY_SERVICES } from "@/lib/facility-services";
import { useFacilityProfileStore } from "@/store/useFacilityProfileStore";
import ProfileSectionCard from "./ProfileSectionCard";

export default function ServicesSpecialtiesCard() {
  const selectedServices = useFacilityProfileStore((s) => s.selectedServices);
  const toggleService = useFacilityProfileStore((s) => s.toggleService);
  const saveServices = useFacilityProfileStore((s) => s.saveServices);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await saveServices();
    } finally {
      setSaving(false);
    }
  }

  return (
    <ProfileSectionCard
      title="Services & Specialities"
      subtitle="Select all services your facility is currently able to provide and receive referrals for."
    >
      <div className="grid gap-sm sm:grid-cols-2">
        {FACILITY_SERVICES.map((service) => {
          const active = selectedServices.includes(service);
          return (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={`flex items-center gap-sm rounded-md border px-base py-sm text-left transition-colors ${
                active
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${
                  active ? "bg-green-600" : "border border-gray-300 bg-white"
                }`}
              >
                {active && <Check size={11} className="text-white" />}
              </span>
              <span
                className={`font-body text-body-sm ${
                  active ? "font-semibold text-green-800" : "text-text-primary"
                }`}
              >
                {service}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-base flex items-center justify-between">
        <p className="font-body text-body-sm text-text-secondary">
          {selectedServices.length} services selected
        </p>
        <Button
          variant="primary"
          size="sm"
          type="button"
          isLoading={saving}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </ProfileSectionCard>
  );
}
