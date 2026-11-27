import { describe, it, expect, vi, beforeEach } from "vitest";
import { assertSafeUrl, fetchWithTimeout, resilientFetch } from "../http-client";

describe("http-client SSRF Protection & Resilient Fetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("allows permitted Open-Meteo hosts", () => {
    expect(() =>
      assertSafeUrl("https://air-quality-api.open-meteo.com/v1/air-quality")
    ).not.toThrow();
    expect(() =>
      assertSafeUrl("https://geocoding-api.open-meteo.com/v1/search?name=Paris")
    ).not.toThrow();
    expect(() => assertSafeUrl("https://api.open-meteo.com/v1/forecast")).not.toThrow();
  });

  it("strictly throws an Error when host is not on allowlist", () => {
    expect(() => assertSafeUrl("https://malicious-api.attacker.com/v1/data")).toThrow(
      /SSRF Prevention: Host "malicious-api.attacker.com" is not permitted/
    );
    expect(() => assertSafeUrl("http://localhost:8080/admin")).toThrow(/SSRF Prevention/);
  });

  it("successfully parses JSON body when HTTP status is ok", async () => {
    const mockData = { aqi: 42 };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const controller = new AbortController();
    const data = await fetchWithTimeout(
      "https://air-quality-api.open-meteo.com/v1/air-quality",
      300,
      controller.signal
    );
    expect(data).toEqual(mockData);
  });

  it("throws error when fetch response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const controller = new AbortController();
    await expect(
      fetchWithTimeout(
        "https://air-quality-api.open-meteo.com/v1/air-quality",
        300,
        controller.signal
      )
    ).rejects.toThrow(/HTTP status 500/);
  });

  it("resilientFetch succeeds on successful response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "ok" }),
    } as Response);

    const res = await resilientFetch("https://api.open-meteo.com/v1/forecast", 300);
    expect(res).toEqual({ status: "ok" });
  });
});
