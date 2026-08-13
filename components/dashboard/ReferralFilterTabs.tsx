export interface FilterTab {
  value: string;
  label: string;
  count: number;
}

export default function ReferralFilterTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: FilterTab[];
  activeTab: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-xs border-b border-gray-100 pb-sm">
      {tabs.map((tab) => {
        const active = tab.value === activeTab;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`inline-flex items-center gap-xs rounded-full px-base py-xs font-body text-body-sm font-semibold transition-colors ${
              active
                ? "bg-green-900 text-white"
                : "text-text-secondary hover:bg-gray-50"
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-xs font-body text-caption font-semibold ${
                active
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-text-secondary"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
