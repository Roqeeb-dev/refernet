<div align="center">

# 🏥 ReferNet Nigeria

**Hospital Finder & Digital Healthcare Facility Referral Portal**

[![Next.js](https://img.shields.io/badge/Next.js_14%2F15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

_Connecting Nigeria's fragmented healthcare ecosystem through real-time care navigation and digital referral coordination._

</div>

---

## 📌 Executive Summary

**ReferNet** is a digital health coordination platform designed for low-bandwidth, high-friction clinical environments. It serves a dual purpose:

1. **Smart Care Navigation:** Enables patients and caregivers to find nearby, open, and capable healthcare facilities.
2. **Facility Referral Portal:** Replaces paper slips and unconfirmed transfers with real-time, bidirectional digital referral workflows between healthcare providers.

> **Why ReferNet?** The barrier to effective healthcare transfers in emerging healthcare systems is rarely the absence of a digital form—it is the absence of a reliable **patient navigation and facility-to-facility coordination layer**.

---

## 📊 The Problem

Primary discovery research conducted with **16 healthcare providers across 11 Nigerian states** revealed critical systemic gaps:

- **81.25%** of providers reported sending patients to another facility without confirming if that facility had the immediate capacity or resources to treat them.
- **56.25%** experienced a referred patient being turned away upon arrival.
- **0%** reported using a digital referral coordination platform—handwritten paper referral notes remain the dominant artifact.

---

## 🚀 Core Capabilities

ReferNet ships two integrated workflows:

### 1. Hospital Finder / Smart Care Navigation

Helps non-clinical users (patients, family members) identify appropriate facilities based on proximity, urgency, and live operational status—no medical knowledge required.

| Pathway                          | Target Audience                         | Interactive Flow                                                                    |
| :------------------------------- | :-------------------------------------- | :---------------------------------------------------------------------------------- |
| **🚨 Emergency Mode**            | Users needing immediate critical care   | Location → Nearby Facilities → Availability → Call / Directions / Pre-arrival Alert |
| **🩺 Guided Care Navigation**    | Users unsure of the required care level | Health Concern → Guided Questions → Recommended Care Level → Facility List → Action |
| **🎙️ Voice-Assisted Navigation** | Users with limited digital literacy     | Voice Input → NLP Processing → Urgency Flag → Smart Recommendation → Action         |

> ⚡ **Emergency Mode Guarantee:** Zero login, zero registration, and zero upfront symptom questionnaires. Access to emergency care is never delayed by data collection.

#### Real-Time Capacity Indicators

- 🟢 **Open & Accepting:** Full operational capacity.
- 🟠 **Limited Capacity:** High load; potential wait times.
- 🟠 **Emergency Only:** Accepting critical cases only.
- 🔴 **Unavailable:** Diverting referrals due to resource/bed constraints.

---

### 2. Healthcare Facility Referral Portal

Allows providers to issue, track, accept, decline, and document clinical referrals seamlessly.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Create New  │ ──► │ Patient &    │ ──► │ Select Target│ ──► │ Confirm &    │
│  Referral    │     │ Clinical Info│     │ Facility     │     │ Send         │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                        │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐            │
│ Closed &     │ ◄── │ Patient      │ ◄── │ Accept /     │ ◄──────────┘
│ Archived     │     │ Arrival      │     │ Decline Flow │
└──────────────┘     └──────────────┘     └──────────────┘
```

#### Key Workflow Features:

- **Auto-Populated Identity:** Institutional meta automatically assigned via authenticated facility context.
- **Structured Clinical Summaries:** Chief complaint, ICD-aligned diagnosis, vitals, medication history, prior interventions, and reason for transfer.
- **Paper-Referral Fallback:** Facilities can capture/upload photos of existing paper referral forms without disrupting clinical speed.
- **Delegated Coordination:** Support for referral coordinators acting on behalf of facilities (`Created by [Coordinator] on behalf of [Facility]`).
- **Complete Audit Trail:** Timestamped tracking from dispatch, pre-arrival alert, status update, arrival confirmation, to clinical outcome recording.

---

## 🛡️ Clinical Safety & Scope Boundaries

> ⚠️ **IMPORTANT DISCLAIMER**
> ReferNet is a **care navigation and logistical coordination tool**, NOT a clinical diagnostic engine.

- **Decision Support Only:** Guided Navigation aids facility selection; it never issues formal clinical diagnoses.
- **Emergency Escalation:** Any intake string triggering emergency flags automatically routes the user to the immediate Emergency Pathway.
- **AI Controls:** Voice-assisted algorithms structure reported symptoms and flag urgency tags, but never present AI summaries as verified medical facts.

---

## 👥 Target Users

| Tier          | Hospital Finder                        | Referral Portal                                                   |
| :------------ | :------------------------------------- | :---------------------------------------------------------------- |
| **Primary**   | Patients, Caregivers, Family Members   | Referring & Receiving Clinicians, Nurses, Referral Coordinators   |
| **Secondary** | Community Health Workers, Public Users | Hospital Administrators, State/Regional Referral Officers (MORES) |

---

## 🎯 Success Metrics & KPIs

ReferNet prioritizes patient outcomes over raw system activity.

- **North Star Metric:** `% of patients who successfully reach an appropriate facility without an avoidable failed transfer.`

| Objective                       | Key Performance Indicator (KPI)                                         |
| :------------------------------ | :---------------------------------------------------------------------- |
| **Prevent Wasted Journeys**     | % of facilities displayed as _Unavailable / Limited_ prior to selection |
| **Improve Referral Completion** | Referral acceptance rate across receiving network                       |
| **Information Continuity**      | % of referrals dispatched with 100% mandatory clinical fields populated |
| **Workflow Speed**              | Median time (minutes) to originate and send a referral                  |
| **Care Coordination**           | % of accepted referrals with verified patient arrival timestamps        |

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (App Router, Server Components, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Token-based CSS Variables (`globals.css`)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend & Auth:** Supabase (PostgreSQL + Row Level Security + Auth)

---

## 📂 Directory Structure

```text
refernet/
├── app/
│   ├── (auth)/                  # Authentication routes (Login, Signup, Facility Onboarding)
│   ├── dashboard/               # Facility Portal
│   │   └── referrals/
│   │       └── [id]/            # Referral Detail View, Accept/Decline Modals, Timeline
│   ├── finder/                  # Patient Hospital Finder & Care Navigation
│   ├── not-found.tsx            # Custom animated 404 page
│   ├── layout.tsx               # Root layout & providers
│   └── page.tsx                 # Public landing / entry point
├── components/
│   ├── new-referral/            # Multi-step referral wizard components
│   ├── shared/                  # Reusable UI library (Button, Modal, Badge, Inputs)
│   └── navigation/              # Header, Sidebar, and Mobile Nav
├── lib/
│   ├── supabase/                # Client, Server, and Middleware Supabase configs
│   ├── utils.ts                 # Classname merge & helper utilities
│   └── types.ts                 # Global TypeScript interfaces
└── public/                      # Static brand assets & vectors
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, pnpm, or yarn
- A Supabase project instance

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/your-org/refernet.git
cd refernet
```

**2. Install dependencies:**

```bash
npm install
```

**3. Configure Environment Variables:**

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**4. Launch Development Server:**

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## ⚠️ Key Operational Risks & Mitigations

| Identified Risk                  | System Mitigation                                                                        |
| :------------------------------- | :--------------------------------------------------------------------------------------- |
| Stale Facility Capacity Data     | Mandatory status expiration limits, automated prompts, and last-updated time badges.     |
| Intermittent Mobile Connectivity | Offline-first draft persistence, queue-and-retry mutation handling.                      |
| Form Fatigue / Abandonment       | Progressive disclosure UX; strictly enforced minimal essential dataset.                  |
| Data Privacy & Security          | Granular Row-Level Security (RLS) in Postgres, role-based controls, encrypted transfers. |

---

## 🗺️ Product Roadmap

- [x] **MVP Phase:** Hospital Finder (Emergency + Guided), Referral Portal Core Workflow, Accept/Decline Modals, Responsive Mobile Layouts.
- [ ] **Phase 2 (Post-MVP):** Push / SMS / WhatsApp status notifications, specialized referral coordinator portal, automated capacity pulse checks.
- [ ] **Phase 3 (Scale):** Multilingual voice processing (Hausa, Yoruba, Igbo), HL7 / FHIR data export capability.

---

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
