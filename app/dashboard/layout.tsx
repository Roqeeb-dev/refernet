import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: replace with the authenticated facility's real data
  // (facility name, live status, and last-updated timestamp)
  return (
    <DashboardShell
      facilityName="Lagos University Teaching Hospital"
      statusLabel="Accepting Referrals"
      lastUpdated="13:08"
    >
      {children}
    </DashboardShell>
  );
}
