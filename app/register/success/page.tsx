"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, Mail, Search, Building2 } from "lucide-react";
import Button from "@/components/shared/Button";
import { useRegistrationStore } from "@/store/useRegistrationStore";

export default function RegistrationSuccessPage() {
  const router = useRouter();
  const { basicDetails, reset } = useRegistrationStore();

  const facilityName = basicDetails.facilityName || "Your facility";
  const email = basicDetails.officialEmail || "your registered email";

  function handleBackHome() {
    reset();
    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-base py-2xl sm:px-xl">
      <div className="w-full max-w-[420px] rounded-lg bg-white p-xl text-center shadow-raised sm:p-2xl">
        <div className="mx-auto mb-lg flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={32} className="text-green-700" />
        </div>

        <h1 className="mb-sm font-display text-heading-xl font-bold text-green-900">
          Application Submitted!
        </h1>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          <span className="font-semibold text-text-primary">
            {facilityName}
          </span>{" "}
          has been registered on ReferNet. Our team will review your documents
          and verify your facility within 48 hours.
        </p>

        <div className="mb-xl rounded-md border border-gray-200 bg-green-50/50 p-base text-left">
          <p className="mb-base font-body text-overline font-semibold uppercase tracking-wide text-green-700">
            What happens next
          </p>
          <ul className="flex flex-col gap-base">
            <li className="flex items-start gap-sm">
              <Mail
                size={16}
                className="mt-[2px] shrink-0 text-text-secondary"
              />
              <span className="font-body text-body-sm text-text-secondary">
                A confirmation has been sent to{" "}
                <span className="font-medium text-text-primary">{email}</span>
              </span>
            </li>
            <li className="flex items-start gap-sm">
              <Search
                size={16}
                className="mt-[2px] shrink-0 text-text-secondary"
              />
              <span className="font-body text-body-sm text-text-secondary">
                Our team reviews your documents (up to 48 hours)
              </span>
            </li>
            <li className="flex items-start gap-sm">
              <CheckCircle2
                size={16}
                className="mt-[2px] shrink-0 text-green-700"
              />
              <span className="font-body text-body-sm text-text-secondary">
                You receive login credentials via email upon approval
              </span>
            </li>
            <li className="flex items-start gap-sm">
              <Building2
                size={16}
                className="mt-[2px] shrink-0 text-text-secondary"
              />
              <span className="font-body text-body-sm text-text-secondary">
                First login — set your availability and go live
              </span>
            </li>
          </ul>
        </div>

        <Button variant="primary" type="button" onClick={handleBackHome}>
          Back to Home
        </Button>
      </div>
    </main>
  );
}
