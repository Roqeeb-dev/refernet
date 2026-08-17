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
    notFound();
  }

  return <ReferralDetailView referral={referral} />;
}
