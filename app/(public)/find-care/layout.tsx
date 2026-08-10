import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const TABS = [
  {
    label: "Emergency",
    href: "/find-care/emergency",
    activeClass: "bg-status-emergency-only text-white",
  },
  {
    label: "Guided Care",
    href: "/find-care/guided-care",
    activeClass: "bg-green-700 text-white",
  },
];

export default function FindCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname) return null;

  return (
    <div className="flex min-h-dvh flex-col bg-green-50">
      {/* Header */}
      <div className="relative flex items-center justify-center border-b border-gray-200 bg-white px-base py-sm">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-base inline-flex h-9 items-center rounded-full border border-gray-200 px-base font-body text-body-sm font-medium text-text-primary transition-colors hover:bg-gray-50"
        >
          Back
        </button>
        <h1 className="font-display text-heading-md font-bold text-text-primary">
          Find Care
        </h1>
      </div>

      <div className="flex gap-xs bg-white p-sm">
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 rounded-full py-sm text-center font-body text-body-sm font-semibold transition-colors ${
                active
                  ? tab.activeClass
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-base sm:p-xl">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-green-900/20" />
        <div className="relative z-10 w-full max-w-[380px]">{children}</div>
      </div>
    </div>
  );
}
