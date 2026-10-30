# 🌟 EventCraft AI — Autonomous Celebration & Event Architect
> **Tailored for Hack2skill / PromptWars Challenge 5**

EventCraft AI is a production-ready, autonomous celebration and event planning web application that transforms basic event parameters into an end-to-end master event blueprint in seconds. It is built with a **Dual-Model Gemini Architecture**, balancing deep heavy reasoning with sub-second real-time co-pilot intelligence.

---

## 🏛️ Dual-Model Architecture

| Model | Role | Responsibilities | Latency Profile |
|---|---|---|---|
| **Gemini 3.8 Flash** | **Primary Heavy Workhorse** | End-to-end master event plan generation, financial budget calculations, percentage balancing, sequential timeline dependencies, and vendor negotiation matrices. Enforces strict JSON schemas. | High-depth reasoning (~3-5s) |
| **Gemini 3.1 Flash-Lite** | **Lightweight Real-time Co-Pilot** | Real-time interactive assistant for conversational tweaks, inline cost-cutting tips, dietary menu substitutions, and quick field modifications. | Ultra-low latency (<1s) |

---

## 🚀 Key Features

1. **One-Click Demo Presets:**
   - Quick-load realistic event templates for instant hackathon evaluation:
     - 🌿 **Rustic Wedding** (120 guests, $25,000)
     - ⚡ **Neon 21st Birthday** (75 guests, $8,000)
     - 🚀 **Tech Hackathon Gala** (250 guests, $45,000)
2. **Interactive Budget Visualizer:**
   - Category budget allocation cards, dynamic stacked percentage progress bar, and AI cost-cutting opportunities.
   - Multi-currency support: **INR (₹)**, **USD ($)**, and **EUR (€)**.
3. **Phased Milestone Checklist:**
   - Sequential phases (Planning & Sourcing, Logistics & Invitations, Event Week Execution).
   - Priority chips (`High`, `Medium`, `Low`) and interactive checkboxes that update completion percentage in real time with celebration confetti!
4. **Vendor Negotiation Playbook:**
   - Deliverables checklist, copyable hardball negotiation scripts, and contract red flags for Venues, Caterers, DJs/Audio, and Photographers.
5. **Creative Aesthetics & Invitation Copy:**
   - Curated playlist BPM vibe arc, signature activation moments, decor concepts, and one-click copyable invitation copy.
6. **Gemini 3.1 Flash-Lite Floating Co-Pilot:**
   - Persistent slide-over drawer with quick action pills and 1-click **"Apply to Master Plan"** functionality.
7. **Zero-Database Local Storage Sync:**
   - Master blueprint automatically persists in `localStorage` across page reloads.
8. **Print & PDF Export Utility:**
   - Custom `@media print` CSS formats a multi-page physical itinerary document when clicking **"Save as PDF / Print"**.
9. **Zero-Cost & Free-Tier Deployable:**
   - Requires zero external database (no Prisma, Postgres, or MongoDB). Deployable directly to Vercel with zero cold starts.

---

## 📂 File Tree

```
├── app/
│   ├── api/
│   │   ├── plan/route.ts      # Heavy generation route (Gemini 3.8 Flash)
│   │   └── refine/route.ts    # Lightweight co-pilot route (Gemini 3.1 Flash-Lite)
│   ├── globals.css            # Glassmorphism, animations, & @media print styles
│   ├── icon.svg               # Dynamic vector favicon emblem
│   ├── layout.tsx             # Root layout with navbar & dual-model indicators
│   └── page.tsx               # Main dashboard, tab visualizer & state sync
├── components/
│   ├── BudgetVisualizer.tsx   # Budget cards, progress bar, & cost-saving tips
│   ├── CreativeAesthetics.tsx # Decor, playlist vibes, & invitation copy
│   ├── EventIntakeForm.tsx    # Preset buttons, currency selector, sliders
│   ├── Logo.tsx               # Custom SVG branding & geometric emblem component
│   ├── QuickRefineChat.tsx    # Slide-over chat drawer (Gemini 3.1 Flash-Lite)
│   ├── StepLoader.tsx         # Multi-stage animated generation loader
│   ├── TimelineChecklist.tsx  # Phased milestones & task completion tracker
│   └── VendorPlaybook.tsx     # Deliverables, negotiation scripts, & red flags
├── public/
│   ├── favicon.svg            # Standalone geometric celebration & AI facet favicon
│   └── logo.svg               # Production SVG brand logo & wordmark lockup
├── lib/
│   ├── gemini.ts              # Google GenAI client & fallback model routing
│   ├── presets.ts             # Demo presets & instant evaluation blueprints
│   └── utils.ts               # Currency formatting & CSS utilities
├── types/
│   └── event.ts               # TypeScript schemas matching Challenge 5 spec
├── .env.example               # Environment variable reference
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies (Next 15, React 19, Tailwind, GenAI)
├── tailwind.config.ts         # Glassmorphism theme & celebration color tokens
└── tsconfig.json              # TypeScript configuration
```

---

## 🛠️ Quick Start & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/SayanModakDev/eventcraft-ai.git
cd eventcraft-ai
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_google_ai_studio_api_key_here
```
> **Note:** If no API key is provided, EventCraft AI automatically runs in zero-config intelligent demo mode with full interactive functionality so judges can test all features with zero friction.

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Automated Testing Suite & Linting
```bash
# Run all unit, integration, and component tests
npm test

# Run tests in interactive watch mode
npm run test:watch

# Generate V8 coverage report
npm run test:coverage

# Run ESLint validation
npm run lint
```

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📋 Challenge 5 Master Blueprint JSON Schema

The route `app/api/plan/route.ts` strictly enforces the following JSON structure:

```json
{
  "event_title": "String",
  "theme_tagline": "String",
  "audience_profile": "String",
  "total_budget": 25000,
  "currency": "USD",
  "budget_breakdown": [
    {
      "category": "Venue & Barn Rental",
      "percentage": 30,
      "estimated_cost": 7500,
      "cost_saving_tip": "Book on Friday/Sunday to save 15%."
    }
  ],
  "timeline_milestones": [
    {
      "phase": "Phase 1: 4 Months Out (Foundations)",
      "tasks": [
        {
          "task_name": "Lock Barn Venue",
          "priority": "High",
          "description": "Finalize deposit and permits."
        }
      ]
    }
  ],
  "vendor_checklists": [
    {
      "vendor_type": "Venue Manager",
      "suggested_deliverables": ["12-hour exclusive access"],
      "negotiation_questions": ["Is trash cleanup bundled?"],
      "red_flags_to_avoid": ["No backup generator"]
    }
  ],
  "personalized_ideas": {
    "decor_concept": "String",
    "signature_activity": "String",
    "curated_playlist_vibe": "String",
    "invitation_copy": "String"
  }
}
```

---

## 🌐 Deploy to Vercel (Zero Cost)

1. Push this repository to GitHub.
2. Import the repository into **[Vercel](https://vercel.com)**.
3. In Project Settings &rarr; **Environment Variables**, add:
   - `GEMINI_API_KEY` = `your_gemini_api_key`
4. Click **Deploy**. Since no database connection is required, build and deployment will complete in under 60 seconds!
