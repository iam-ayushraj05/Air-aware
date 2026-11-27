import { describe, it, expect } from "vitest";
import { logger } from "../logger";

describe("logger utility", () => {
  it("safely handles info, warn, and error calls without throwing", () => {
    expect(() => logger.info("Test info message", { foo: "bar" })).not.toThrow();
    expect(() => logger.warn("Test warning message", 123)).not.toThrow();
    expect(() => logger.error("Test error message", new Error("test"))).not.toThrow();
  });

  it("handles empty and multiple arguments gracefully", () => {
    expect(() => logger.info("Solo message")).not.toThrow();
    expect(() => logger.warn("Multi args", "a", "b", 42)).not.toThrow();
    expect(() => logger.error("Fatal error", { code: 500 })).not.toThrow();
  });
});
