# AirAware: Breathe Smarter, Live Safer

> **Prompt Wars Challenge 6: Urban Air Quality Assistant**  
> *"Your personal guide to cleaner air, healthier routines, and smarter daily decisions."*

AirAware is a production-grade, GenAI-powered environmental health platform designed to help families and urban communities navigate severe winter smog, thermal inversions, and toxic particulate pollution. It suggests low-emission daily routines, indoor air quality hacks, and sustainable alternatives tailored to their location and lifestyle, while clearly explaining the direct impact of their choices.

---

## 1. Problem Statement & Solution

### The Challenge
Rapid urbanization combined with seasonal winter meteorological stagnation (thermal inversions, calm winds) traps high concentrations of fine particulate matter ($PM_{2.5}$, $PM_{10}$) and toxic gases ($NO_2$, $O_3$) at street level. Families struggle with:
- Deciding whether it is safe for children to play outdoors or for adults to exercise.
- Understanding how indoor activities (cooking methods, dry sweeping, incense) compound outdoor pollution.
- Identifying practical, low-emission daily habits that measurably curb ground-level emissions.
- Navigating confusing air quality indexes without generic or alarming advice.

### The AirAware Solution
AirAware translates raw atmospheric meteorological data from **Open-Meteo** into structured, evidence-grounded action plans:
1. **Real-time Urban Intelligence:** Accurate $PM_{2.5}$, $PM_{10}$, $NO_2$, ozone, and thermal inversion detection.
2. **Personalized Clean-Air Advisor:** Grounded AI recommendations with structured evidence (`{ action, reason, evidence, expectedBenefit, confidence }`).
3. **Smart Daily Routine Planner ("Build My Clean-Air Day"):** 4-part diurnal schedule (Morning, Afternoon, Evening, Night) timed around rush hour pollution peaks.
4. **Indoor Air Quality Lab ("Make Your Home a Cleaner-Air Zone"):** Transparent heuristic scoring (0–100), kitchen exhaust optimization, True HEPA filter sizing, and science-backed plant facts.
5. **Sustainable Alternatives ("Small Changes. Cleaner Cities."):** Transparent calculation ranges of avoided $CO_2e$ and $PM_{2.5}$ using published DEFRA and EPA factors.
6. **Community Awareness:** 7-Day Clean Commute Challenge and collective action tracker.

---

## 2. Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, API Routes)
- **Language:** TypeScript 5.7 (Strict mode, zero `any`)
- **Styling & Design System:** Tailwind CSS, Lucide React Icons
- **Data Visualizations:** Recharts (accessible charts with data table toggles)
- **Validation:** Zod 3.24 (runtime schema enforcement on APIs and Storage)
- **Testing:** Vitest, React Testing Library, vitest-axe, fast-check (property tests)
- **Data Integrations:** Open-Meteo Air Quality, Weather, and Geocoding APIs

---

## 3. Key Architecture & Features

### Architecture Overview
```
src/
├── app/                  # Next.js 15 App Router pages & API routes
│   ├── api/              # Rate-limited, Zod-validated endpoints
│   ├── dashboard/        # Main environmental intelligence dashboard
│   ├── advisor/          # AI conversational advisor with fallback
│   ├── planner/          # Clean-Air Day routine planner
│   ├── indoor-lab/       # IAQ heuristic room assessment
│   ├── alternatives/     # Sustainable alternatives comparison catalog
│   ├── impact/           # Personal impact tracker & charts
│   ├── community/        # Community challenge board
│   ├── explorer/         # Inversion science & pollution explorer
│   └── settings/         # Profile, accessibility, and storage controls
├── components/           # Reusable design system (Button, Card, Badge, Modal)
├── features/             # Domain modules (air-quality, routine, indoor, etc.)
├── lib/                  # Pure, testable domain algorithms (AQI, formulas, storage)
└── server/               # API clients, rate limiter, and AI provider integration
```

### Visual Identity
- **Forest Green & Emerald:** (#15803D, #10B981) symbolizing environmental restoration.
- **Deep Slate & Navy:** (#0F172A, #1E293B) offering clear contrast.
- **Controlled Warnings:** Controlled Amber/Red/Purple palette strictly for EPA AQI categories.
- **High-Contrast Theme:** WCAG 2.2 AAA mode with $\ge 7:1$ contrast ratio.

---

## 4. Environment Setup & Configuration

AirAware works out-of-the-box in **Deterministic Fallback Mode** without requiring any paid API keys.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/AirAware.git
   cd AirAware
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Set your preferred AI provider:
   ```env
   AI_PROVIDER=gemini # or "openai", "anthropic", "demo"
   AI_API_KEY=your_gemini_api_key_here
   AI_MODEL=gemini-1.5-flash
   ```

---

## 5. Local Development & Verification

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification Commands
```bash
# Typecheck TypeScript
npm run typecheck

# Run ESLint (0 errors, 0 warnings)
npm run lint

# Run Unit, Property-based, and Accessibility Tests
npm run test

# Run Test Coverage (93.4% Lines, 97.8% Functions)
npm run test:coverage

# Next.js Production Build
npm run build

# Run Complete Pipeline in Sequence
npm run verify
```

---

## 6. Privacy & Security Safeguards

- **Zero Sensitive Data Storage:** No user health conditions or names are stored.
- **Coordinate Privacy:** GPS coordinates are rounded to 2 decimal places ($\sim 1.1$ km radius) before caching in local storage.
- **SSRF Protection:** Server-side fetches strictly validate against an allowlist of Open-Meteo domains.
- **Sliding-Window Rate Limiter:** Protects API endpoints against denial of service, returning HTTP 429 with `Retry-After`.
- **Zero Production Vulnerabilities:** `npm audit --omit=dev` verifies 0 known vulnerabilities.

---

## 7. Medical & Public Health Disclaimer

> **Disclaimer:** AirAware provides environmental information and general wellness guidance. It is not a medical device and does not replace professional medical advice. Follow local public-health guidance.
