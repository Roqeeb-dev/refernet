"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Info } from "lucide-react";
import Button from "@/components/shared/Button";
import FileUpload from "@/components/shared/FileUpload";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { REGISTRATION_STEPS } from "@/lib/registrationSteps";
import { submitFacilityRegistration } from "@/services/register.service";

const REQUIREMENTS = [
  "CAC Certificate of Incorporation",
  "Licence of Operation (from state MOH)",
  "MDCN / MDC Practice Certificate",
  "Documents are reviewed by ReferNet within 48 hours",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-sm font-body text-overline font-semibold uppercase tracking-wide text-green-700">
      {children}
    </p>
  );
}

export default function DocumentsPage() {
  const router = useRouter();
  const {
    documents,
    setDocuments,
    basicDetails,
    location,
    capacity,
    services,
    completeStep,
  } = useRegistrationStore();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (
      !documents.cacCertificateUrl ||
      !documents.operationLicenseUrl ||
      !documents.practiceCertificateUrl
    ) {
      setError("Please upload all required documents.");
      return;
    }

    setError("");
    setSubmitting(true);

    const { error: submitError } = await submitFacilityRegistration({
      basicDetails,
      location,
      capacity,
      services,
      documents,
    });

    setSubmitting(false);

    if (submitError) {
      setError(submitError);
      return;
    }

    completeStep(5);
    router.push("/register/success");
  }

  return (
    <div className="grid gap-xl lg:grid-cols-[1fr_320px]">
      {/* Form */}
      <div className="rounded-lg bg-white p-xl">
        <h1 className="font-display text-heading-lg font-bold text-text-primary">
          Documents
        </h1>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Upload the documents required for verification.
        </p>

        <section>
          <SectionLabel>Required Verification Documents</SectionLabel>
          <p className="mb-base font-body text-body-sm text-text-secondary">
            Upload clear, unredacted scans or photos. All documents are reviewed
            by the ReferNet team within 48 hours.
          </p>

          <div className="flex flex-col gap-lg">
            <FileUpload
              label="CAC Certificate of Incorporation"
              required
              folder="cac-certificates"
              value={documents.cacCertificateUrl}
              onUploadComplete={(path) =>
                setDocuments({ cacCertificateUrl: path || undefined })
              }
            />
            <FileUpload
              label="Licence of Operation (State Ministry of Health)"
              required
              folder="operation-licenses"
              value={documents.operationLicenseUrl}
              onUploadComplete={(path) =>
                setDocuments({ operationLicenseUrl: path || undefined })
              }
            />
            <FileUpload
              label="MDCN / MDC Practice Certificate"
              required
              folder="practice-certificates"
              value={documents.practiceCertificateUrl}
              onUploadComplete={(path) =>
                setDocuments({ practiceCertificateUrl: path || undefined })
              }
            />
          </div>

          <div className="mt-lg flex items-start gap-sm rounded-md border border-info-light bg-info-light p-base">
            <Info size={16} className="mt-[2px] shrink-0 text-info" />
            <p className="font-body text-body-sm text-info">
              By submitting, you confirm that all information provided is
              accurate and that the documents are authentic. Submitting false
              documents may result in legal action.
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-sm font-body text-body-sm text-emergency"
            >
              {error}
            </p>
          )}
        </section>

        <div className="mt-xl flex items-center justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push(REGISTRATION_STEPS[3].path)}
            disabled={submitting}
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            isLoading={submitting}
          >
            Submit Application
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="h-fit rounded-lg bg-green-50 p-lg">
        <div className="mb-base flex items-center gap-xs">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 font-body text-caption font-semibold text-text-inverse">
            5
          </span>
          <span className="font-body text-body-sm font-semibold text-text-primary">
            Step 5 of 5
          </span>
        </div>

        <h2 className="mb-sm font-body text-body-md font-semibold text-text-primary">
          Required documents
        </h2>
        <ul className="flex flex-col gap-sm">
          {REQUIREMENTS.map((item) => (
            <li key={item} className="flex items-start gap-xs">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
              <span className="font-body text-body-sm text-text-secondary">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-base flex items-start gap-xs rounded-md border border-green-100 bg-white p-sm">
          <ShieldCheck size={16} className="mt-[2px] shrink-0 text-green-700" />
          <p className="font-body text-caption text-text-secondary">
            Your data is encrypted and only shared with the ReferNet
            verification team.
          </p>
        </div>
      </aside>
    </div>
  );
}
