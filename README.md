# AirAware: Breathe Smarter, Live Safer

> **Prompt Wars Challenge 6: Urban Air Quality Assistant**  
> _"Your personal guide to cleaner air, healthier routines, and smarter daily decisions."_

[![Next.js 15](https://img.shields.io/badge/Next.js-15.2+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript 5.7](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 3.4](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest Tests](https://img.shields.io/badge/Tests-Vitest%20Passed-emerald?style=flat&logo=vitest)](https://vitest.dev/)
[![Accessibility WCAG 2.2 AA](https://img.shields.io/badge/a11y-WCAG%202.2%20AA%20Compliant-green)](https://www.w3.org/WAI/standards-guidelines/wcag/)

AirAware is a production-grade, GenAI-powered environmental health platform designed to help families and urban communities navigate severe winter smog, thermal inversions, and toxic particulate pollution. It suggests low-emission daily routines, indoor air quality hacks, and sustainable alternatives tailored to their location and lifestyle, while clearly explaining the direct scientific impact of their choices.

---

## 1. Product Vision & Problem Statement

### The Urban Air Crisis

Rapid urbanization combined with seasonal winter meteorological stagnation (thermal inversions, calm winds) traps high concentrations of fine particulate matter ($\text{PM}_{2.5}$, $\text{PM}_{10}$) and toxic combustion gases ($\text{NO}_2$, $\text{O}_3$) at street level. Families struggle with:

- **Decision Paralysis:** Deciding whether it is safe for children to play outdoors or for seniors to go for walks.
- **Indoor Blindspots:** Unknowingly compounding toxic exposure indoors through high-heat frying, incense, or unsealed window frames.
- **Confusing Indexes:** Navigating raw AQI numbers without actionable, grounded health guidance.
- **Disconnected Sustainability:** Wanting to help curb emissions but not knowing which micro-habits measurably reduce neighborhood particulate loads.

### The AirAware Solution

AirAware translates live atmospheric data into structured, evidence-grounded action plans:

1. **Real-time Urban Intelligence:** Street-level $\text{PM}_{2.5}$, $\text{PM}_{10}$, $\text{NO}_2$, ozone, and winter thermal inversion detection.
2. **Personalized Clean-Air Advisor:** Context-aware GenAI assistant with structured evidence citing EPA, WHO, and peer-reviewed research.
3. **Smart Daily Routine Planner ("Build My Clean-Air Day"):** 4-part diurnal schedule (Morning, Afternoon, Evening, Night) timed around rush hour pollution peaks.
4. **Indoor Air Quality Lab ("Make Your Home a Cleaner-Air Zone"):** Transparent heuristic room assessments (0–100), kitchen exhaust optimization, True HEPA filter sizing, and science-backed plant facts.
5. **Sustainable Alternatives ("Small Changes. Cleaner Cities."):** Transparent calculation ranges of avoided $\text{CO}_2\text{e}$ and $\text{PM}_{2.5}$ using published DEFRA and EPA factors.
6. **Community Awareness:** 7-Day Clean Commute Challenge and collective action tracker.

---

## 2. Screenshots & UI Architecture

### Interface Previews

```
┌────────────────────────────────────────────────────────────────────────┐
│  AirAware 🌿   [📍 New Delhi, India]   (Live Data)   [Ask AI] [Settings] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ⚠️ WINTER SMOG & INVERSION ADVISORY DETECTED                          │
│  Surface temperature inversion is suppressing vertical pollutant     │
│  dispersion. Stagnant surface winds (< 1.5 m/s) trapping particulates. │
│                                                                        │
│  ┌───────────────────────────────┐  ┌────────────────────────────────┐ │
│  │ AQI: 312 • HAZARDOUS          │  │ Pollutant Breakdown            │ │
│  │ Primary: PM2.5 (185 µg/m³)    │  │ • PM10: 290 µg/m³              │ │
│  │ Standard: US AQI via Open-Meteo│  │ • NO2: 45 µg/m³  • O3: 18 µg/m³│ │
│  └───────────────────────────────┘  └────────────────────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────┐  ┌────────────────────────────────┐ │
│  │ Today's Health Guidance       │  │ Indoor Clean-Air Status        │ │
│  │ • Reschedule outdoor runs     │  │ Score: 78/100 (Safe Zone)      │ │
│  │ • Seal windows during peak    │  │ Recommended: Run HEPA on med   │ │
│  └───────────────────────────────┘  └────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

- **Landing Page Hotspots:** Live environmental telemetry for major global metropolitan areas (New Delhi, London, New York) with interactive links directly opening the city dashboard.
- **Hero Exposure Calculator:** Interactive evidence modal breaking down the 60% – 85% particulate inhalation reduction based on EPA, DEFRA, and Cummings & Waring IAQ research.
- **Smart Planner:** Time-slotted guidance (Morning, Afternoon, Evening, Night) dynamically adjusting based on 24-hour diurnal pollution curves.
- **Indoor Lab:** Room-by-room heuristic auditor scoring ventilation, filtration, and emission sources.

---

## 3. Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, API Route Handlers)
- **Language:** TypeScript 5.7 (Strict mode, zero `any`, zero `@ts-ignore`)
- **Styling & UI:** Tailwind CSS, Lucide React Icons
- **Data Visualizations:** Recharts (accessible SVG charts with complete data table fallbacks)
- **Form & Schema Validation:** Zod 3.24 & React Hook Form
- **Testing Suite:** Vitest, React Testing Library, vitest-axe, Playwright E2E, fast-check (property tests)
- **APIs:** Open-Meteo Air Quality, Weather, and Geocoding APIs

---

## 4. API Sources & Integrations

AirAware integrates with high-reliability, open atmospheric data services without requiring paid external API keys:

| Service                        | Endpoint                                                | Description                                                                                        |
| ------------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Open-Meteo Air Quality API** | `https://air-quality-api.open-meteo.com/v1/air-quality` | Hourly $\text{PM}_{2.5}$, $\text{PM}_{10}$, $\text{NO}_2$, $\text{O}_3$, European AQI, and US AQI. |
| **Open-Meteo Weather API**     | `https://api.open-meteo.com/v1/forecast`                | Ambient temperature, relative humidity, wind speed, wind direction, and weather condition codes.   |
| **Open-Meteo Geocoding API**   | `https://geocoding-api.open-meteo.com/v1/search`        | Fast global geographic location lookup with latitude, longitude, and country codes.                |

### Server-Side Data Flow & Security

- **Strict SSRF Domain Allowlist:** All outbound queries are verified server-side against trusted Open-Meteo origins.
- **Sliding-Window Rate Limiting:** In-memory sliding window rate limiter protects endpoints against denial of service, returning HTTP 429 with standard `Retry-After` headers.
- **Coordinate Privacy:** GPS coordinates from browser geolocation are truncated to 2 decimal places ($\sim 1.1\text{ km}$ resolution) before network transfer or storage.

---

## 5. Data Transparency & Calculation Methodologies

AirAware adheres to strict environmental data transparency principles:

### Status Badges

- **🟢 LIVE DATA:** Retrieved in real-time directly from Open-Meteo atmospheric observation feeds.
- **🔵 CACHED DATA:** Stored within the local sliding window (< 30 minutes old) to preserve bandwidth.
- **🟡 DEMO DATA (SIMULATED):** Clearly tagged when network requests fail or offline mode is triggered. **Demo data is never presented as real air quality.**

### Standards & Calibration

- **AQI Calculation:** US AQI via Open-Meteo, mapped to EPA categories (0–50 Good, 51–100 Moderate, 101–150 Unhealthy for Sensitive Groups, 151–200 Unhealthy, 201–300 Very Unhealthy, 301+ Hazardous).
- **Inhalation Reduction Formula:** Evaluates indoor-outdoor ratio ($I/O$), certified True HEPA single-pass efficiency ($99.97\%$ for $\ge 0.3\,\mu\text{m}$ particles), and N95/FFP2 respirator fit factors ($90\text{--}95\%$ field effectiveness under normal fit). Modeled using peer-reviewed indoor filtration dynamics:
  $$\text{Effective Reduction} = 1 - \left[(1 - E_{\text{mask}}) \cdot \frac{t_{\text{outdoor}}}{24} + (I/O)_{\text{filtered}} \cdot \frac{t_{\text{indoor}}}{24}\right]$$
  _(Citations: US EPA Indoor Air Quality Guidelines; Cummings & Waring, Atmospheric Environment)._
- **Emissions Factors:** Carbon dioxide equivalent ($\text{CO}_2\text{e}$) and particulate matter savings are calculated using official UK DEFRA Greenhouse Gas Reporting Factors and US EPA AP-42 combustion emission inventories.

---

## 6. Limitations & Medical Disclaimer

- **Sensor Grid Resolution:** Open-Meteo atmospheric data relies on atmospheric reanalysis models coupled with regional ground observation stations. Local hyper-local microclimates (such as narrow street canyons or proximity to idling diesel trucks) may differ from regional grid predictions.
- **Indoor Estimation:** Indoor air quality scores are heuristic engineering estimates based on user-provided room dimensions, air cleaner specifications, and ventilation habits; they do not replace calibrated physical indoor laser particle counters.
- **Health Disclaimer:** AirAware is designed for environmental awareness and general wellness guidance only. It is **not a certified medical device** and does not provide clinical diagnosis or prescription advice. Users with respiratory conditions (such as asthma or COPD) should always consult healthcare professionals and adhere to local municipal health directives.

---

## 7. Clone & Local Development

### Prerequisites

- Node.js 18.18+ or 20.x
- npm 9+

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/iam-ayushraj05/Air-aware.git
cd Air-aware

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional for live AI key)
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 8. Deployment (Vercel)

AirAware is optimized for zero-configuration, production deployment on **Vercel**.

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Log in and deploy
vercel
```

### Option B: Deploy via Vercel Dashboard (Git Integration)

1. Push your repository to GitHub: `https://github.com/iam-ayushraj05/Air-aware.git`.
2. Navigate to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Configure Project Settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Add Environment Variables (optional, for real LLM reasoning):
   - `AI_PROVIDER`: `gemini` (or `openai`, `anthropic`, `demo`)
   - `AI_API_KEY`: `<your-api-key>`
   - `AI_MODEL`: `gemini-1.5-flash`
5. Click **Deploy**. Vercel will build the application with production optimizations, CSP headers, and edge route caching.

---

## 9. Verification & Quality Gates

Run all automated quality gates with a single command:

```bash
npm run verify
```

This runs:

1. `npm run typecheck`: Strict TypeScript typecheck across all components, hooks, and API routes.
2. `npm run lint`: ESLint check with zero errors and zero warnings.
3. `npm run test`: Vitest test suite executing unit tests, property tests, and automated accessibility (a11y) checks.
4. `npm run build`: Production Next.js build with static route generation and dynamic route validation.

For End-to-End browser tests:

```bash
npm run test:e2e
```

---

## 10. Future Scope & Roadmap

- **IoT Purifier Integration:** Bi-directional Matter and Apple HomeKit integration to automate HEPA fan speeds based on real-time outdoor smog spikes.
- **Hyperlocal Sensor Crowdsourcing:** Integration with PurpleAir and open community laser sensors for neighborhood street-by-street microclimate monitoring.
- **Wearable Health Sync:** Integration with Apple Health and Google Health Connect to correlate daily particulate exposure with resting heart rate and respiratory rate.
- **Multilingual Support:** Localization into Hindi, Mandarin, Spanish, and Arabic for communities disproportionately impacted by urban winter smog.
- **Voice Assistant:** Native voice guidance for hands-free routine summaries while preparing for morning commutes.

---

## 11. Documentation & Traceability

- Detailed challenge requirements and architectural traceability: [docs/prompt.md](docs/prompt.md)
- Complete verification report and real test execution logs: [VERIFICATION.md](VERIFICATION.md)
- Product design and requirements matrix: [docs/REQUIREMENTS_TRACEABILITY.md](docs/REQUIREMENTS_TRACEABILITY.md)
