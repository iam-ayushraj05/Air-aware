# PROMPT WARS CHALLENGE 6: FULL PROJECT BUILD

Build a complete, production-quality web application for the challenge:

**Urban Air Quality Assistant**

### Problem Statement
Create a GenAI-powered assistant that helps families and communities navigate severe winter smog and urban air pollution. The application should suggest low-emission daily routines, indoor air quality hacks, and sustainable alternatives tailored to their location and lifestyle, while clearly explaining the direct impact of their choices.

This must be a fully functional application, not merely a UI prototype, landing page, static dashboard, or chatbot mockup.

---

# 1. PRODUCT VISION

Create a modern AI-powered environmental health platform called:

**AirAware: Breathe Smarter, Live Safer**

Tagline: "Your personal guide to cleaner air, healthier routines, and smarter daily decisions."

The platform should help users answer:

- How polluted is the air around me right now?
- What does today's AQI actually mean for my family?
- What should I do today to reduce exposure?
- How can I improve indoor air quality?
- How can I make my daily routine more sustainable?
- What changes in my lifestyle have measurable environmental benefits?
- What should children, elderly family members, and sensitive individuals be cautious about?

The experience should feel like a combination of: an environmental intelligence dashboard, a personalized AI assistant, a family safety companion, a sustainable lifestyle planner, and a community awareness platform.

Do not make the app feel like a generic AI wrapper.

---

# 2. TECH STACK

Use a modern, maintainable stack:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- React
- Lucide icons
- Recharts for charts
- Framer Motion for subtle animations
- Zod for schema validation
- React Hook Form where forms are necessary
- Server-side API routes for external API requests
- LocalStorage only for safe user preferences and demo-mode persistence

Pin stable, compatible major versions (for example Next.js 15, React 19, Tailwind 4, Vitest 3, latest Playwright) to avoid dependency mismatches.

Use a clean modular folder structure. Do not place the entire application in one giant component.

---

# 3. DESIGN DIRECTION

Create a premium, modern environmental-tech dashboard.

### Visual identity
- Deep forest green, emerald, soft mint
- Off-white backgrounds
- Slate gray text
- Dark navy accents
- Carefully controlled orange/red for pollution warnings

### Avoid
- Generic AI purple gradients
- Excessive glassmorphism or gradients
- Emoji-heavy interfaces
- Huge empty sections
- Template-looking cards
- Cluttered dashboards
- Excessive animations

### Design characteristics
- Beautiful typography
- Spacious layout with consistent spacing
- Rounded cards, subtle borders, soft shadows
- Strong visual hierarchy
- Clean iconography
- Responsive mobile layouts
- Smooth but restrained transitions
- Excellent visual polish

The application should look like a premium climate-tech startup product.

---

# 4. APPLICATION STRUCTURE

## A. Landing Page
- AirAware logo and navigation
- Hero section with an atmospheric illustration of a city transitioning from polluted air to cleaner air
- Headline: "Know Your Air. Protect Your Family."
- Supporting text explaining the product
- CTA: "Check My Air"
- CTA: "Explore AI Assistant"
- Live AQI preview section
- How AirAware works
- Features section
- Environmental impact section
- Family protection section
- Footer

The landing page must have real navigation and functional buttons.

## B. Main Dashboard

### Dashboard header
- Greeting based on the saved profile
- Current location and date
- Location search
- Refresh button
- Notification indicator

### Air Quality Overview
Show: AQI value, AQI category, AQI color indicator, PM2.5, PM10, Ozone, NO2 (if available), last updated time, data source, and weather information when available.

AQI categories:
- 0–50: Good
- 51–100: Moderate
- 101–150: Unhealthy for Sensitive Groups
- 151–200: Unhealthy
- 201–300: Very Unhealthy
- 301+: Hazardous

Make the category system configurable based on the selected data provider's standard. Clearly label which AQI standard is being used.

### Dashboard sections
1. Current air quality
2. Today's personalized health guidance
3. Recommended actions
4. Indoor air quality score
5. Daily exposure reduction tips
6. Weather conditions
7. Pollution trend chart
8. Family protection checklist
9. AI-generated daily plan
10. Environmental impact summary

Create a deliberate dashboard hierarchy rather than equal-weight cards.

---

# 5. LOCATION AND REAL-TIME DATA

### Location options
Users must be able to: enter a city, search for a location, use browser geolocation after permission, change location manually, and save a preferred location.

### Data integrations
Use public APIs that work without a key wherever possible:
- Open-Meteo Air Quality API
- Open-Meteo Weather API
- Open-Meteo Geocoding API

Get actual data for PM2.5, PM10, Ozone, NO2, AQI, weather, temperature, wind speed, and humidity.

Use proper API routes and server-side fetching. Implement loading states, error handling, API timeout handling, caching, retry logic where appropriate, and graceful degradation.

NEVER fabricate real-time air-quality data. If the API is unavailable, display clearly marked DEMO DATA. Show a visible label distinguishing **Live**, **Cached**, and **Demo** data. Never display demo information as real air quality.

---

# 6. AI PERSONALIZATION SYSTEM

Build the core feature: **"Your Personal Clean-Air Advisor"**

The user completes a simple lifestyle profile:
- Location
- Family size
- Children in household (optional)
- Elderly family members (optional)
- Outdoor activity level
- Daily commute method
- Work/study schedule
- Main transportation
- Cooking habits
- Indoor environment
- Air purifier (yes/no)
- Plants (yes/no)
- Lifestyle preferences

Do not ask for unnecessary sensitive personal data.

Recommendations must be based on: current AQI, pollutant levels, weather, location, household preferences, daily routine, outdoor activity, and commute habits.

### AI response must contain
1. Today's air-quality summary
2. What the AQI means in simple language
3. Specific actions for today
4. Safer outdoor activity suggestions
5. Indoor protection suggestions
6. Commuting suggestions
7. Sustainable lifestyle suggestions
8. A personalized morning-to-evening routine
9. Explanation of WHY each recommendation matters
10. Expected environmental benefit
11. A confidence/data-freshness indicator

Avoid generic advice. Instead of "Stay indoors," generate something contextual:

"Air quality is currently poor. Consider moving your outdoor walk to a period when pollution is lower, if your local forecast shows an improvement. Keep windows closed during high-pollution periods and ventilate when outdoor conditions improve."

All recommendations must be grounded in available data.

---

# 7. AI CHAT ASSISTANT

Create a functional conversational interface named **AirAware AI**.

Example questions:
- Is it safe to go jogging today?
- What should my family do during severe smog?
- How can I reduce indoor PM2.5?
- What is the best time to travel today?
- How can I protect children during pollution?
- How can I reduce pollution from my daily commute?
- Explain today's AQI in simple words.
- Create a clean-air routine for my day.
- How can I make my home healthier?

### Chat functionality
Chat interface, message history, loading indicator, typing state, suggested questions, context-aware responses, current AQI context, user lifestyle context, and a clear-conversation option.

Use a real LLM integration if an API key is configured. Support environment variables `AI_PROVIDER`, `AI_API_KEY`, `AI_MODEL`. Do not expose API keys to the browser.

If no API key exists, provide a useful deterministic fallback recommendation engine, and clearly label fallback responses as "AI demo/fallback mode". Never make the interface appear AI-powered while returning hardcoded generic responses without indicating it.

---

# 8. SMART DAILY ROUTINE PLANNER: "Build My Clean-Air Day"

### Morning
Check air quality; recommended outdoor activity timing; ventilation advice; commute recommendation; breakfast/cooking considerations.

### Afternoon
Indoor activities; work/study suggestions; outdoor exposure recommendations; hydration reminders.

### Evening
Exercise guidance based on air quality; commute recommendations; indoor ventilation advice; exposure reduction.

### Night
Bedroom environment suggestions; indoor air quality habits; tomorrow preparation.

Users must be able to: generate a new routine, customize it, mark actions completed, see progress, save routines, and regenerate based on changing air quality.

Do not make unsafe medical claims.

---

# 9. INDOOR AIR QUALITY LAB: "Make Your Home a Cleaner-Air Zone"

Categories:
- **Cooking:** ventilation, smoke reduction, cooking habits, avoiding unnecessary indoor combustion
- **Ventilation:** when to ventilate and when to keep windows closed, using weather and pollution context where available
- **Dust:** cleaning strategies, reducing accumulation, proper cleaning practices
- **Household products:** reduce unnecessary strong fragrances, consider low-emission products, explain why
- **Air purification:** explain HEPA filtration, room sizing, filter maintenance, and honest limitations
- **Plants:** explain that indoor plants alone should not be presented as an effective replacement for ventilation or filtration

Create: an indoor checklist, an interactive room assessment, room-based tips, and an indoor improvement score. The score must be a transparent heuristic, not a fake scientific measurement, and the page must explain how it is calculated.

---

# 10. SUSTAINABLE ALTERNATIVES: "Small Changes. Cleaner Cities."

Interactive comparisons, for example:
- Private vehicle vs public transportation
- Car vs walking/cycling for suitable short trips
- Single-use vs reusable products
- Energy-efficient habits
- Waste reduction
- Cleaner cooking practices
- Reduced unnecessary vehicle idling

Each comparison shows: current choice, sustainable alternative, estimated environmental benefit, estimated emissions reduction where reasonably calculable, assumptions, explanation, difficulty level, and cost impact if relevant.

Do not invent precise environmental statistics. Any calculated estimate must display: "Estimated impact: based on assumptions." and show the assumptions transparently. Users can select a sustainable action and add it to their daily plan.

---

# 11. IMPACT TRACKER: "My Clean-Air Impact"

Track completed actions (used public transport; walked or cycled when appropriate; avoided unnecessary trips; reduced idling; improved ventilation timing; reduced indoor smoke; used reusable items).

Show: actions completed, weekly progress, sustainability streak, estimated emissions avoided, estimated energy saved where calculable, personal impact, and a community impact visualization. Use charts. Explain impact calculations clearly. Do not present speculative numbers as verified science. Persist progress locally.

---

# 12. COMMUNITY PAGE: "Cleaner Air Starts Together"

Include: community clean-air challenges, a daily community goal, neighborhood awareness tips, a sustainable action board, community progress visualization, educational pollution information, and shareable action cards.

Use realistic demo community data clearly labeled DEMO. Do not pretend users are real. Create an interactive "7-Day Clean Commute Challenge" that users can join, track, and compare with demo community progress.

---

# 13. POLLUTION EXPLORER

Explain PM2.5, PM10, Ozone, NO2, AQI, common sources, effects of exposure (non-graphic, educational language), and what each AQI level means. Use interactive visualizations and charts.

Include a section **"Why winter pollution becomes worse"** covering temperature inversions, low wind, pollutant accumulation, traffic, construction dust, industrial emissions, and seasonal burning where regionally relevant. Keep it easy to understand.

---

# 14. NOTIFICATIONS AND ALERTS

Examples: air quality has worsened; AQI category changed; pollution-sensitive guidance; reminder to check air quality before outdoor activity; daily clean-air plan reminder.

Use browser notifications only after explicit permission. Also implement in-app alerts. Allow users to configure preferences. Do not spam.

---

# 15. SETTINGS AND PROFILE

Location, lifestyle profile, notification preferences, accessibility preferences, theme, units, data source information, clear saved data, and demo mode toggle. The app must work even without a completed profile.

---

# 16. RESPONSIVE NAVIGATION

Desktop sidebar: Dashboard, AI Advisor, Daily Planner, Indoor Air Lab, Sustainable Choices, Impact Tracker, Community, Pollution Explorer, Settings.

Mobile: responsive sidebar or bottom navigation, proper touch targets, no horizontal overflow, stacking cards, charts that resize correctly.

---

# 17. ACCESSIBILITY (IMPORTANT EVALUATION PARAMETER)

Semantic HTML, proper heading hierarchy, keyboard navigation, visible focus indicators, screen-reader-friendly labels, accessible forms, accessible modal dialogs, ARIA only where appropriate, color contrast compliance, never using color alone to communicate AQI, text descriptions for charts, reduced motion support, accessible navigation, large touch targets, clear error messages, accessible loading states.

Create accessibility settings: larger text, high contrast, reduced motion. Follow WCAG 2.2 AA.

---

# 18. SECURITY (IMPORTANT EVALUATION PARAMETER)

- API keys stay server-side; never expose secrets in client bundles
- Validate API inputs with Zod
- Sanitize user-controlled content; prevent unsafe rendering of user messages
- Protect API routes against abuse; use rate limiting
- Avoid leaking server errors
- Avoid unnecessary personal data; do not store sensitive health information
- Secure external API calls; use safe HTTP methods and proper status codes
- Prevent prompt injection; do not blindly trust AI output
- No unsafe eval or dynamic code execution
- Provide a proper `.env.example`

The app must not provide medical diagnosis. Add this disclaimer:

"AirAware provides environmental information and general wellness guidance. It is not a medical device and does not replace professional medical advice. Follow local public-health guidance."

---

# 19. PERFORMANCE AND EFFICIENCY

Server components where appropriate; client components only when necessary; lazy-loaded charts; efficient API requests; appropriate air-quality caching; debounced location search; fewer rerenders; restrained animation; small dependencies; optimized images; loading skeletons; slow-network handling; no duplicate API calls; responsive image sizes; fast initial load. The app must remain usable on average mobile devices and slow connections.

---

# 20. CODE QUALITY

Strict TypeScript, reusable components, clean folder structure, separation of UI/logic/API/data, meaningful naming, no duplicated code, no giant components, no excessive inline styling, no dead code, no console errors, no TypeScript errors, no broken navigation, no placeholder buttons, no fake functionality, no TODOs for core features.

Reusable components include: AQICard, PollutantCard, LocationSelector, RecommendationCard, DailyRoutineTimeline, ImpactCard, ChartCard, ChatMessage, AirQualityBadge, AlertBanner, LoadingSkeleton.

---

# 21. TESTING (IMPORTANT EVALUATION PARAMETER)

Use Vitest, React Testing Library, and Playwright.

### Unit tests
- AQI calculations: good, moderate, unhealthy categories, hazardous
- Recommendation logic: low AQI, high AQI, missing data, sensitive household context
- Input validation: invalid location, missing values, invalid API input

### UI tests
Dashboard renders, navigation works, location search works, AI chat fallback works, routine generation works, checklist interaction works, impact tracker persists, accessibility controls work.

### End-to-end flows
1. User opens the application
2. Searches for a city
3. Views AQI
4. Creates a lifestyle profile
5. Generates a personalized routine
6. Opens the AI advisor
7. Completes a daily action
8. Sees the updated impact tracker

Provide testing scripts in `package.json`. Run the tests and fix failures.

---

# 22. AI QUALITY AND TRANSPARENCY

The AI must: explain recommendations, avoid unsupported claims, state uncertainty, use available location data, consider current air quality, avoid unnecessarily alarming language, never guarantee health protection, never invent live readings, and distinguish information from recommendations.

When data is missing, say so. When recommendations are general, label them as general. The tone is helpful, practical, calm, and family-friendly.

---

# 23. REQUIRED DELIVERABLES

1. Fully functional application
2. Complete responsive frontend
3. Backend API routes
4. Real air-quality integration
5. Weather integration
6. Location search
7. AI provider integration
8. Fallback AI engine
9. Personalized profile
10. Daily routine planner
11. Indoor Air Lab
12. Sustainable Alternatives
13. Impact Tracker
14. Community challenges
15. Pollution Explorer
16. Settings
17. Accessibility features
18. Error handling
19. Tests
20. README
21. .env.example
22. Deployment instructions
23. Clear demo mode
24. Production build

---

# 24. README

Include: project name, problem statement, solution, features, architecture, tech stack, screenshots section, API sources, environment setup, AI configuration, local development, testing, deployment, limitations, data transparency, privacy, future scope.

---

# 25. DEFINITION OF DONE: MEASURABLE QUALITY GATES

The project is NOT complete until every gate below passes and is proven with real command output. Do not claim a gate passed without running it.

## Execution protocol
1. Work in phases: (1) architecture + design system, (2) data/API layer + validation, (3) AI engine + fallback, (4) pages, (5) accessibility pass, (6) security pass, (7) performance pass, (8) tests, (9) docs, (10) final verification.
2. After each phase run `npm run typecheck && npm run lint` and fix everything before continuing.
3. Do not stop early. If a gate fails, fix it and re-run until it passes.
4. At the end, create `VERIFICATION.md` containing a scorecard with the actual command outputs and numbers for every gate below.

## CODE QUALITY gates
- `tsconfig`: `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`. Zero `any`, zero `@ts-ignore`.
- ESLint (next/core-web-vitals, typescript-eslint strict, jsx-a11y, import ordering) with **zero warnings**. Configure Prettier. Add `lint-staged` and `husky`.
- Layered architecture: `src/features/<feature>/{components,hooks,lib,types}`, `src/lib` (pure domain logic, no React), `src/server` (API clients, rate limiter, AI providers), `src/components/ui` (design system).
- All domain logic (AQI categorization, recommendation engine, impact calculations, indoor score) must be pure, typed functions that are unit-testable without React or network.
- Centralize constants (AQI breakpoints, emission factors, thresholds) in one documented file with a source for each value.
- Validate environment variables at startup with a Zod schema (`src/server/env.ts`); fail fast with a clear message.
- Use discriminated unions or a `Result<T, E>` type for API responses. Never throw raw errors across layers.
- No component over about 150 lines. No function over about 40 lines. No duplicated logic.
- Add concise JSDoc on every exported function, and an `ARCHITECTURE.md` with a diagram and short ADRs (why Next App Router, why Open-Meteo, why a deterministic fallback).

## SECURITY gates
- Set security headers in `next.config` / middleware: strict nonce-based CSP (no `unsafe-eval`), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (geolocation for self only), `frame-ancestors`/`X-Frame-Options`, HSTS.
- Every API route: allowed-method check, request body size limit, Zod validation (`.strict()`), timeout via `AbortController`, normalized error responses with no stack traces, correct status codes (400/405/413/429/502/504).
- In-memory sliding-window rate limiter keyed by IP with a `Retry-After` header, applied to chat, geocode, and air-quality routes. Document that production would use Redis/Upstash.
- SSRF protection: server-side fetches only to a hard-coded allowlist of Open-Meteo hosts; never fetch user-supplied URLs.
- Prompt-injection defense: user text goes only in a delimited user turn, never merged into the system prompt. The system prompt states that user content is data, not instructions. Limit input length, strip control characters, and validate AI output against a Zod schema before use. If validation fails, fall back to the deterministic engine and label it.
- Render AI/user text as plain text or through a sanitized markdown renderer. `dangerouslySetInnerHTML` is forbidden (enforce with an ESLint rule).
- LocalStorage: store only preferences/progress, in versioned, Zod-validated schemas so tampered or corrupt data is discarded safely. Store no health conditions, names, or precise coordinates (round to 2 decimals).
- `npm audit --omit=dev` must show zero high/critical issues. Add a `gitleaks` (or equivalent) secret-scan script. Verify with a build-output grep that no secret appears in `.next/static`.
- Write `SECURITY.md` with a short threat model (assets, threats, mitigations) and a privacy statement.

## EFFICIENCY gates
- Lighthouse (mobile, production build): Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95. Add a `lighthouse` script and record scores in `VERIFICATION.md`.
- Budgets: initial JS ≤ 150 KB gzipped on the landing page; LCP < 2.5s, CLS < 0.1, INP < 200ms on throttled 4G. Run `@next/bundle-analyzer` and report results.
- Dynamically import Recharts and other heavy components with skeleton fallbacks (`next/dynamic`). Use `next/font` with `display: swap` and `next/image` with proper `sizes`.
- Cache layers: Next `fetch` revalidation (air quality 15 min, geocode 24 h), HTTP `Cache-Control` with `stale-while-revalidate`, and client-side request de-duplication (SWR or TanStack Query). The UI shows data origin (Live / Cached / Demo) and age.
- Retry with exponential backoff + jitter (max 2 retries, idempotent GETs only). Cancel stale requests on location change. Debounce search at 300ms with a 2-character minimum.
- Stream AI chat responses where the provider supports it. Memoize expensive derived values; split contexts to avoid context-wide rerenders.

## TESTING gates
- Vitest coverage thresholds enforced in config: **≥ 85% lines/functions/statements and ≥ 80% branches** for `src/lib` and `src/server`; ≥ 70% overall.
- Boundary-value tests for AQI at 0, 50, 51, 100, 101, 150, 151, 200, 201, 300, 301, negative, NaN, null, undefined. Use property-based tests (`fast-check`) to verify every integer 0–500 maps to exactly one category and that categories are monotonic.
- Recommendation engine: behavior-based tests (no snapshots) for each AQI band × (child / elderly / none) × (purifier / none) × (missing pollutant data) × (high wind / low wind) × (outdoor-active / sedentary).
- Security tests: rate limiter returns 429 after the limit; oversize body returns 413; invalid Zod input returns 400; a prompt-injection string ("ignore previous instructions…") does not alter system behavior; AI output failing schema validation triggers the fallback; error responses contain no stack traces.
- Component tests (React Testing Library + `userEvent`) for every reusable component and interactive feature. Mock the network with **MSW**. Test loading, success, error, empty, and offline states.
- **Accessibility tests:** `vitest-axe` on every page and component with zero violations; `@axe-core/playwright` on every route in both light and high-contrast themes.
- Playwright e2e on Chromium plus a mobile viewport (Pixel 5), covering the 8 flows in section 21, plus: keyboard-only navigation of the full dashboard, demo-mode labeling, API failure → demo-data fallback, notification permission denied, and clear-saved-data.
- Tests must be deterministic: mock time, geolocation, and `Notification`. No network dependency.
- Scripts: `test`, `test:watch`, `test:coverage`, `test:e2e`, `test:a11y`, `typecheck`, `lint`, `build`, and `verify` (runs everything in order). Add a GitHub Actions workflow that runs `verify`.

## ACCESSIBILITY gates (WCAG 2.2 AA, AAA where cheap)
- Skip-to-content link; landmarks (`header`, `nav`, `main`, `footer`, `aside`); one `h1` per page; no skipped heading levels; `lang` attribute; unique page title per route; focus moved to `h1` on route change.
- Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI components). Document checked color pairs in a `design-tokens` file. Ship a true high-contrast theme (≥ 7:1).
- Focus indicator ≥ 3:1 contrast, at least 2px, never obscured by sticky headers or bars (WCAG 2.4.11). Target size ≥ 44×44px (never below 24×24, WCAG 2.5.8).
- AQI is always communicated by **number + text label + icon/shape + color**. Every chart has an adjacent data table or text summary, linked with `aria-describedby`.
- Forms: visible `<label>`s, `aria-describedby` for hints, errors linked via `aria-invalid`/`aria-errormessage`, an error summary that receives focus, `autocomplete` attributes, and no re-asking for information already entered (WCAG 3.3.7).
- Dynamic content: `aria-live="polite"` for chat messages, data refresh, and loading states; `role="alert"` only for critical air alerts. Loading skeletons use `aria-busy`.
- Dialogs: native `<dialog>` or a proven primitive (Radix) with focus trap, Escape to close, focus return, and `aria-labelledby`.
- Support `prefers-reduced-motion`, `prefers-contrast`, `prefers-color-scheme`, 200% text resize, 400% zoom with no two-dimensional scrolling at 320px width, and text spacing overrides. Settings toggles (large text, high contrast, reduced motion) override system defaults and persist.
- No drag-only interactions (WCAG 2.5.7). Every pointer interaction has a keyboard equivalent. Never rely on hover alone.
- Write `ACCESSIBILITY.md` with a conformance table (each WCAG 2.2 AA criterion → how it is met → how it is tested) plus a manual screen-reader checklist (NVDA/VoiceOver).

## PROBLEM STATEMENT ALIGNMENT gates
- Create `docs/REQUIREMENTS_TRACEABILITY.md`: a table mapping each problem-statement requirement (location-tailored, low-emission routines, indoor hacks, sustainable alternatives, explained impact, winter smog, families/communities) → feature, file path, and the test that proves it.
- Every recommendation object carries `{ action, reason, evidence, expectedBenefit, confidence, isGeneral }` (`evidence` is the data point that triggered it, e.g. "PM2.5 = 78 µg/m³"), and the UI renders all of them.
- Include a **Winter smog mode** that activates when AQI is elevated, wind is low, and temperature is low. It triggers inversion/low-wind explanations and community-level advice (reduce idling, avoid open burning, carpool). Be region-aware without making unsupported claims.
- AQI standard transparency: state which standard is used (US AQI vs European AQI from Open-Meteo). If the user's region uses a different national scale, show a note instead of silently converting.
- Impact math: show the formula, emission factors, assumptions, and source name (e.g. IPCC/EPA/DEFRA published factors) in an expandable "How we calculate" panel beside every number. Use ranges instead of false precision.
- The first-time user flow must reach a useful, personalized result in **under 60 seconds and 3 interactions**, with or without a completed profile.

## Final documents
`VERIFICATION.md` (scorecard with real outputs), `ARCHITECTURE.md`, `SECURITY.md`, `ACCESSIBILITY.md`, `docs/REQUIREMENTS_TRACEABILITY.md`, `.env.example`, `README.md`, CI workflow, and a seeded Demo Mode. Before finishing, run `npm run verify` and paste the summary. If any gate is below target, fix it. Do not report completion with known failing gates.

---

# 26. FINAL EXECUTION INSTRUCTIONS

Work directly in the current project directory. First inspect the existing repository and preserve useful code. Then:

1. Plan the architecture.
2. Create the design system.
3. Build the application.
4. Integrate live APIs.
5. Implement the AI functionality.
6. Build all pages.
7. Implement all interactive functionality.
8. Add accessibility.
9. Add security safeguards.
10. Add tests.
11. Run lint.
12. Run type checking.
13. Run tests.
14. Run the production build.
15. Fix all errors.

Do not stop to ask for approval between steps. Do not give only a plan. Do not build only a landing page. Do not leave buttons nonfunctional. If an API key is missing, the app must still work using a clearly labeled fallback mode. Make reasonable engineering decisions independently.

The final product must be polished enough for a hackathon submission and must clearly demonstrate all six evaluation parameters:

- **CODE QUALITY:** professional architecture, reusable components, clean TypeScript, maintainability.
- **SECURITY:** safe API architecture, validation, privacy, secrets management, secure AI handling.
- **EFFICIENCY:** fast rendering, caching, optimized requests, lightweight interactions.
- **TESTING:** automated tests, validation, functional flows, production build.
- **ACCESSIBILITY:** WCAG principles, keyboard support, screen reader support, contrast, responsive accessible UI.
- **PROBLEM STATEMENT ALIGNMENT:** real location-aware air-quality data, personalized GenAI recommendations, daily routines, indoor air-quality guidance, sustainable alternatives, and transparent environmental impact.

Build AirAware as a genuinely useful, polished, complete application. Start building now.