import RegistrationHeader from "@/components/register/RegistrationHeader";
import RegistrationHydration from "@/components/register/RegistrationHydration";

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
