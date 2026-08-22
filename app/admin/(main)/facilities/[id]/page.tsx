import FacilityDetailView from "@/components/admin/facility-detail/FacilityDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FacilityDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <FacilityDetailView facilityId={id} />;
}
