export default function ProfileSectionCard({
  title,
  subtitle,
  headerAction,
  children,
}: {
  title: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-lg">
      <div className="mb-base flex items-start justify-between gap-base">
        <div>
          <h2 className="font-display text-heading-md font-bold text-text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-[2px] font-body text-body-sm text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>
        {headerAction}
      </div>
      {children}
    </section>
  );
}
