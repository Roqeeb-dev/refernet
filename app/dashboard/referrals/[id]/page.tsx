import { notFound } from "next/navigation";
import { getReferralById } from "@/services/referral.service";
import ReferralDetailView from "@/components/new-referral/ReferralDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReferralDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { data: referral, error } = await getReferralById(id);

  if (error || !referral) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-xl font-bold">Failed to load referral</h2>
        <p className="mt-2">Error detail: {error || "No data returned"}</p>
        <p className="mt-1 text-sm text-gray-500">Target ID: {id}</p>
      </div>
    );
  }

  return <ReferralDetailView referral={referral} />;
}
