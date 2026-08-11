import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: replace with the authenticated facility's real data
  // (facility name, live status value, and last-updated timestamp)
  return (
    <DashboardShell
      facilityName="Lagos University Teaching Hospital"
      status="accepting"
      lastUpdated="13:08"
    >
      {children}
    </DashboardShell>
  );
}
