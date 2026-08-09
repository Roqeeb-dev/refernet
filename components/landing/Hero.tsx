import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-base pt-xl md:px-xl md:pt-2xl">
        <div className="relative min-h-[440px] overflow-hidden rounded-lg sm:min-h-[500px] md:min-h-[600px]">
          <img
            src="/hero-bg.jpg"
            alt="Hospital corridor"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-900/55 to-green-900/10" />

          <div className="absolute inset-0 flex flex-col justify-end p-lg sm:p-xl md:p-3xl">
            <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-lg lg:max-w-xl">
              <p className="mb-sm font-body text-overline uppercase text-green-100">
                Referral Network
              </p>

              <h1 className="mb-base font-display text-3xl font-bold leading-[1.1] text-text-inverse sm:text-4xl md:text-5xl lg:text-display-xl">
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

              <div className="flex flex-col gap-sm xs:flex-row sm:flex-wrap sm:gap-base">
                <Link
                  href="#facilities"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-green-500 px-xl text-center font-body text-body-md font-semibold text-text-inverse transition-colors hover:bg-green-700"
                >
                  Find Facilities Nearby
                </Link>
                <Link
                  href="#emergency"
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
