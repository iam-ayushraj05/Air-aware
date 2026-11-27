import { describe, it, expect, beforeEach, vi } from "vitest";
import { getServerEnv, resetServerEnv } from "../env";

describe("Server Environment Validation", () => {
  beforeEach(() => {
    resetServerEnv();
  });

  it("loads and returns valid server environment schema", () => {
    const env = getServerEnv();
    expect(env).toBeDefined();
    expect(["gemini", "openai", "anthropic", "demo"]).toContain(env.AI_PROVIDER);

    // Verify cached return path
    const cached = getServerEnv();
    expect(cached).toBe(env);
  });

  it("safely falls back to demo mode when env variables fail schema validation", () => {
    // Set invalid provider to trigger schema validation failure
    vi.stubEnv("AI_PROVIDER", "unsupported_provider");
    vi.stubEnv("NODE_ENV", "invalid_node_env");

    const fallbackEnv = getServerEnv();
    expect(fallbackEnv.AI_PROVIDER).toBe("demo");
    expect(fallbackEnv.NODE_ENV).toBe("development");

    // Restore
    vi.unstubAllEnvs();
    resetServerEnv();
  });
});
