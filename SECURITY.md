# Security Architecture & Threat Model: AirAware

## 1. Threat Model

AirAware implements defensive controls aligned with OWASP Top 10 for Web Applications and LLM Security Guidelines.

### Assets Protected

- Server-side API Keys (Gemini, OpenAI, Anthropic)
- User Privacy (no precise GPS coordinates stored, no medical health data stored)
- Internal Server Services (protected against SSRF)
- Client Browsers (protected against XSS, clickjacking, and mime-sniffing)

### Threats & Specific Mitigations

| Threat Vector                           | Severity | AirAware Mitigation Strategy                                                                                                                                                                                                                                                                            |
| --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Key Leakage**                     | Critical | Keys are read exclusively through `src/server/env.ts` on server-side. Zero API keys are bundled into client Next.js static assets. Verified via build grep.                                                                                                                                             |
| **Server-Side Request Forgery (SSRF)**  | Critical | `assertSafeUrl` restricts server fetches strictly to a hardcoded allowlist: `air-quality-api.open-meteo.com`, `api.open-meteo.com`, and `geocoding-api.open-meteo.com`.                                                                                                                                 |
| **LLM Prompt Injection & Jailbreaking** | High     | User query strings are stripped of control characters, length-limited, and wrapped in delimited `<user_query>` tags. The system prompt directs the LLM to treat inputs solely as passive data, never instructions. Output is strictly validated against Zod schema with instant deterministic fallback. |
| **Cross-Site Scripting (XSS)**          | High     | `dangerouslySetInnerHTML` is prohibited. Markdown and dynamic data are rendered through safe JSX text bindings. CSP header enforces `default-src 'self'`.                                                                                                                                               |
| **Denial of Service / Abuse**           | High     | In-memory sliding-window rate limiter keyed by IP (`src/server/rate-limiter.ts`) returning HTTP 429 with `Retry-After` header. Request bodies are limited to 50KB.                                                                                                                                      |
| **User Data Exfiltration**              | Medium   | LocalStorage stores only versioned preference schemas (`airaware_user_profile_v1`). Coordinates are rounded to 2 decimal places. A manual "Clear All Saved Local Data" purge button is provided.                                                                                                        |

## 2. HTTP Security Headers

Configured in `next.config.mjs`:

- `Content-Security-Policy`: Restricts default sources, script executions, image origins, and blocks frame embeds.
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(self)`

## 3. Dependency Security

`npm audit --omit=dev` confirms **0 vulnerabilities** across all production dependencies.
