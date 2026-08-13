"use client";

import { useMemo, useState } from "react";
import ReferralFilterTabs from "@/components/dashboard/ReferralFilterTabs";
import ReferralsTable, {
  type ReferralRow,
} from "@/components/dashboard/ReferralsTable";

const MOCK_INCOMING_REFERRALS: ReferralRow[] = [
  {
    id: "1",
    reference: "RN-2847",
    facilityName: "General Hospital Ikeja",
    patientName: "Amina Okonkwo",
    patientAge: 34,
    patientGender: "Female",
    urgency: "emergency",
    status: "new",
    receivedAt: "Today, 2:30 PM",
  },
  {
    id: "2",
    reference: "RN-2841",
    facilityName: "Reddington Hospital",
    patientName: "Emmanuel Nwachukwu",
    patientAge: 52,
    patientGender: "Male",
    urgency: "critical",
    status: "accepted",
    receivedAt: "Today, 10:15 AM",
  },
  {
    id: "3",
    reference: "RN-2835",
    facilityName: "St Nicholas Hospital",
    patientName: "Fatima Abdullahi",
    patientAge: 28,
    patientGender: "Female",
    urgency: "urgent",
    status: "arrived",
    receivedAt: "Yesterday, 4:00 PM",
  },
  {
    id: "4",
    reference: "RN-2829",
    facilityName: "Lagos Island General Hospital",
    patientName: "Chidi Eze",
    patientAge: 45,
    patientGender: "Male",
    urgency: "routine",
    status: "closed",
    receivedAt: "2 days ago",
  },
  {
    id: "5",
    reference: "RN-2824",
    facilityName: "General Hospital Victoria Island",
    patientName: "Blessing Obi",
    patientAge: 31,
    patientGender: "Female",
    urgency: "emergency",
    status: "declined",
    receivedAt: "3 days ago",
  },
  {
    id: "6",
    reference: "RN-2818",
    facilityName: "General Hospital Badagry",
    patientName: "Oluwaseun Adeyemi",
    patientAge: 19,
    patientGender: "Male",
    urgency: "urgent",
    status: "new",
    receivedAt: "Today, 8:45 AM",
  },
];

const CLOSED_GROUP: ReferralRow["status"][] = ["closed", "declined"];

export default function IncomingReferralsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const counts = useMemo(() => {
    return {
      all: MOCK_INCOMING_REFERRALS.length,
      new: MOCK_INCOMING_REFERRALS.filter((r) => r.status === "new").length,
      accepted: MOCK_INCOMING_REFERRALS.filter((r) => r.status === "accepted")
        .length,
      arrived: MOCK_INCOMING_REFERRALS.filter((r) => r.status === "arrived")
        .length,
      closed: MOCK_INCOMING_REFERRALS.filter((r) =>
        CLOSED_GROUP.includes(r.status),
      ).length,
    };
  }, []);

  const filteredReferrals = useMemo(() => {
    if (activeTab === "all") return MOCK_INCOMING_REFERRALS;
    if (activeTab === "closed") {
      return MOCK_INCOMING_REFERRALS.filter((r) =>
        CLOSED_GROUP.includes(r.status),
      );
    }
    return MOCK_INCOMING_REFERRALS.filter((r) => r.status === activeTab);
  }, [activeTab]);

  const newCount = counts.new;

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-sm">
        <h1 className="font-display text-heading-lg font-bold text-text-primary">
          Incoming Referrals
        </h1>
        {newCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-info-light px-base py-xs font-body text-caption font-semibold text-info">
            {newCount} New
          </span>
        )}
      </div>

      <ReferralFilterTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { value: "all", label: "All", count: counts.all },
          { value: "new", label: "New", count: counts.new },
          { value: "accepted", label: "Accepted", count: counts.accepted },
          { value: "arrived", label: "Arrived", count: counts.arrived },
          { value: "closed", label: "Closed", count: counts.closed },
        ]}
      />

      <ReferralsTable
        referrals={filteredReferrals}
        facilityColumnLabel="Referring Facility"
      />
    </div>
  );
}
