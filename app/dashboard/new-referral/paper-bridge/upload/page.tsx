"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Paperclip,
  FileText,
  Download,
  Smartphone,
  Loader2,
} from "lucide-react";
import Button from "@/components/shared/Button";
import FileUpload from "@/components/shared/FileUpload";
import { usePaperReferralDraftStore } from "@/store/useDraftId";

export default function UploadPaperReferral() {
  const router = useRouter();

  const draftReferralId = usePaperReferralDraftStore((s) => s.draftReferralId);
  const setDocumentPathInStore = usePaperReferralDraftStore(
    (s) => s.setDocumentPath,
  );

  const [documentPath, setDocumentPath] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const canContinue = !!documentPath && confirmed;

  const handleUploadComplete = (path: string) => {
    setDocumentPath(path);
    setDocumentPathInStore(path);
  };

  function handleNext() {
    if (!canContinue) return;
    router.push("/dashboard/new-referral/paper-bridge/select-facility");
  }

  return (
    <div className="flex flex-col gap-lg lg:flex-row lg:items-start lg:gap-xl">
      <div className="flex flex-1 flex-col gap-base">
        {/* Paper Referral Pathway note */}
        <div className="flex items-start gap-xs rounded-xl border border-info/20 bg-info-light p-base">
          <Paperclip size={16} className="mt-[2px] shrink-0 text-info" />
          <div>
            <p className="mb-[2px] font-body text-body-sm font-bold text-info">
              Paper Referral Pathway
            </p>
            <p className="font-body text-caption leading-relaxed text-info">
              Upload your completed and signed paper referral form. Once
              uploaded, you&apos;ll select the receiving facility and submit.
              The receiving facility will be notified immediately.
            </p>
          </div>
        </div>

        {/* Template download */}
        <div className="flex flex-col gap-base rounded-xl border border-gray-200 bg-white p-base sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-base">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-50">
              <FileText size={18} className="text-text-secondary" />
            </div>
            <div>
              <p className="font-body text-body-sm font-semibold text-text-primary">
                ReferNet Standard Template
              </p>
              <p className="font-body text-caption text-text-secondary">
                Use this template if your facility does not have a standard form
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" type="button">
            <Download size={16} />
            Download Template
          </Button>
        </div>

        {draftReferralId ? (
          <FileUpload
            label="Upload Your Completed Form"
            required
            bucket="paper-referrals"
            folder={draftReferralId}
            value={documentPath}
            onUploadComplete={handleUploadComplete}
          />
        ) : (
          <div className="flex min-h-[140px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white">
            <Loader2 size={20} className="animate-spin text-text-secondary" />
          </div>
        )}

        {documentPath && (
          <label className="flex items-start gap-xs font-body text-body-sm text-text-primary">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-[3px] h-4 w-4 rounded border-gray-200 text-green-700 focus:ring-green-500"
            />
            Confirm all handwriting is legible and the full form is visible
          </label>
        )}

        {/* Mobile tip */}
        <div className="flex items-start gap-xs rounded-xl bg-gray-50 p-base">
          <Smartphone
            size={15}
            className="mt-[2px] shrink-0 text-text-secondary"
          />
          <p className="font-body text-caption leading-relaxed text-text-secondary">
            <span className="font-semibold text-text-primary">On mobile:</span>{" "}
            tap &lsquo;Browse files&rsquo; then choose Take Photo to photograph
            your referral form. Make sure all text is in frame and legible.
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-base flex flex-wrap items-center justify-between gap-sm">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Change Type
          </Button>
          <Button
            variant="primary"
            type="button"
            disabled={!canContinue}
            onClick={handleNext}
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
