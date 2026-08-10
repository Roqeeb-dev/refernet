import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-base pt-xl md:px-xl md:pt-2xl">
        <div className="relative h-[clamp(400px,55vw,500px)] overflow-hidden rounded-3xl">
          <Image
            src="/hero-bg.jpg"
            alt="Hospital corridor"
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-900/55 to-green-900/10" />

          <div className="absolute inset-0 flex flex-col justify-end p-lg sm:p-xl md:p-3xl">
            <div className="max-w-[85%] sm:max-w-[60vw] md:max-w-[45vw] lg:max-w-[38vw]">
              <p className="mb-sm font-body text-overline uppercase text-green-100">
                Referral Network
              </p>

              <h1 className="mb-base font-display font-bold leading-[1.1] text-text-inverse text-[clamp(1.75rem,5vw,2.5rem)]">
                Find the Right Care. Faster.
              </h1>

              <div className="mb-lg flex items-center gap-xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="font-body text-body-sm text-green-100">
                  847 facilities live now
                </span>
              </div>

              <div className="flex flex-wrap gap-sm sm:gap-base">
                <Link
                  href="#facilities"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-green-500 px-xl text-center font-body text-body-md font-semibold text-text-inverse transition-colors hover:bg-green-700"
                >
                  Find Facilities Nearby
                </Link>
                <Link
                  href="/emergency"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/40 px-xl text-center font-body text-body-md font-semibold text-text-inverse transition-colors hover:bg-white/10"
                >
                  Emergency Help Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
