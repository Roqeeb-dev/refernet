"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useAuth } from "@/hooks/useAuth";

type ViewState = "form" | "sent" | "resent";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { resetPassword, error } = useAuth();

  const [view, setView] = useState<ViewState>("form");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const success = await resetPassword(email);
    setSubmitting(false);
    if (success) setView("sent");
  }

  async function handleResend() {
    setResending(true);
    const success = await resetPassword(email);
    setResending(false);
    if (success) setView("resent");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-green-900 px-base py-2xl sm:px-xl">
      <Image src="/hero-bg.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-green-900/70" />

      <div className="relative z-10 w-full max-w-[420px] rounded-xl bg-white p-xl shadow-floating sm:p-2xl">
        {view === "form" && (
          <Link
            href="/login"
            aria-label="Back to login"
            className="mb-lg inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-text-primary transition-colors hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
          </Link>
        )}

        <div className="mx-auto mb-base flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <Mail size={22} className="text-green-700" />
        </div>

        {/* Step 1: request the reset link */}
        {view === "form" && (
          <>
            <h1 className="mb-xs text-center font-display text-heading-lg font-bold text-text-primary">
              Reset your password
            </h1>
            <p className="mb-lg text-center font-body text-body-sm text-text-secondary">
              Enter your email and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-base">
              <Input
                label="Email address"
                type="email"
                placeholder="you@hospital.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

              {error && (
                <p
                  role="alert"
                  className="font-body text-body-sm text-emergency"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={submitting}
              >
                Send Reset Link
              </Button>
            </form>

            <p className="mt-base text-center font-body text-caption text-text-secondary">
              If an account exists with this email, you&apos;ll receive a reset
              link within a few minutes.
            </p>
          </>
        )}

        {/* Step 2 & 3: confirmation states */}
        {(view === "sent" || view === "resent") && (
          <>
            <h1 className="mb-xs text-center font-display text-heading-lg font-bold text-text-primary">
              Check your email
            </h1>
            <p className="mb-lg text-center font-body text-body-sm text-text-secondary">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-semibold text-text-primary">{email}</span>.
              The link will expire in 60 minutes.
            </p>

            {view === "sent" ? (
              <div className="mb-base rounded-md border border-info/20 bg-info-light p-sm text-center">
                <p className="font-body text-body-sm text-info">
                  Didn&apos;t receive it? Check your spam folder or{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="font-semibold underline underline-offset-2 disabled:opacity-60"
                  >
                    {resending ? "Resending…" : "resend email"}
                  </button>
                </p>
              </div>
            ) : (
              <div className="mb-base rounded-md border border-info/20 bg-info-light p-sm text-center">
                <p className="font-body text-body-sm font-semibold text-info">
                  Email resent successfully!
                </p>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="mb-base font-body text-body-sm text-emergency"
              >
                {error}
              </p>
            )}

            <Button
              variant="outline"
              fullWidth
              onClick={() => router.push("/login")}
            >
              Back to Login
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
