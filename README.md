# ReferNet

**Hospital Finder & Digital Healthcare Facility Referral Portal — MVP**

ReferNet is a digital healthcare coordination platform built for Nigeria's fragmented healthcare environment. It helps patients and caregivers find the right facility to seek care, and helps healthcare providers coordinate patient referrals digitally instead of relying on paper forms and phone calls.

---

## The Problem

Discovery research with 16 healthcare providers across 11 Nigerian states found:

- **81.25%** had sent a patient to another facility without confirming that facility had capacity to receive them.
- **56.25%** had experienced a patient being turned away on arrival.
- **0** respondents reported using a digital referral coordination system — handwritten referral letters remain the dominant artifact.

The gap isn't the absence of a digital referral _form_. It's the absence of a reliable **patient navigation and facility-to-facility coordination layer**.

---

## What ReferNet Does

ReferNet ships two interconnected capabilities in its MVP:

### 1. Hospital Finder / Smart Care Navigation

Helps patients and caregivers identify an appropriate facility based on location, urgency, care needs, and real-time facility availability — no medical knowledge required.

| Pathway                       | For                                                        | Flow                                                                                            |
| ----------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Emergency Mode**            | Users who need immediate care                              | Location → Nearby facilities → Availability → Call / Directions / Optional Alert                |
| **Guided Care Navigation**    | Users unsure what level of care they need                  | Health concern → Guided questions → Recommended care level → Facilities → Availability → Action |
| **Voice-Assisted Navigation** | Users with limited digital literacy or who prefer speaking | Voice input → Interpretation → Urgency assessment → Recommendation → Facilities → Action        |

**Emergency Mode requires no login, no registration, and no symptom questionnaire.** Access to care is never delayed by data collection.

Facility availability is always shown as one of:

- 🟢 Open & Accepting
- 🟠 Limited Capacity
- 🟠 Emergency Only
- 🔴 Unavailable

### 2. Healthcare Facility Referral Portal

Lets healthcare facilities create, send, receive, and track patient referrals digitally, with essential clinical information traveling with the patient.

```
New Referral → Patient Info → Clinical Info → Select Receiving Facility
→ Review → Confirm → Sent → Accepted/Declined → Patient Arrives
→ Outcome Recorded → Closed
```

Key capabilities:

- Auto-populated facility identity from the authenticated account
- Required patient & clinical fields (urgency, chief complaint, diagnosis, history, vitals, medications, prior treatment, reason for referral)
- Optional diagnostic document upload
- **Parallel paper-referral pathway** — facilities can photograph/attach existing paper forms instead of abandoning them outright
- Referral coordinators can act on behalf of a facility (`Created by [Coordinator] on behalf of [Facility]`)
- Full timestamped audit trail: creation → selection → accept/decline → status changes → arrival → outcome → closure

---

## Clinical Safety Boundaries

ReferNet is a **navigation and coordination tool, not a diagnostic tool.**

- Guided Care Navigation provides decision support only — it never tells a user they have a specific condition.
- Voice-assisted input may structure symptoms and flag urgency, but must never present an AI-generated diagnosis as clinical fact.
- Any response indicating potentially serious symptoms immediately escalates the user to the Emergency pathway.
- AI-assisted symptom navigation is explicitly **out of scope** for MVP pending clinical validation (see [Roadmap](#roadmap)).

---

## Who It's For

|               | Hospital Finder                               | Referral Portal                                             |
| ------------- | --------------------------------------------- | ----------------------------------------------------------- |
| **Primary**   | Patients, caregivers/family members           | Referring & receiving facility staff, referral coordinators |
| **Secondary** | Community members, patients with basic phones | Hospital administrators, MORES/referral coordinators        |

Initial facility scope: participating PHCs, general hospitals, specialist hospitals, and tertiary hospitals — the workflow is not limited to PHC → tertiary referrals.

---

## Success Metrics

ReferNet is measured on outcomes, not activity. Referral count and hospital-listing count are explicitly **not** treated as primary success metrics.

**North Star:** % of patients who successfully reach an appropriate facility without an avoidable failed visit.

| Objective                      | KPI                                                        |
| ------------------------------ | ---------------------------------------------------------- |
| Improve navigation             | % of users who successfully identify a facility            |
| Reduce wasted journeys         | % of facilities shown unavailable/limited before selection |
| Improve referral completion    | Referral acceptance rate                                   |
| Improve coordination           | % of referrals with confirmed patient arrival              |
| Improve information continuity | % of referrals containing all mandatory clinical fields    |
| Reduce rejection               | Referral rejection rate                                    |
| Improve workflow efficiency    | Median time to complete a referral                         |
| Adoption                       | Monthly active referring/receiving facilities              |
| User experience                | Provider task-success / satisfaction score                 |

---

## MVP Scope

**Must Have**

- Nigerian facility directory covering all 36 states + FCT
- Four-tier facility availability status
- Location-based search with state/city/area filtering
- Emergency facility finder + non-emergency care-level navigation
- External directions/navigation, optional pre-arrival alert
- Referral creation with mandatory clinical fields + auto-populated facility ID
- Optional document upload + paper-referral upload fallback
- Receiving-facility queue with accept/decline workflow
- Patient arrival confirmation, outcome recording, referral status timeline
- Full audit trail, role-based access
- Mobile-first, responsive interface
- Offline-safe draft capability for referral forms

**Should Have** — specialty search, referral notifications, reference codes, facility status management, coordinator workflow

**Could Have (later MVP iteration)** — multilingual voice assistance, AI-assisted symptom navigation, automated referral quality checks

**Out of Scope for MVP** — AI clinical decision-making, specialist teleconsultation, chronic disease records, government analytics dashboards, USSD workflows, WhatsApp clinical consultation, NHIA/HMO claims, ambulance dispatch

---

## Non-Functional Requirements

- **Mobile-first**, optimized for Android smartphones
- Core referral workflows remain usable under **intermittent connectivity**
- Fast load times under typical Nigerian mobile-network conditions
- Patient data protected via authentication, authorization, encryption, and audit logging
- Facility status always displays its **last-updated timestamp**
- High-contrast status indicators, large touch targets, clear typography
- Architecture designed to scale from a single state to nationwide deployment
- Future-compatible with FHIR, without blocking MVP delivery

---

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4, token-based design system (`globals.css`)
- **Backend/Auth/DB:** Supabase (Auth + Postgres)
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (URL + anon key)

### Setup

```bash
git clone <repo-url>
cd refernet
npm install
```

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Run the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Key Risks

| Risk                                 | Mitigation                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| Facility status goes stale           | Timestamped status, automated expiry, facility reminders                      |
| Wrong navigation recommendation      | Positioned as navigation support, not diagnosis; safety disclaimers           |
| Providers abandon the referral form  | Progressive disclosure; mandatory fields limited to clinically essential data |
| Poor clinical data quality           | Structured fields, validation, paper-upload fallback                          |
| Connectivity failure mid-referral    | Offline drafts with retry/sync                                                |
| Low facility adoption                | Start with a geographically concentrated facility network                     |
| Patient privacy breach               | RBAC, encryption, audit logs, minimal public data exposure                    |
| AI voice feature gives unsafe advice | Excluded from MVP pending clinical validation                                 |

The single biggest open assumption: **not** whether providers can use the software, but whether facilities will consistently maintain accurate availability statuses.

---

## Roadmap

1. **MVP** — Hospital Finder (Emergency + Guided) + Referral Portal, as scoped above
2. **Post-MVP** — Voice-assisted navigation, referral coordinator tooling, referral notifications
3. **Later** — Multilingual voice support (introduced per-language only after speech recognition, clinical terminology, translation, and urgency-classification accuracy are validated), AI-assisted symptom navigation, automated referral quality checks

---

## License

TBD
