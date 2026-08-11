"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { FacilityStatusValue } from "@/lib/facilityStatus";

interface DashboardShellProps {
  children: React.ReactNode;
  facilityName: string;
  status: FacilityStatusValue;
  lastUpdated: string;
  onStatusChange?: (status: FacilityStatusValue) => void;
}

export default function DashboardShell({
  children,
  facilityName,
  status,
  lastUpdated,
  onStatusChange,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          facilityName={facilityName}
          status={status}
          lastUpdated={lastUpdated}
          onMenuClick={() => setSidebarOpen(true)}
          onStatusChange={onStatusChange}
        />
        <main className="flex-1 px-base py-lg md:px-xl md:py-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
