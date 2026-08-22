export type FacilityTabKey =
  | "profile"
  | "documents"
  | "referral-activity"
  | "decline-history"
  | "admin-notes"
  | "audit-log";

interface Tab {
  key: FacilityTabKey;
  label: string;
}

const TABS: Tab[] = [
  { key: "profile", label: "Profile" },
  { key: "documents", label: "Documents" },
  { key: "referral-activity", label: "Referral Activity" },
  { key: "decline-history", label: "Decline History" },
  { key: "admin-notes", label: "Admin Notes" },
  { key: "audit-log", label: "Audit Log" },
];

interface FacilityDetailTabsProps {
  activeTab: FacilityTabKey;
  onChange: (tab: FacilityTabKey) => void;
}

export default function FacilityDetailTabs({
  activeTab,
  onChange,
}: FacilityDetailTabsProps) {
  return (
    <div className="mt-md flex items-center gap-lg border-b border-gray-100 overflow-x-auto">
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`shrink-0 whitespace-nowrap border-b-2 py-sm font-body text-body-sm font-semibold transition-colors ${
              isActive
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
