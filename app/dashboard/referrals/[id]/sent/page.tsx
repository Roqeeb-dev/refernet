import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import Button from "@/components/shared/Button";
import { getReferralById } from "@/services/referral.service";

function extractFileName(path: string | null): string {
  if (!path) return "No file attached";
  const withoutFolder = path.split("/").pop() ?? path;
  const parts = withoutFolder.split("-");
  return parts.length > 1 ? parts.slice(1).join("-") : withoutFolder;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReferralSentPage({ params }: PageProps) {
  const { id } = await params;
  const referral = await getReferralById(id);

  if (!referral) notFound();

  const fileName = extractFileName(referral.documentPath);
  const submittedAt = new Date(referral.submittedAt).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const checklist = [
    { label: "Referral submitted", done: true },
    { label: "Document attached to record", done: true },
    {
      label: "Receiving facility notified",
      done: referral.status !== "pending",
    },
    { label: "Awaiting patient arrival", done: false },
  ];

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-50 px-base py-2xl">
      <div className="w-full max-w-[420px] rounded-lg bg-white p-xl text-center shadow-raised">
        <div className="mx-auto mb-lg flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={28} className="text-green-700" />
        </div>

        <h1 className="mb-xs font-display text-heading-lg font-bold text-text-primary">
          Paper Referral Sent!
        </h1>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Your paper form has been digitized and attached. The receiving
          facility can view the document now.
        </p>

        <div className="mb-lg rounded-lg border border-info/20 bg-info-light p-base text-left">
          <p className="mb-xs font-body text-overline font-semibold uppercase tracking-wide text-info">
            Reference Number
          </p>
          <p className="mb-base font-display text-heading-md font-bold text-info">
            {referral.referenceNumber}
          </p>
          <div className="flex flex-col gap-xs">
            <div className="flex items-center justify-between">
              <span className="font-body text-caption text-text-secondary">
                Facility
              </span>
              <span className="font-body text-caption font-medium text-text-primary">
                {referral.receivingFacility.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-caption text-text-secondary">
                Submitted
              </span>
              <span className="font-body text-caption font-medium text-text-primary">
                {submittedAt}
              </span>
            </div>
          </div>
          <p className="mt-sm font-body text-caption font-medium text-info">
            📎 {fileName} — Attached
          </p>
        </div>

        <div className="mb-lg rounded-lg border border-green-100 bg-green-50 p-base text-left">
          <p className="font-body text-caption text-text-secondary">
            <span className="font-semibold text-text-primary">
              {referral.receivingFacility.name}
            </span>{" "}
            can now view your uploaded referral document before the patient
            arrives — no need to send a physical copy in advance.
          </p>
        </div>

        <div className="mb-xl flex flex-col gap-sm text-left">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-sm">
              {item.done ? (
                <CheckCircle2 size={16} className="shrink-0 text-green-700" />
              ) : (
                <Clock size={16} className="shrink-0 text-text-disabled" />
              )}
              <span
                className={`font-body text-body-sm ${
                  item.done ? "text-text-primary" : "text-text-disabled"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-sm">
          <Link href={`/dashboard/referrals/${referral.id}`}>
            <Button variant="primary" fullWidth>
              View Referral Details
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" fullWidth>
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
