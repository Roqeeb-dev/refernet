const STATS = [
  { value: "847", label: "Facilities in network" },
  { value: "12", label: "States covered" },
  { value: "24/7", label: "Emergency dispatch" },
  { value: "6.2k+", label: "Referrals completed" },
];

export default function StatsBar() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-base pb-2xl pt-xl md:px-xl md:pb-3xl">
        <div className="grid grid-cols-2 gap-lg border-t border-green-100 pt-xl md:grid-cols-4 md:gap-xl">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-heading-xl font-bold text-green-900 md:text-display-lg">
                {stat.value}
              </p>
              <p className="mt-xs font-body text-body-sm text-text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
