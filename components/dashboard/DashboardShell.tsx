// components/dashboard/DashboardShell.tsx
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardShellProps {
  children: React.ReactNode;
  facilityName: string;
  statusLabel: string;
  lastUpdated: string;
}

export default function DashboardShell({
  children,
  facilityName,
  statusLabel,
  lastUpdated,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          facilityName={facilityName}
          statusLabel={statusLabel}
          lastUpdated={lastUpdated}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 px-base py-lg md:px-xl md:py-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
