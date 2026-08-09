import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-base pt-xl md:px-xl md:pt-2xl">
        <div className="relative flex min-h-[420px] items-end overflow-hidden rounded-lg md:min-h-[540px]">
          {/* Background image — replace src with a real facility/corridor photo */}
          <img
            src="/hero-bg.jpg"
            alt="Hospital corridor"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-900/55 to-green-900/10" />

          <div className="relative z-10 max-w-xl p-xl md:p-3xl">
            <p className="mb-sm font-body text-overline uppercase text-green-100">
              Referral Network
            </p>
            <h1 className="mb-base font-display text-display-lg font-bold leading-[1.05] text-text-inverse md:text-display-xl">
              Find the Right
              <br />
              Care. Faster.
            </h1>

            <div className="mb-lg flex items-center gap-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="font-body text-body-sm text-green-100">
                847 facilities live now
              </span>
            </div>

            <div className="flex flex-wrap gap-base">
              <Link
                href="#facilities"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-green-500 px-xl font-body text-body-md font-semibold text-text-inverse transition-colors hover:bg-green-700"
              >
                Find Facilities Nearby
              </Link>
              <Link
                href="#emergency"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/40 px-xl font-body text-body-md font-semibold text-text-inverse transition-colors hover:bg-white/10"
              >
                Emergency Help Request
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
