"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";

export default function LoginForm() {
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
      <div className="absolute inset-0 bg-green-900/35" />

      {/* Login card — frosted glass over the background image */}
      <div className="relative z-10 w-full max-w-[420px] rounded-xl border border-white/20 bg-white/5 p-xl shadow-floating backdrop-blur-2xl sm:p-2xl">
        <Link
          href="/"
          aria-label="Back to home"
          className="mb-base inline-flex h-8 w-8 items-center justify-center text-text-inverse transition-opacity hover:opacity-70"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="mb-xl text-center">
          <p className="font-display text-heading-xl font-bold text-green-900">
            ReferNet NG
          </p>
          <div className="mx-auto mt-xs h-px w-10 bg-green-900/40" />
        </div>

        <div className="mb-lg text-center">
          <h1 className="mb-xs font-display text-heading-xl font-bold text-text-inverse">
            Welcome Back
          </h1>
          <p className="font-body text-body-sm text-white/80">
            Log in to your facility dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-base">
          <div className="flex flex-col gap-xs">
            <label
              htmlFor="email"
              className="font-body text-body-sm font-semibold text-text-inverse"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@hospital.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="bg-white"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label
              htmlFor="password"
              className="font-body text-body-sm font-semibold text-text-inverse"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-xs font-body text-body-sm text-text-inverse">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-white/40 bg-transparent text-green-700 focus:ring-green-500"
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

        <p className="mt-lg text-center font-body text-body-sm text-white/80">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-800 hover:underline"
          >
            Create one here
          </Link>
        </p>
      </div>
    </main>
  );
}
