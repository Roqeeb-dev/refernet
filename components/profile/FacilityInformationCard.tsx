"use client";

import { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useFacilityProfileStore } from "@/store/useFacilityProfileStore";
import ProfileSectionCard from "./ProfileSectionCard";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-sm font-body text-overline font-semibold uppercase tracking-wide text-green-700">
      {children}
    </p>
  );
}

export default function FacilityInformationCard() {
  const { basicDetails, location, capacity, contactPerson } =
    useFacilityProfileStore((s) => s.facilityInfo);
  const setBasicDetails = useFacilityProfileStore((s) => s.setBasicDetails);
  const setLocation = useFacilityProfileStore((s) => s.setLocation);
  const setCapacity = useFacilityProfileStore((s) => s.setCapacity);
  const setContactPerson = useFacilityProfileStore((s) => s.setContactPerson);
  const saveFacilityInfo = useFacilityProfileStore((s) => s.saveFacilityInfo);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      await saveFacilityInfo();
    } catch {
      setError("Couldn't save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ProfileSectionCard
      title="Facility Information"
      subtitle="Update your facility details. Registration number and uploaded documents cannot be changed here."
    >
      <div className="flex flex-col gap-base">
        <section>
          <SectionLabel>Basic Details</SectionLabel>
          <div className="grid gap-sm sm:grid-cols-2">
            <Input
              label="Facility Name"
              value={basicDetails.facilityName}
              onChange={(e) =>
                setBasicDetails({ facilityName: e.target.value })
              }
            />
            <Input
              label="Email Address"
              type="email"
              value={basicDetails.email}
              onChange={(e) => setBasicDetails({ email: e.target.value })}
            />
            <Input
              label="Facility Type"
              value={basicDetails.facilityType}
              onChange={(e) =>
                setBasicDetails({ facilityType: e.target.value })
              }
            />
            <Input
              label="Phone Number"
              type="tel"
              value={basicDetails.phoneNumber}
              onChange={(e) => setBasicDetails({ phoneNumber: e.target.value })}
            />
            <Input
              label="Registration / License Number"
              value={basicDetails.registrationNumber}
              disabled
              helperText="Cannot be changed here"
            />
            <Input
              label="Website"
              value={basicDetails.website}
              onChange={(e) => setBasicDetails({ website: e.target.value })}
            />
          </div>
        </section>

        <section>
          <SectionLabel>Location</SectionLabel>
          <div className="flex flex-col gap-sm">
            <Input
              label="Street Address"
              value={location.streetAddress}
              onChange={(e) => setLocation({ streetAddress: e.target.value })}
            />
            <div className="grid gap-sm sm:grid-cols-2">
              <Input
                label="Local Government Area (LGA)"
                value={location.lga}
                onChange={(e) => setLocation({ lga: e.target.value })}
              />
              <Input
                label="State"
                value={location.state}
                onChange={(e) => setLocation({ state: e.target.value })}
              />
            </div>
          </div>
        </section>

        <section>
          <SectionLabel>Capacity</SectionLabel>
          <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
            <Input
              label="Total Beds"
              type="number"
              min={0}
              value={capacity.totalBeds}
              onChange={(e) =>
                setCapacity({ totalBeds: Number(e.target.value) })
              }
            />
            <Input
              label="ICU Beds"
              type="number"
              min={0}
              value={capacity.icuBeds}
              onChange={(e) => setCapacity({ icuBeds: Number(e.target.value) })}
            />
            <Input
              label="Emergency Bays"
              type="number"
              min={0}
              value={capacity.emergencyBays}
              onChange={(e) =>
                setCapacity({ emergencyBays: Number(e.target.value) })
              }
            />
            <Input
              label="Operating Theatres"
              type="number"
              min={0}
              value={capacity.operatingTheatres}
              onChange={(e) =>
                setCapacity({ operatingTheatres: Number(e.target.value) })
              }
            />
          </div>
        </section>

        <section>
          <SectionLabel>Primary Contact Person</SectionLabel>
          <div className="grid gap-sm sm:grid-cols-2">
            <Input
              label="Full Name"
              value={contactPerson.fullName}
              onChange={(e) => setContactPerson({ fullName: e.target.value })}
            />
            <Input
              label="Phone"
              type="tel"
              value={contactPerson.phone}
              onChange={(e) => setContactPerson({ phone: e.target.value })}
            />
            <Input
              label="Role / Title"
              value={contactPerson.role}
              onChange={(e) => setContactPerson({ role: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={contactPerson.email}
              onChange={(e) => setContactPerson({ email: e.target.value })}
            />
          </div>
        </section>
      </div>

      <div className="mt-base flex items-center justify-end gap-sm">
        {error && (
          <span role="alert" className="font-body text-caption text-emergency">
            {error}
          </span>
        )}
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
