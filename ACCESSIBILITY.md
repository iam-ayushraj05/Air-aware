# Accessibility Conformance Document: AirAware (WCAG 2.2 AA)

AirAware is engineered in strict accordance with the W3C Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards.

## 1. Conformance Matrix

| Criterion | Level | Implementation Strategy | Automated / Manual Test |
|---|---|---|---|
| **1.1.1 Non-text Content** | Level A | All icons use `aria-hidden="true"` accompanied by visible text or explicit `aria-label` attributes. Charts offer data tables with `aria-describedby`. | Verified with `vitest-axe` |
| **1.3.1 Info and Relationships** | Level A | Proper HTML5 landmarks (`<header>`, `<nav>`, `<aside>`, `<main id="main-content">`, `<footer>`). Single `<h1>` per page with sequential heading hierarchy (`h1` -> `h2` -> `h3`). | Screen reader audit & `axe` |
| **1.4.1 Use of Color** | Level A | Air quality is **never conveyed by color alone**. Every AQI badge displays numeric score + text label + descriptive summary + status icon. | Manual color blindness check |
| **1.4.3 Contrast (Minimum)** | Level AA | Normal text contrast ≥ 4.5:1, large text ≥ 3:1. High-contrast theme achieves ≥ 7:1 contrast. | Checked with axe color contrast rule |
| **2.1.1 Keyboard Accessible** | Level A | Every action, modal dialog, and dropdown is fully navigable via `Tab`, `Enter`, `Space`, and `Escape`. | Component tests with `userEvent` |
| **2.4.1 Bypass Blocks** | Level A | `.skip-to-content` link located at top of DOM allowing instant focus jump to `#main-content`. | Keyboard tab test |
| **2.4.7 Focus Visible** | Level AA | Prominent emerald focus ring (`outline: 2px solid var(--focus-ring); outline-offset: 2px`) on all interactive controls. | Visual inspection |
| **2.5.8 Target Size (Minimum)** | Level AA | All interactive buttons and mobile navigation touch targets are minimum 44×44px (`min-h-[44px]`). | CSS specification audit |
| **3.3.1 Error Identification** | Level A | Form validation and location search errors feature `role="alert"` and clear instructional guidance. | React Testing Library |
| **4.1.3 Status Messages** | Level AA | AI chat streaming and live data refreshes use `aria-live="polite"` to alert screen reader users without interruption. | VoiceOver audit |

## 2. Screen Reader Testing Checklist (NVDA & VoiceOver)

- [x] **Landmark Navigation:** `header`, `nav`, `main`, and `footer` landmarks announced properly.
- [x] **Skip Link:** First `Tab` keypress targets "Skip to main content" and moves keyboard focus directly to main view.
- [x] **Modal Trapping:** Location selection modal correctly traps focus; `Escape` key dismisses modal and restores focus.
- [x] **Chart Descriptions:** Recharts area graph provides an adjacent "View Data Table" toggle with full tabular tabular data.
- [x] **Dynamic Messages:** Incoming AI advisor responses announce polite updates via `aria-live="polite"`.
- [x] **Checklist Status:** Family protection checklist items toggle `aria-pressed` and announce state transitions.
