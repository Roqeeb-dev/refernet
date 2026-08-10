const STEPS = [
  {
    number: "01",
    title: "Share your location",
    description:
      "No account, no forms. Just allow location access and we find what's near you in seconds.",
  },
  {
    number: "02",
    title: "Get matched, not just listed",
    description:
      "Filtered by specialty and live capacity — only facilities that can actually see you today.",
  },
  {
    number: "03",
    title: "Facility confirms, you go",
    description:
      "Get directions instantly, or alert the hospital you're on your way with one tap.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-base py-2xl md:px-xl md:py-3xl">
        {/* Header row */}
        <div className="mb-xl flex flex-col gap-base md:mb-2xl md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-sm font-body text-overline uppercase text-green-700">
              How It Works
            </p>
            <h2 className="font-display text-heading-xl font-bold leading-[1.1] text-green-900 md:text-display-lg">
              Three steps,
              <br />
              no phone tree.
            </h2>
          </div>
          <p className="font-body text-body-md text-text-secondary md:text-right">
            From location to confirmed care in under two minutes — built for
            real emergencies and everyday needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-lg bg-white p-xl shadow-raised"
            >
              <div className="mb-lg flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <span className="font-body text-body-sm font-semibold text-green-700">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-sm font-display text-heading-md font-bold text-green-900">
                {step.title}
              </h3>
              <p className="font-body text-body-sm text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
