"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const success = await signIn(email, password);
    setSubmitting(false);
    if (success) router.push("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-green-900 px-base py-2xl sm:px-xl">
      <Image src="/hero-bg.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-green-900/70" />

      {/* Back to home */}
      <Link
        href="/"
        aria-label="Back to home"
        className="absolute left-lg top-lg z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-text-inverse backdrop-blur transition-colors hover:bg-white/20 sm:left-xl sm:top-xl"
      >
        <ArrowLeft />
      </Link>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[400px] rounded-lg bg-white/95 p-xl shadow-floating backdrop-blur sm:p-2xl">
        <p className="mb-lg text-center font-display text-heading-lg font-bold text-green-900">
          ReferNet NG
        </p>

        <div className="mb-lg text-center">
          <h1 className="mb-xs font-display text-heading-xl font-bold text-green-900">
            Welcome Back
          </h1>
          <p className="font-body text-body-sm text-text-secondary">
            Log in to your facility dashboard
          </p>
        </div>

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
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-xs font-body text-body-sm text-text-secondary">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-200 text-green-700 focus:ring-green-500"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="font-body text-body-sm font-medium text-emergency hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <p role="alert" className="font-body text-body-sm text-emergency">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={submitting}
          >
            Log In
          </Button>
        </form>

        <p className="mt-lg text-center font-body text-body-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-700 hover:underline"
          >
            Create one here
          </Link>
        </p>
      </div>
    </main>
  );
}
