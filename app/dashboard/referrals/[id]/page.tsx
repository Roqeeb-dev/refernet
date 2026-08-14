import { DetailedReferral } from "@/lib/referral-types";
import ReferralDetailView from "@/components/new-referral/ReferralDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReferralDetailPage({ params }: PageProps) {
  const { id } = await params;

  const mockReferralData: DetailedReferral = {
    id,
    referenceNumber: id.startsWith("RN-") ? id : `RN-${id}`,
    direction: "incoming", // Switch to "outgoing" to preview the outgoing layout & actions
    status: "New",
    urgency: "Emergency",
    receivedTime: "Today, 2:30 PM",

    referringFacility: {
      name: "General Hospital Ikeja",
      phone: "08012345678",
    },
    receivingFacility: {
      name: "Lagos University Teaching Hospital",
      phone: "08012345678",
    },

    patient: {
      fullName: "Amina Okonkwo",
      age: "34 years",
      sex: "Female",
      phone: "08012345678",
      nhiaNumber: "NHIA/LAG/0042",
    },

    clinical: {
      chiefComplaint:
        "Severe chest pain radiating to left arm with diaphoresis and shortness of breath",
      diagnosis: "Acute Myocardial Infarction (STEMI)",
      clinicalHistory:
        "Patient presented with sudden onset chest pain 2 hours ago. History of hypertension and type 2 diabetes. Father died of cardiac arrest at 58.",
      vitals: {
        bp: "160/100",
        hr: "110",
        temp: "37.2",
        rr: "24",
        spO2: "94",
      },
      currentMeds:
        "Aspirin 300mg stat, Clopidogrel 600mg stat, Oxygen via face mask at 6L/min",
      previousMeds: "Amlodipine 10mg OD, Metformin 500mg BD, Lisinopril 5mg OD",
      interventions:
        "12-lead ECG performed (STEMI confirmed), IV access established × 2, oxygen initiated",
      reasonForReferral:
        "Patient requires urgent cardiac catheterisation and possible PCI. Our facility does not have a catheterisation lab or interventional cardiology team.",
      additionalNotes:
        "Patient is haemodynamically stable but deteriorating. Family is aware of the referral.",
    },

    attachments: [
      {
        name: "ECG_Amina_Okonkwo.pdf",
        url: "#",
      },
    ],

    timeline: [
      {
        title: "Sent by referring facility",
        time: "Today, 2:30 PM",
        status: "completed",
      },
      {
        title: "Received",
        time: "Today, 2:30 PM",
        status: "completed",
      },
      {
        title: "Accepted",
        status: "current",
      },
      {
        title: "Outcome Recorded",
        status: "pending",
      },
      {
        title: "Closed",
        status: "pending",
      },
    ],
  };

  return <ReferralDetailView referral={mockReferralData} />;
}
