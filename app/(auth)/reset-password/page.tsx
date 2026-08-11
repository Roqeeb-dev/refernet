"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useAuth } from "@/hooks/useAuth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { updatePassword, error } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError("");

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const success = await updatePassword(password);
    setSubmitting(false);

    if (success) setDone(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-green-900 px-base py-2xl sm:px-xl">
      <Image src="/hero-bg.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-green-900/70" />

      <div className="relative z-10 w-full max-w-[420px] rounded-xl bg-white p-xl shadow-floating sm:p-2xl">
        <div className="mx-auto mb-base flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <Lock size={22} className="text-green-700" />
        </div>

        {!done ? (
          <>
            <h1 className="mb-xs text-center font-display text-heading-lg font-bold text-text-primary">
              Set a new password
            </h1>
            <p className="mb-lg text-center font-body text-body-sm text-text-secondary">
              Choose a new password for your account.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-base">
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />

              {(validationError || error) && (
                <p
                  role="alert"
                  className="font-body text-body-sm text-emergency"
                >
                  {validationError || error}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={submitting}
              >
                Reset Password
              </Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="mb-xs text-center font-display text-heading-lg font-bold text-text-primary">
              Password updated
            </h1>
            <p className="mb-lg text-center font-body text-body-sm text-text-secondary">
              Your password has been reset successfully. You can now log in with
              your new password.
            </p>
            <Button
              variant="primary"
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
