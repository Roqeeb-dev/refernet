import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TILES = [
  {
    key: "teaching-hospital",
    image: "/lasuth-image.jpg",
    eyebrow: "Teaching Hospital",
    title: "Lagos University Teaching Hospital",
    span: "big",
  },
  {
    key: "ae",
    image: "/ae-image.jpg",
    eyebrow: "Emergency",
    title: "A&E Department",
    span: "small",
  },
  {
    key: "specialist",
    image: "/specialist-image.jpg",
    eyebrow: "Specialist Clinic",
    title: "Specialist Consultation",
    span: "small",
  },
  {
    key: "maternity",
    image: "/maternity-image.jpg",
    eyebrow: "Maternity",
    title: "Maternity & Mother Care",
    span: "small",
  },
] as const;

export default function FacilityShowcase() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-base py-2xl md:px-xl md:py-3xl">
        {/* Header */}
        <div className="mb-xl md:mb-2xl">
          <p className="mb-sm font-body text-overline uppercase text-green-700">
            Built for Nigeria
          </p>
          <h2 className="font-display text-heading-xl font-bold leading-[1.1] text-green-900 md:text-display-lg">
            One platform,
            <br />
            every kind of facility.
          </h2>
        </div>

        {/* Tile grid */}
        <div className="grid grid-cols-1 gap-lg sm:grid-cols-3 sm:grid-rows-2 sm:h-[520px]">
          {TILES.map((tile) =>
            tile.span === "big" ? (
              <div
                key={tile.key}
                className="group relative min-h-[240px] overflow-hidden rounded-2xl sm:row-span-2 sm:min-h-0"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-lg">
                  <p className="mb-xs font-body text-overline uppercase text-green-100">
                    {tile.eyebrow}
                  </p>
                  <p className="font-display text-heading-sm font-semibold text-text-inverse">
                    {tile.title}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={tile.key}
                className="group relative min-h-[140px] overflow-hidden rounded-2xl sm:min-h-0"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/85 via-green-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-base">
                  <p className="mb-xs font-body text-overline uppercase text-green-100">
                    {tile.eyebrow}
                  </p>
                  <p className="font-display text-body-lg font-semibold text-text-inverse">
                    {tile.title}
                  </p>
                </div>
              </div>
            ),
          )}

          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#06331A] p-6 text-white shadow-sm sm:min-h-0">
            {/* Decorative background circles */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-[176px] w-[176px] rounded-full bg-white/[0.04]" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-[128px] w-[128px] rounded-full bg-white/[0.04]" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h3 className="mb-2 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Not sure where to go?
                </h3>
                <p className="font-body text-xs font-normal leading-relaxed text-emerald-100/70 sm:text-sm">
                  Our guided care tool finds the right facility level for your
                  symptoms — no medical knowledge needed.
                </p>
              </div>

              <Link
                href="/find-care/guided-care"
                aria-label="Start guided care"
                className="mt-4 inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#A8E6CF] text-[#06331A] transition-transform hover:scale-105 active:scale-95"
              >
                <ArrowRight size={20} strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
