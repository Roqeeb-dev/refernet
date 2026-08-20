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
      <div className="mx-auto max-w-7xl px-4 py-12 text-center font-body text-gray-500">
        Failed to fetch nearby facilities. Please try again.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            Nearby Emergency Facilities
          </h1>
          <p className="font-body text-sm text-gray-500">
            Showing {facilities.length} facilities near your location
          </p>
        </div>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>
    </div>
  );
}
