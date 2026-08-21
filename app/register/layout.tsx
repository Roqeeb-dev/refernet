import RegistrationHeader from "@/components/register/RegistrationHeader";
import RegistrationHydration from "@/components/register/RegistrationHydration";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Facility",
  description:
    "Create a new facility account to send and receive electronic referrals across Nigeria.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <RegistrationHydration />
      <RegistrationHeader />
      <main className="mx-auto max-w-6xl px-base py-2xl md:px-xl">
        {children}
      </main>
    </div>
  );
}
