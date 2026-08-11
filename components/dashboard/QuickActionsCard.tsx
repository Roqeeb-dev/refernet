import Link from "next/link";
import { RefreshCw } from "lucide-react";
import Button from "@/components/shared/Button";

interface QuickActionsCardProps {
  newReferralHref?: string;
  onUpdateStatus?: () => void;
}

export default function QuickActionsCard({
  newReferralHref = "/dashboard/referrals/new",
  onUpdateStatus,
}: QuickActionsCardProps) {
  return (
    <div className="h-fit rounded-lg border border-gray-200 bg-white p-lg">
      <p className="mb-base font-body text-overline font-semibold uppercase tracking-wide text-text-secondary">
        Quick Actions
      </p>
      <div className="flex flex-col gap-sm">
        <Link href={newReferralHref}>
          <Button variant="primary" fullWidth>
            New Referral
          </Button>
        </Link>
        <Button variant="outline" fullWidth onClick={onUpdateStatus}>
          <RefreshCw size={16} />
          Update Status
        </Button>
      </div>
    </div>
  );
}
