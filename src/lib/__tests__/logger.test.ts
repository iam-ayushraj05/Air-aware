import { describe, it, expect, vi } from "vitest";
import { logger } from "../logger";

describe("logger utility", () => {
  it("safely handles info, warn, and error calls without throwing in test env", () => {
    expect(() => logger.info("Test info message", { foo: "bar" })).not.toThrow();
    expect(() => logger.warn("Test warning message", 123)).not.toThrow();
    expect(() => logger.error("Test error message", new Error("test"))).not.toThrow();
  });

  it("handles empty and multiple arguments gracefully", () => {
    expect(() => logger.info("Solo message")).not.toThrow();
    expect(() => logger.warn("Multi args", "a", "b", 42)).not.toThrow();
    expect(() => logger.error("Fatal error", { code: 500 })).not.toThrow();
  });

  it("writes to stdout and stderr when in development mode", () => {
    vi.stubEnv("NODE_ENV", "development");

    const stdoutSpy = vi.spyOn(process.stdout, "write").mockReturnValue(true);
    const stderrSpy = vi.spyOn(process.stderr, "write").mockReturnValue(true);

    logger.info("Dev message", { status: "ok" });
    logger.warn("Dev warning");
    logger.error("Dev error", "extra");

    expect(stdoutSpy).toHaveBeenCalled();
    expect(stderrSpy).toHaveBeenCalledTimes(2);

    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
    vi.unstubAllEnvs();
  });
});
