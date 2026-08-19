export type ReferralDirection = "incoming" | "outgoing";

export type ReferralStatus =
  | "New"
  | "Pending"
  | "Accepted"
  | "Declined"
  | "In Transit"
  | "Completed"
  | "Closed";

export interface TimelineStep {
  title: string;
  time?: string;
  status: "completed" | "current" | "pending";
}

export interface FacilityInfo {
  id?: string;
  name: string;
  phone: string;
}

export interface DetailedReferral {
  id: string;
  referenceNumber: string;
  direction: ReferralDirection;
  status: ReferralStatus;
  urgency: "Emergency" | "Critical" | "Urgent" | "Routine";
  receivedTime: string;

  // Optional relational IDs from DB/API
  referring_facility_id?: string;
  receiving_facility_id?: string;

  // Facilities with id fields
  referringFacility: FacilityInfo;
  receivingFacility: FacilityInfo;

  // Patient
  patient: {
    fullName: string;
    age: string;
    sex: string;
    phone: string;
    nhiaNumber: string;
  };

  clinical: {
    chiefComplaint: string;
    diagnosis: string;
    clinicalHistory: string;
    vitals: {
      bp: string;
      hr: string;
      temp: string;
      rr: string;
      spO2: string;
    };
    currentMeds: string;
    previousMeds: string;
    interventions: string;
    reasonForReferral: string;
    additionalNotes: string;
  };

  attachments: Array<{
    name: string;
    url: string;
  }>;

  timeline: TimelineStep[];
}
