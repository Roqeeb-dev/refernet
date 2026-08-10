import { redirect, notFound } from "next/navigation";
import { getNearbyEmergencyFacilities } from "@/services/facilities.service";
import FacilityResultsClient from "./FacilityResultClient";

interface PageProps {
  searchParams: Promise<{ lat?: string; lng?: string }>;
}

export default async function EmergencyResultsPage({
  searchParams,
}: PageProps) {
  const { lat, lng } = await searchParams;

  if (!lat || !lng) {
    redirect("/find-care/emergency");
  }

  const facilities = await getNearbyEmergencyFacilities(
    parseFloat(lat),
    parseFloat(lng),
  );

  if (facilities.length === 0) {
    notFound(); // renders results/not-found.tsx
  }

  return <FacilityResultsClient initialFacilities={facilities} />;
}
