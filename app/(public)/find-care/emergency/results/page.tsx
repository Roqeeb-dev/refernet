import { redirect } from "next/navigation";
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

  return <FacilityResultsClient />;
}
