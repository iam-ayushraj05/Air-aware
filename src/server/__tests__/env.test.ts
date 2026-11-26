import { describe, it, expect } from "vitest";
import { getServerEnv } from "../env";

describe("Server Environment Validation", () => {
  it("loads and returns valid server environment schema", () => {
    const env = getServerEnv();
    expect(env).toBeDefined();
    expect(["gemini", "openai", "anthropic", "demo"]).toContain(env.AI_PROVIDER);
  });
});
