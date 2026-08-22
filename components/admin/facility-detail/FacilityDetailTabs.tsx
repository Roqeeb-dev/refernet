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
    <div className="flex border-b border-slate-200 overflow-x-auto">
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`relative shrink-0 pb-3 pr-8 text-sm font-semibold transition-colors ${
              isActive
                ? "text-[#112A12]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 h-[2.5px] w-12 rounded-full bg-[#112A12]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
