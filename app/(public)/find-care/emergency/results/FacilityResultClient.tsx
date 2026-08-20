"use client";

import { useFacilities } from "@/hooks/useFacility";
import FacilityCard from "@/components/emergency/FacilityCard";
import EmergencyResultsLoading from "../loading";

export default function FacilityResultsClient() {
  const { facilities, isLoading, error } = useFacilities();

  if (isLoading) {
    return <EmergencyResultsLoading />;
  }

  if (error) {
    return (
      <div className="p-xl text-center text-text-secondary">
        Failed to fetch nearby facilities. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-base p-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-heading-lg font-bold">
            Nearby Emergency Facilities
          </h1>
          <p className="font-body text-body-sm text-text-secondary">
            Showing {facilities.length} facilities near your location
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-base">
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>
    </div>
  );
}
