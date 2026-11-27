import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/**
 * Next.js configuration generator with environment-aware security headers.
 * In development, allows 'unsafe-eval' for React dev overlays and Turbopack callstack reconstruction.
 * In production, enforces strict Content Security Policy.
 *
 * @param {string} phase Current Next.js build/dev phase
 * @returns {import('next').NextConfig}
 */
export default function nextConfig(phase) {
  const isDev =
    phase === PHASE_DEVELOPMENT_SERVER ||
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV !== "production";

  return {
    reactStrictMode: true,
    poweredByHeader: false,
    headers: async () => [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              isDev
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
                : "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              isDev
                ? "connect-src 'self' ws: wss: https://air-quality-api.open-meteo.com https://api.open-meteo.com https://geocoding-api.open-meteo.com"
                : "connect-src 'self' https://air-quality-api.open-meteo.com https://api.open-meteo.com https://geocoding-api.open-meteo.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ],
  };
}
