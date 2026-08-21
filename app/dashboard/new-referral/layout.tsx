import Link from "next/link";
import { X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Referral",
  description:
    "Create and dispatch a new patient referral to another healthcare facility.",
};

export default function NewReferralLayout({
  children,
}: LayoutProps<"/dashboard/new-referral">) {
  return (
    <div className="flex min-h-dvh flex-col bg-gray-100">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-base py-sm shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-xs rounded-full border border-gray-200 px-base py-xs font-body text-body-sm font-medium text-text-secondary transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-text-primary"
          >
            <X size={14} />
            Exit
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
