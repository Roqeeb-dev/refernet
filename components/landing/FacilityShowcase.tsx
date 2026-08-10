import Image from "next/image";
import Link from "next/link";

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

        {/* Tile grid: big tile spans both rows on col 1, remaining 4 cells fill 2x2 */}
        <div className="grid grid-cols-1 gap-lg sm:grid-cols-3 sm:grid-rows-2 sm:h-[520px]">
          {TILES.map((tile) =>
            tile.span === "big" ? (
              <div
                key={tile.key}
                className="group relative min-h-[240px] overflow-hidden rounded-lg sm:row-span-2 sm:min-h-0"
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
                className="group relative min-h-[140px] overflow-hidden rounded-lg sm:min-h-0"
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

          {/* CTA tile */}
          <div className="flex min-h-[140px] flex-col justify-between rounded-lg bg-green-900 p-lg sm:min-h-0">
            <div>
              <h3 className="mb-xs font-display text-heading-sm font-bold text-text-inverse">
                Not sure where to go?
              </h3>
              <p className="font-body text-body-sm text-green-100">
                Our guided care tool finds the right facility level for your
                symptoms — no medical knowledge needed.
              </p>
            </div>
            <Link
              href="#guided-care"
              aria-label="Start guided care"
              className="mt-base inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-text-inverse transition-colors hover:bg-green-700"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
