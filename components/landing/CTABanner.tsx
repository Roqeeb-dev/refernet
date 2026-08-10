import Image from "next/image";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-base pb-2xl md:px-xl md:pb-3xl">
        <div className="relative h-[300px] overflow-hidden rounded-3xl sm:h-[340px] md:h-[380px]">
          <Image
            src="/hero-bg.jpg"
            alt="Hospital ward"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-900/70 to-green-900/20" />

          <div className="relative z-10 flex h-full flex-col justify-center px-lg py-lg sm:px-xl md:px-3xl">
            <div className="max-w-[85%] sm:max-w-[55vw] md:max-w-[38vw]">
              <h2 className="mb-base font-display font-bold leading-[1.15] text-text-inverse text-[clamp(1.5rem,4vw,2rem)]">
                Your facility&apos;s next referral shouldn&apos;t depend on a
                landline.
              </h2>
              <p className="mb-lg font-body text-green-100/90 text-[clamp(0.8125rem,1.6vw,0.875rem)]">
                Join 847 facilities already coordinating care digitally across
                12 states. Free to join, live in days.
              </p>
              <Link
                href="/register"
                className="inline-flex w-fit min-h-[48px] items-center justify-center rounded-full bg-white px-xl font-body text-body-md font-semibold text-green-900 transition-colors hover:bg-green-50"
              >
                Register your facility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
