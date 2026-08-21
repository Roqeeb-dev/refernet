"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLeftPanel from "@/components/admin/AuthLeftPanel";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { loginAdmin } from "@/services/admin-auth.service";
import { logAdminAction } from "@/services/admin-audit.service";
import { useAdminAuthStore } from "@/store/useAdminStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const setAdmin = useAdminAuthStore((s) => s.setAdmin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const { profile, error } = await loginAdmin({ email, password });

      if (error || !profile) {
        setErrorMsg(error || "Failed to sign in.");
        setIsSubmitting(false);
        return;
      }

      // 1. Update central store state
      setAdmin(profile);

      // 2. Capture audit log for successful login
      await logAdminAction({
        action: "Login Event",
        description: `Admin ${profile.fullName} logged in.`,
      });

      // 3. Redirect to Admin Dashboard
      router.push("/admin/dashboard");
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-100">
      {/* Split Screen Container strictly locked to screen view */}
      <div className="grid h-full w-full overflow-hidden bg-white lg:grid-cols-2">
        {/* Left Side: Reusable Hero Component */}
        <div className="hidden lg:block h-full">
          <AuthLeftPanel
            badgeText="INTERNAL OPERATIONS"
            title="Admin Portal"
            subtitle="ReferNet Operations"
            metrics={[
              { label: "48 facilities registered" },
              { label: "7 pending verification" },
              { label: "312 referrals this month" },
            ]}
          />
        </div>

        {/* Right Side: Form Content */}
        <div className="flex h-full flex-col justify-center overflow-y-auto p-md sm:p-xl lg:p-2xl">
          <div className="mx-auto w-full max-w-[440px]">
            {/* Form Title & Subtitle */}
            <div className="text-center lg:text-left">
              <h2 className="font-heading text-heading-md font-bold text-text-primary">
                Sign in to Admin Portal
              </h2>
              <p className="mt-xs font-body text-body-xs font-bold text-red-600">
                Internal use only. Unauthorised access is prohibited.
              </p>
            </div>

            {/* Error Message Banner */}
            {errorMsg && (
              <div
                role="alert"
                className="mt-md rounded-xl bg-red-50 p-sm border border-red-200 font-body text-caption font-bold text-red-700"
              >
                {errorMsg}
              </div>
            )}

            {/* Form Fields */}
            <form
              onSubmit={handleSubmit}
              className="mt-lg flex flex-col gap-base"
            >
              {/* Admin Email Input */}
              <Input
                label="Admin Email"
                type="email"
                placeholder="you@refernet.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password Input with Toggle */}
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-sm top-[38px] font-body text-caption font-bold text-text-disabled hover:text-text-primary"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* 2FA Notice Banner */}
              <div className="rounded-xl bg-blue-50/70 p-sm border border-blue-100 text-left">
                <p className="font-body text-caption leading-relaxed font-semibold text-blue-900">
                  <span className="mr-xs inline-block">🔒</span>
                  After signing in, you will receive a 6-digit code on your
                  registered phone. Two-factor authentication is mandatory for
                  all admin accounts.
                </p>
              </div>

              {/* Action Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || !email || !password}
                className="mt-xs w-full bg-emerald-800 hover:bg-emerald-900 text-white py-sm rounded-xl font-body text-body-xs font-bold"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <Link
                  href="/admin/forgot-password"
                  className="font-body text-body-xs font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </form>

            {/* Footer Disclaimer */}
            <p className="mt-lg text-center font-body text-caption font-medium text-text-disabled">
              Admin accounts are created only by Super Admins — never
              self-registered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
